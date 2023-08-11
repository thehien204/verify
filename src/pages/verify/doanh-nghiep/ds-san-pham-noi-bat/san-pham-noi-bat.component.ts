import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector, Input} from "@node_modules/@angular/core";
import {DoanhNghiepDto, SanPhamNoiBatDto, SanPhamServiceProxy, SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG} from "@service-proxies/verify-service-proxies";
import {DestroyRxjsService, OfSchemaModel} from "@node_modules/@orendaco/of";
import {FbDsSanPhamNoiBatService} from "./fb-ds-san-pham-noi-bat";
import {NzSafeAny} from "@node_modules/ng-zorro-antd/core/types";

@Component({
  selector: 'app-san-pham-noi-bat',
  templateUrl: './san-pham-noi-bat.component.html',
  styleUrls: ['./ds-san-pham-noi-bat.scss']
})
export class SanPhamNoiBatComponent extends AppOrdCoComponentBase implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;

  proxyServices = this.builderCommonCrudProxyService('app/san-pham-noi-bat', 'default', true);
  searchSchema: OfSchemaModel;

  constructor(private injector: Injector,
              private fbService: FbDsSanPhamNoiBatService,
              private sanPhamProxy: SanPhamServiceProxy,
              private destroy$: DestroyRxjsService,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.SanPhamNoiBat).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.SanPhamNoiBat);
    })
    this.searchSchema = this.fbService.builderSearch();
  }

  openCreateOrUpdate(record = null) {
    if (record) {
      record.doanhNghiepId = record?.sanPham?.doanhNghiepId + '';
    }
    console.log(this.proxyServices.getById);
    this.crudService.openCreateOrUpdate({
      type: 'modal',
      entityName: 'Sản phẩm nổi bật',
      id: record?.id,
      editDto: record,
      nzModalOptions: {
        nzWidth: 1000
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

  handlerForm(entitySchema: OfSchemaModel<SanPhamNoiBatDto>, isEdit: boolean) {
    if (isEdit) {
      const value = entitySchema.form.value as NzSafeAny;
      value.sanPhamId = '' + value.sanPhamId;
      entitySchema.patchValue(value);
      entitySchema.form.getControl('sanPhamId').disable({onlySelf: true});
      entitySchema.form.getControl('doanhNghiepId').disable({onlySelf: true});
    }
  }

}
