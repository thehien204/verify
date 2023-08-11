import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbBangGiaDichVuService} from "./fb-bang-gia-dich-vu.service";
import {BangGiaDichVuServiceProxy, SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG} from "@service-proxies/verify-service-proxies";
import {finalize} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-bang-gia-dich-vu',
  templateUrl: './bang-gia-dich-vu.component.html',
  styles: []
})
export class BangGiaDichVuComponent extends AppOrdCoComponentBase implements OnInit {
  proxyServices = this.builderCommonCrudProxyService('app/bang-gia-dich-vu');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbBangGiaDichVuService,
              private bangGiaSP: BangGiaDichVuServiceProxy,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }
  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.BangGiaDichVu).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.BangGiaDichVu);
    })
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Bảng giá dịch vụ',
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
      proxyServices: this.proxyServices,
      afterViewInitFunc: (entitySchema, id, editDto: any) => {
        if (editDto != null) {
          editDto.isActive = editDto.isActive ? 'true' : 'false';
          entitySchema.patchValue(editDto);
        }
      }
    });
  }

  delete(record: any): void {
    this.crudService.removeById({
      name: `Bảng giá dịch vụ "${record.ten}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  lock(id: number, lock: boolean) {
    abp.ui.setBusy();
    this.bangGiaSP.lock(id, lock)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(d => {
        abp.notify.success(lock ? 'Khóa thành công' : 'Mở khóa thành công');
        this.searchSchema.reloadDataTable();
      });

  }
}
