import {Component} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbQuocGiaService} from "./fb-quoc-gia.service";

@Component({
  selector: 'app-quoc-gia',
  templateUrl: './quoc-gia.component.html',
  styles: [
  ]
})
export class QuocGiaComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService('app/quoc-gia');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbQuocGiaService) {
    super(injector);
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Quốc gia',
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
      name: `Quốc gia "${record.tenEn}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }
}

