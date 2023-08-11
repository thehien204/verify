import {Component, Injector} from '@angular/core';
import {AppOrdCoComponentBase} from '@app-ordco/utils/app-ordco-component-base';
import {FbXaService} from './fb-xa.service';

@Component({
  templateUrl: './xa.component.html',
  styles: []
})
export class XaComponent extends AppOrdCoComponentBase {
  titlePage = 'Xã phường';
  proxyServices = this.builderCommonCrudProxyService('app/xa');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbXaService) {
    super(injector);
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: this.titlePage,
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
      name: this.titlePage + ` ${record.tenHuyen}`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  onFilterColumn(value: any) {
    if (!value.maTinh) {
      value.maHuyen = null;
    }
    this.searchSchema.patchValue(value);
    this.loading = true;
    setTimeout(() => {
      this.searchSchema.search();
    });
  }
}
