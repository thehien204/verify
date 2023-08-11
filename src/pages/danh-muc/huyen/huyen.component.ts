import {Component, Injector} from '@angular/core';
import {AppOrdCoComponentBase} from '@app-ordco/utils/app-ordco-component-base';
import {FbHuyenService} from './fb-huyen.service';

@Component({
  templateUrl: './huyen.component.html'
})
export class HuyenComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService( 'app/huyen');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbHuyenService) {
    super(injector);
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Quận/ huyện',
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
      name: `Quận/ huyện "${record.tenHuyen}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }
}

