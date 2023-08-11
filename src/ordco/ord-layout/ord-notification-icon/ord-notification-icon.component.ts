import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ListNotificationFromUserInputDto,
  NotificationFromUserDto,
  NotificationsServiceProxy,
  TRANG_THAI_THONG_BAO
} from '@service-proxies/verify-service-proxies';
// import {NotificationFireBaseService} from 'src/shared/utils/notificationFireBase.service';
import {BehaviorSubject, Subject} from "@node_modules/rxjs";
import {takeUntil} from "@node_modules/rxjs/internal/operators";
import * as _ from 'lodash'

@Component({
  selector: 'ord-notification-icon',
  templateUrl: './ord-notification-icon.component.html',
  styles: []
})
export class OrdNotificationIconComponent implements OnInit, OnDestroy {
  listNotiData$ = new BehaviorSubject<NotificationFromUserDto[]>([]);
  count$ = new BehaviorSubject(0);
  $destroy = new Subject();
  loading = false;
  enumTrangThaiTb = TRANG_THAI_THONG_BAO;

  constructor(private notifiService: NotificationsServiceProxy,
              // private notifiFirebase: NotificationFireBaseService,
  ) {

  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {
    this.load();

    // this.notifiFirebase.notification$
    //   .pipe(takeUntil(this.$destroy))
    //   .subscribe(res => {
    //     this.nextItem(res);
    //     this.count$.next(this.count$.value + 1)
    //   })
  }

  nextItem(input: NotificationFromUserDto) {
    if (input) {
      this.listNotiData$.value.push(input);
      const data = _.orderBy(_.cloneDeep(this.listNotiData$.value), x => x?.notificationId, 'desc');
      this.listNotiData$.next(_.take(data, 5))
    }

  }

  private load() {
    this.loading = true;
    const input = new ListNotificationFromUserInputDto();
    input.skipCount = 0;
    input.maxResultCount = 5;
    this.notifiService.listNotificationFromUser(input).subscribe(res => {
      this.listNotiData$.next(res.items);
      this.loading = false;
      // res.items[0].ngayGuiTin
      this.count$.next(res.items.filter(x => x.trangThai == TRANG_THAI_THONG_BAO.CHUA_DOC).length)
    })
  }

  gotoUrl(item) {

  }


  setNotificationAsRead(record: NotificationFromUserDto) {
    console.log("re", record)
    this.notifiService.readNotificationByUser(record.userNotificationId)
      .subscribe(res => {
        this.load();
      })
  }

  setAllNotificationsAsRead() {
    this.notifiService.readAllNotificationByUser()
      .subscribe(res => {
        this.load();
      })
  }
}
