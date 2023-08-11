import {Component, Input, OnInit} from '@angular/core';
import {DoanhNghiepDto, SanPhamDto, SanPhamServiceProxy} from "@service-proxies/verify-service-proxies";
import {Injector} from "@node_modules/@angular/core";
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {FbSanPhamDoanhNghiepService} from "./fb-san-pham-doanh-nghiep";
import {DestroyRxjsService, OCoreUtilityService, OfSchemaModel} from "@node_modules/@orendaco/of";
import {debounceTime, distinctUntilChanged, map, takeUntil} from "@node_modules/rxjs/internal/operators";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProductBarcodeComponent} from "./product-barcode/product-barcode.component";

@Component({
  selector: 'app-san-pham-doanh-nghiep',
  templateUrl: './san-pham-doanh-nghiep.component.html',
  styles: [],
  providers: [DestroyRxjsService]
})
export class SanPhamDoanhNghiepComponent extends AppOrdCoComponentBase implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;

  proxyServices = this.builderCommonCrudProxyService('app/san-pham');
  searchSchema: OfSchemaModel;

  constructor(private injector: Injector,
              private fbService: FbSanPhamDoanhNghiepService,
              private sanPhamProxy: SanPhamServiceProxy,
              private modal: NzModalService,
              private destroy$: DestroyRxjsService) {
    super(injector);
  }

  ngOnInit(): void {
    this.searchSchema = this.fbService.builderSearch(this.doanhNghiepModeDto.id);
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
        this.searchSchema.reloadDataTable();
      },
      entitySchema: this.fbService.builderEntity(this.destroy$, this.doanhNghiepModeDto),
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
      return;
    } else {
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
                //  maControl.setErrors({"Mã gtin không tồn tại": true});
              }
            })
          ).subscribe();
          // if (v.indexOf(maDoanhNghiep) === 0 || v.indexOf(maDoanhNghiep) === 1) {
          //   this.sanPhamProxy.searchProductGs1(v).pipe(
          //     map(productDto => {
          //       if (productDto !== null) {
          //         abp.notify.success("Quét thành công mã gtin");
          //         entitySchema.form.patchValue({
          //           ma: productDto.ma,
          //           ten: productDto.ten,
          //           thiTruongMucTieu: productDto.thiTruongMucTieu,
          //           moTa: productDto.moTa,
          //           images: productDto.images,
          //         });
          //         maControl.setErrors(null);
          //         return;
          //       } else {
          //         entitySchema.form.patchValue({
          //           ma: null,
          //           ten: null,
          //           thiTruongMucTieu: null,
          //           moTa: null,
          //           images: [],
          //         });
          //         maControl.setErrors({"Mã gtin không tồn tại": true});
          //       }
          //     })
          //   ).subscribe();
          // } else {
          //   maControl.setErrors({"Mã gtin không phải sản phẩm của doanh nghiệp": true});
          // }
        });
    }
  }


}
