import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {BannerDto, SanPhamNoiBatDto, SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG} from "@service-proxies/verify-service-proxies";
import {OfSchemaModel} from "@node_modules/@orendaco/of";
import {NzSafeAny} from "@node_modules/ng-zorro-antd/core/types";
import {FbListBannerService} from "./fb-list-banner.service";

@Component({
  selector: 'app-list-banner',
  templateUrl: './list-banner.component.html',
  styles: []
})
export class ListBannerComponent extends AppOrdCoComponentBase implements OnInit {
  proxyServices = this.builderCommonCrudProxyService('app/banner');
  searchSchema: OfSchemaModel;

  constructor(private injector: Injector,
              private fbService: FbListBannerService,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.QuanLyBanner).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.QuanLyBanner);
    })
    this.searchSchema = this.fbService.builderSearch();
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      type: 'modal',
      entityName: 'Banner',
      id: record?.id,
      editDto: record,
      nzModalOptions: {
        nzWidth: '1000px'
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
        });
      }
    });
  }

  delete(record: any): void {
    this.crudService.removeById({
      name: `Banner`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  handlerForm(entitySchema: OfSchemaModel, isEdit: boolean) {
    if (isEdit) {
      const value = entitySchema.form.value;
      if (value.listScheduleId) {
        const v = value.listScheduleId.map(it => '' + it);
        entitySchema.form.getControl('listScheduleId').patchValue(v);
      }
      entitySchema.form.getControl('doanhNghiepId').patchValue('' + value.doanhNghiepId);
    }
  }

}
