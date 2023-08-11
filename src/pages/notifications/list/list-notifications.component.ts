import {Component} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {LOAI_THONG_BAO, NotificationsDto, NotificationsServiceProxy} from "@service-proxies/verify-service-proxies";
import {Notificationservice} from "./notifications.service";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {GuiThongBaoModalComponent} from "../gui-thong-bao-modal/gui-thong-bao-modal.component";

@Component({
  templateUrl: './list-notifications.component.html',
  styles: []
})
export class ListNotificationsComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService('app/notifications');
  searchSchema = this.fbService.builderSearch();
  enumLoaiTB = LOAI_THONG_BAO;

  constructor(private injector: Injector,
              private fbService: Notificationservice,
              private modalService: NzModalService,
              private bangGiaSP: NotificationsServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.searchSchema.getField('loaiThongBao').value
  }


  openUpdate(record?: NotificationsDto) {
    this.modalService.create<GuiThongBaoModalComponent>({
      nzTitle: "Sửa thông báo",
      nzContent: GuiThongBaoModalComponent,
      nzComponentParams: {
        dataItem: record
      },
      nzFooter: null
    }).afterClose.subscribe(res => {
      if (res) {
        this.searchSchema.reloadDataTable();
      }
    })
  }

  openCreate() {
    this.modalService.create<GuiThongBaoModalComponent>({
      nzTitle: "Gửi thông báo",
      nzContent: GuiThongBaoModalComponent,
      nzComponentParams: {
      },
      nzFooter: null
    }).afterClose.subscribe(res => {
      if (res) {
        this.searchSchema.reloadDataTable();
      }
    })
  }

  delete(record: NotificationsDto): void {
    this.crudService.removeById({
      name: 'Xóa thông báo',
      proxyServices: this.proxyServices,
      id: record.id.toString(),
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }
}
