import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector, Input} from "@node_modules/@angular/core";
import {DoanhNghiepDto, DoanhNghiepNoiBatDto, SanPhamNoiBatDto, SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG} from "@service-proxies/verify-service-proxies";
import {OfSchemaModel} from "@node_modules/@orendaco/of";
import {NzSafeAny} from "@node_modules/ng-zorro-antd/core/types";
import {FbDsDoanhNghiepNoiBatService} from "./fb-ds-doanh-nghiep-noi-bat";

@Component({
  selector: 'app-ds-doanh-nghiep-noi-bat',
  templateUrl: './ds-doanh-nghiep-noi-bat.component.html',
  styles: []
})
export class DsDoanhNghiepNoiBatComponent extends AppOrdCoComponentBase implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;

  proxyServices = this.builderCommonCrudProxyService('app/doanh-nghiep-noi-bat', 'default', true);
  searchSchema: OfSchemaModel;

  constructor(private injector: Injector,
              private fbService: FbDsDoanhNghiepNoiBatService,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.DoanhNghiepNoiBat).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.DoanhNghiepNoiBat);
    })
    this.searchSchema = this.fbService.builderSearch();
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      type: 'modal',
      entityName: 'Doanh nghiệp nổi bật',
      id: record ? (record?.id) : '',
      editDto: record,
      nzModalOptions: {
        nzWidth: 900
      },
      callBackSavedSuccess: () => {
        setTimeout(() => {
          this.searchSchema.reloadDataTable();
        });
      },
      entitySchema: this.fbService.builderEntity(),
      proxyServices: this.proxyServices,
      afterViewInitFunc: (entitySchema, id, editDto) => {

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
    }
  }

}
