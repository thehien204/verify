import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector, Input} from "@node_modules/@angular/core";
import {
  AdminThietLapDanhGiaSanPhamInputDto,
  DoanhNghiepDto,
  SanPhamDto,
  SanPhamServiceProxy,
  SysAuditLogServiceProxy,
  _definitions_TINH_NANG_HE_THONG
} from "@service-proxies/verify-service-proxies";
import {DestroyRxjsService, OCoreUtilityService, OfSchemaModel} from "@node_modules/@orendaco/of";
import {debounceTime, distinctUntilChanged, map, takeUntil} from "@node_modules/rxjs/internal/operators";
import {FbDanhSachSanPhamService} from "../ds-san-pham/fb-danh-sach-san-pham";
import {NzDrawerService} from "@node_modules/ng-zorro-antd/drawer";
import * as _ from "@node_modules/@types/lodash";
import {DanhGiaSanPhamModalComponent} from "./danh-gia-san-pham-modal/danh-gia-san-pham-modal.component";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {ThietLapLuotDanhGiaSanPhamComponent} from "./thiet-lap-luot-danh-gia-san-pham/thiet-lap-luot-danh-gia-san-pham.component";

@Component({
  templateUrl: './ds-danh-gia-san-pham.component.html',
  styles: []
})
export class DsDanhGiaSanPhamComponent extends AppOrdCoComponentBase implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;

  proxyServices = this.builderCommonCrudProxyService('app/san-pham');
  searchSchema: OfSchemaModel;

  constructor(private injector: Injector,
              private fbService: FbDanhSachSanPhamService,
              private drawService: NzDrawerService,
              private modalService: NzModalService,
              private sanPhamProxy: SanPhamServiceProxy,
              private destroy$: DestroyRxjsService,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.DanhSachDanhGiaSanPham).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.DanhSachDanhGiaSanPham);
    })
    this.searchSchema = this.fbService.builderSearch();
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      type: 'drawer',
      entityName: 'Sản phẩm',
      id: record?.id,
      editDto: record,
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


  handlerForm(entitySchema: OfSchemaModel<SanPhamDto>, isEdit: boolean) {
    if (isEdit) {
      entitySchema.form.getControl('ma').disable({onlySelf: true});
      entitySchema.form.get('doanhNghiepId').patchValue('' + entitySchema.form.value.doanhNghiepId);
      return;
    } else {
      entitySchema.form.getControl('images').patchValue(null);
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

  showDanhGiaSp(record: SanPhamDto) {
    const drawer = this.drawService.create({
      nzPlacement: 'right',
      nzWidth: '80vh',
      nzWrapClassName: 'ord-of-create-update',
      nzTitle: "Chi tiết đánh giá của sản phẩm: " + record.ten,
      nzContent: DanhGiaSanPhamModalComponent,
      nzContentParams: {
        sanPhamId: record.id
      },
      nzFooter: null,
      nzMaskClosable: true,
      nzClosable: true,
    });
  }

  thietLapDiemSanPham(record: SanPhamDto) {
    this.modalService.create<ThietLapLuotDanhGiaSanPhamComponent>({
      nzTitle: "Thiết lập lượt đánh giá sản phẩm",
      nzContent: ThietLapLuotDanhGiaSanPhamComponent,
      nzComponentParams: {
        dataItem: new AdminThietLapDanhGiaSanPhamInputDto({
          sanPhamId: record.id,
          tongDiem: record.tongDiem,
          tongLuotDanhGia: record.tongLuotDanhGia
        })
      }
    }).afterClose.subscribe(res => {
      if (res) {
        this.searchSchema.reloadDataTable();
      }
    })
  }
}
