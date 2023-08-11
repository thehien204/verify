import {Component, Injector} from '@angular/core';
import {AppOrdCoComponentBase} from '@app-ordco/utils/app-ordco-component-base';
import {FbTinhService} from './fb-tinh.service';

@Component({
  templateUrl: './tinh.component.html'
})
export class TinhComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService('app/tinh');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbTinhService) {
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
      name: `Tỉnh/ thành phố "${record.tenTinh}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }
}

