import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { ListNotificationsComponent } from './list/list-notifications.component';
import {OrdSharedModule} from "@app-ordco/ord-shared/ord-shared.module";
import {DisplayTextPipeModule} from "@app-ordco/display-text-pipe/display-text-pipe.module";
import {OrdTableModule} from "@app-ordco/ord-table/ord-table.module";
import { GuiThongBaoModalComponent } from './gui-thong-bao-modal/gui-thong-bao-modal.component';
import {NzFormModule} from "@node_modules/ng-zorro-antd/form";
import {OraSelectModule} from "@app-ordco/ora-select/ora-select.module";
import {NzInputModule} from "@node_modules/ng-zorro-antd/input";
import {NzTabsModule} from "@node_modules/ng-zorro-antd/tabs";
import {NzDropDownModule} from "@node_modules/ng-zorro-antd/dropdown";
import {NzDatePickerModule} from "@node_modules/ng-zorro-antd/date-picker";
import { NotificationsFromUserComponent } from './notifications-from-user/notifications-from-user.component';
import {NzCheckboxModule} from "@node_modules/ng-zorro-antd/checkbox";


@NgModule({
  declarations: [
    ListNotificationsComponent,
    GuiThongBaoModalComponent,
    NotificationsFromUserComponent
  ],
    imports: [
        CommonModule,
        NotificationsRoutingModule,
        OrdSharedModule,
        DisplayTextPipeModule,
        OrdTableModule,
        NzFormModule,
        OraSelectModule,
        NzInputModule,
        NzTabsModule,
        NzDropDownModule,
        NzDatePickerModule,
        NzCheckboxModule
    ]
})
export class NotificationsModule { }
