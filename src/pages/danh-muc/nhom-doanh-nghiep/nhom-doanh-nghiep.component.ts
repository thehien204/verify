import {Component} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbNhomDoanhNghiepService} from "./fb-nhom-doanh-nghiep.service";

@Component({
  templateUrl: './nhom-doanh-nghiep.component.html'
})
export class NhomDoanhNghiepComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService('app/nhom-doanh-nghiep');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
    private fbService: FbNhomDoanhNghiepService) {
    super(injector);
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Nhóm sản phẩm',
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
      name: `Nhóm doanh nghiệp "${record.tenNhom}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
}
}


