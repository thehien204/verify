import { Component, OnInit } from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbScheduleService} from "./fb-schedule.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: [
  ]
})
export class ScheduleComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService('app/schedule');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbScheduleService) {
    super(injector);
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Tỉnh/ thành phố',
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

  delete(record: any): void {
    this.crudService.removeById({
      name: `Khung giờ "${record.name}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }
}
