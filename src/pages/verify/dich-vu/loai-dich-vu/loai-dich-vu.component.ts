import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import { SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG } from '@service-proxies/verify-service-proxies';
import {FbLoaiDichVuService} from "./fb-loai-dich-vu.service";

@Component({
  selector: 'app-loai-dich-vu',
  templateUrl: './loai-dich-vu.component.html',
  styles: [
  ]
})
export class LoaiDichVuComponent extends AppOrdCoComponentBase implements OnInit {
  proxyServices = this.builderCommonCrudProxyService('app/loai-dich-vu');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbLoaiDichVuService,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }
  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.LoaiDichVu).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.LoaiDichVu);
    })
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Loại dịch vụ',
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
      name: `Loại dịch vụ "${record.ten}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }
}
