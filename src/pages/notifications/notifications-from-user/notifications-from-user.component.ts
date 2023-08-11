import {Component, OnInit} from '@angular/core';
import {ReuseTabService} from "@node_modules/@delon/abc/reuse-tab";
import {
  LOAI_THONG_BAO, NotificationFromUserDto,
  NotificationsDto,
  NotificationsServiceProxy,
  TRANG_THAI_THONG_BAO
} from "@service-proxies/verify-service-proxies";
import {Injector} from "@node_modules/@angular/core";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {GuiThongBaoModalComponent} from "../gui-thong-bao-modal/gui-thong-bao-modal.component";
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {NotificationsFromUserservice} from "./notifications-from-user.service";
import {finalize} from "@node_modules/rxjs/operators";

@Component({
  selector: 'app-notifications-from-user',
  templateUrl: './notifications-from-user.component.html',
  styles: []
})
export class NotificationsFromUserComponent extends AppOrdCoComponentBase implements OnInit {

  searchSchema = this.fbService.builderSearch();
  enumLoaiTB = LOAI_THONG_BAO;
  enumTrangThai = TRANG_THAI_THONG_BAO;
  getList = (searchInput) => {
    return this.notifiService.listNotificationFromUser(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  }

  constructor(private injector: Injector,
              private fbService: NotificationsFromUserservice,
              private modalService: NzModalService,
              private notifiService: NotificationsServiceProxy,
              private tabService: ReuseTabService) {
    super(injector);
  }

  ngOnInit(): void {
    this.tabService.title = "Danh sách thông báo"
  }


  setAsRead(record: NotificationFromUserDto) {
    this.notifiService.readNotificationByUser(record.userNotificationId)
      .subscribe(res => {
        this.searchSchema.reloadDataTable();
      })
  }

  setAllRead() {
    this.notifiService.readAllNotificationByUser()
      .subscribe(res => {
        this.searchSchema.reloadDataTable();
      })
  }
}
