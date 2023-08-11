import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
// language list
import {AppEventInitService} from '@app-ordco/services/app-event-init.service';
// import {NotificationFireBaseService} from "../shared/utils/notificationFireBase.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private appEventInitService: AppEventInitService,
              // private notificationService: NotificationFireBaseService
  ) {
  }

  ngOnInit() {
    this.appEventInitService.init();
    // this.notificationService.init();


  }
}
