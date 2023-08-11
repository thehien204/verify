import {Component} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbVersionService} from "./fb-version.service";
import {SysVersionDto} from "@service-proxies/verify-service-proxies";

@Component({
  templateUrl: './sys-version.component.html',
  styles: [
  ]
})
export class SysVersionComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService('app/sys-versions');
  searchSchema = this.fbService.builderSearch();
  constructor(private injector: Injector,
              private fbService: FbVersionService) {
    super(injector);
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Phiên bản',
      id: record?.id,
      editDto: record,
      nzModalOptions: {
        nzWidth: '500px'
      },
      callBackSavedSuccess: () => {
        this.searchSchema.reloadDataTable();
      },
      type: 'modal',
      entitySchema: this.fbService.builderEntity(),
      proxyServices: this.proxyServices
    });
  }

  delete(record: SysVersionDto): void {
    this.crudService.removeById({
      name: `Phiên bản "${record.maPhienBan}"`,
      proxyServices: this.proxyServices,
      id: record.id.toString(),
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }
}

