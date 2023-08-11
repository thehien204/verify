import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector, Input} from "@node_modules/@angular/core";
import {DoanhNghiepDto, SanPhamDto, SanPhamServiceProxy, SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG} from "@service-proxies/verify-service-proxies";
import {DestroyRxjsService, OCoreUtilityService, OfSchemaModel} from "@node_modules/@orendaco/of";
import {debounceTime, distinctUntilChanged, map, takeUntil} from "@node_modules/rxjs/internal/operators";
import {FbDanhSachSanPhamService} from "./fb-danh-sach-san-pham";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {UploadGiayChungNhanComponent} from "./upload-giay-chung-nhan/upload-giay-chung-nhan.component";
import {ProductBarcodeComponent} from "../san-pham-doanh-nghiep/product-barcode/product-barcode.component";

@Component({
  selector: 'app-ds-san-pham',
  templateUrl: './ds-san-pham.component.html',
  styles: []
})
export class DsSanPhamComponent extends AppOrdCoComponentBase implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;

  proxyServices = this.builderCommonCrudProxyService('app/san-pham');
  searchSchema: OfSchemaModel;

  constructor(private injector: Injector,
              private fbService: FbDanhSachSanPhamService,
              private sanPhamProxy: SanPhamServiceProxy,
              private modal: NzModalService,
              private destroy$: DestroyRxjsService,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.DanhSachSanPham).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.DanhSachSanPham);
    })
    this.searchSchema = this.fbService.builderSearch();
  }

  openCreateOrUpdate(record = null, isReadOnly = false) {
    this.crudService.openCreateOrUpdate({
      type: 'drawer',
      entityName: 'Sản phẩm',
      id: record?.id,
      editDto: record,
      isReadOnly: isReadOnly,
      nzDrawerOptions: {
        nzHeight: '100vh'
      },
      callBackSavedSuccess: () => {
        setTimeout(() => {
          this.searchSchema.reloadDataTable();
        });
      },
      entitySchema: this.fbService.builderEntity(),
      proxyServices: this.proxyServices,
      afterViewInitFunc: (entitySchema, id, editDto) => {
        setTimeout(() => {
          this.handlerForm(entitySchema, editDto && id && id > 0);
        })
      },
      handlerBeforeOpenEdit: entitySchema => {
        entitySchema.form.get('ma').disable({onlySelf: true});
      }
    });
  }

  delete(record: any): void {
    this.crudService.removeById({
      name: `Sản phẩm "${record.ten}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  openGiayChungNhanModal(record: SanPhamDto) {
    const modalService = this.injector.get(NzModalService);
    modalService.create({
      nzTitle: 'Upload giấy chứng nhận sản phẩm',
      nzContent: UploadGiayChungNhanComponent,
      nzComponentParams: {
        sanPhamDto: record
      }
    });
  }

  handlerForm(entitySchema: OfSchemaModel<SanPhamDto>, isEdit: boolean) {
    if (isEdit) {
      entitySchema.form.getControl('ma').disable({onlySelf: true});
      entitySchema.form.get('doanhNghiepId').patchValue('' + entitySchema.form.value.doanhNghiepId);
      return;
    } else {
      entitySchema.form.getControl('images').patchValue(null);
      return;
      const maControl = entitySchema.form.getControl('ma');
      maControl.valueChanges.pipe(
        debounceTime(200),
        takeUntil(this.destroy$),
        distinctUntilChanged())
        .subscribe(v => {
          if (OCoreUtilityService.isNullOrEmpty(v) || v.length < 8) {
            maControl.setErrors({"Mã gtin ít nhất 8 ký tự": true});
            return;
          }
          const maDoanhNghiep = this.doanhNghiepModeDto?.maDoanhNghiep;
          if (v.indexOf(maDoanhNghiep) === 0 || v.indexOf(maDoanhNghiep) === 1) {
            this.sanPhamProxy.searchProductGs1(v).pipe(
              map(productDto => {
                if (productDto !== null) {
                  abp.notify.success("Quét thành công mã gtin");
                  entitySchema.form.patchValue({
                    ma: productDto.ma,
                    ten: productDto.ten,
                    thiTruongMucTieu: productDto.thiTruongMucTieu,
                    moTa: productDto.moTa,
                    images: productDto.images,
                  });
                  maControl.setErrors(null);
                  return;
                } else {
                  entitySchema.form.patchValue({
                    ma: null,
                    ten: null,
                    thiTruongMucTieu: null,
                    moTa: null,
                    images: [],
                  });
                  maControl.setErrors({"Mã gtin không tồn tại": true});
                }
              })
            ).subscribe();
          } else {
            maControl.setErrors({"Mã gtin không phải sản phẩm của doanh nghiệp": true});
          }
        });
    }
  }

  openBarCodeView(record: any) {
    this.modal.create({
      nzContent: ProductBarcodeComponent,
      nzTitle: 'Barcode của sản phẩm',
      nzComponentParams: {
        productDto: record
      }
    })

  }

  openQrCodeView(record: any) {
    this.modal.create({
      nzContent: ProductBarcodeComponent,
      nzTitle: 'QR Code của sản phẩm',
      nzComponentParams: {
        productDto: record,
        type: 'qrcode'
      }
    });
  }

  showConfirmVerify(record: SanPhamDto): void {
    this.modal.confirm({
      nzTitle: '<i>Bạn có muốn xác thực cho sản phẩm?</i>',
      nzContent: `<b>${record.ma}</b><br><b>${record.ten}</b>`,
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        this.sanPhamProxy.capNhatXacThuc(record.id, true).subscribe(d => {
          this.searchSchema.reloadDataTable();
        });
      }
    });
  }

  showConfirmUnVerify(record: SanPhamDto): void {
    this.modal.confirm({
      nzTitle: '<i>Bạn có muốn bỏ xác thực cho sản phẩm?</i>',
      nzContent: `<b>${record.ma}</b><br><b>${record.ten}</b>`,
      nzOkText: 'Có',
      nzOkDanger: true,
      nzCancelText: 'Không',
      nzOnOk: () => {
        this.sanPhamProxy.capNhatXacThuc(record.id, false).subscribe(d => {
          this.searchSchema.reloadDataTable();
        });
      }
    });
  }
}
