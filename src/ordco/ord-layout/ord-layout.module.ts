import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdAsideMenuComponent} from './ord-aside-menu/ord-aside-menu.component';
import {RouterModule} from '@node_modules/@angular/router';
import {InlineSVGModule} from '@node_modules/ng-inline-svg';
import {ShowMenuItemPipe} from '@app-ordco/ord-layout/pipes/show-menu-item.pipe';
import {OrdMenuIconComponent} from './ord-menu-icon/ord-menu-icon.component';
import {OrdUserInnerComponent} from './ord-user-inner/ord-user-inner.component';
import {OrdHeaderMenuComponent} from './ord-header-menu/ord-header-menu.component';
import {BreadcrumbComponent} from '@app-ordco/ord-layout/ord-breadcrumb/breadcrumb.component';
import {NzMenuModule} from '@node_modules/ng-zorro-antd/menu';
import {NzBreadCrumbModule} from '@node_modules/ng-zorro-antd/breadcrumb';
import {NzDropDownModule} from '@node_modules/ng-zorro-antd/dropdown';
import {NzIconModule} from '@node_modules/ng-zorro-antd/icon';
import {NgbDropdownModule} from '@node_modules/@ng-bootstrap/ng-bootstrap';
import {GetBrotherMenuItemsPipe} from './pipes/get-brother-menu-items.pipe';
import {TranslationModule} from '@app/modules/i18n';
import {OrdContentComponent} from '@app-ordco/ord-layout/ord-content/ord-content.component';
import {NzBackTopModule} from '@node_modules/ng-zorro-antd/back-top';
import {ReuseTabModuleConfigModule} from '@app-ordco/utils/reuse-tab-config.module';
import {OrdBreadcrumbItemComponent} from './ord-breadcrumb/ord-breadcrumb-item/ord-breadcrumb-item.component';
import {NzGridModule} from '@node_modules/ng-zorro-antd/grid';
import {NzModalModule} from '@node_modules/ng-zorro-antd/modal';
import {NzButtonModule} from '@node_modules/ng-zorro-antd/button';
import {ModalChangePwdComponent} from '@app-ordco/ord-layout/ord-user-inner/modal-change-pwd.component';
import {FormWidgetsModule} from '@app-ordco/form-widgets/form-widgets.module';
import {ModalUserProfileComponent} from '@app-ordco/ord-layout/ord-user-inner/modal-user-profile.component';
import { OrdNotificationIconComponent } from './ord-notification-icon/ord-notification-icon.component';
import {NzBadgeModule} from "@node_modules/ng-zorro-antd/badge";
import {NzCardModule} from "@node_modules/ng-zorro-antd/card";
import {NzListModule} from "@node_modules/ng-zorro-antd/list";
import {NzDividerModule} from "@node_modules/ng-zorro-antd/divider";
import {MomentFromNowPipe} from "@app-ordco/ord-layout/pipes/moment-from-now.pipe";
import {MomentFormatPipe } from './pipes/moment-format-pipe.pipe';


@NgModule({
  declarations: [
    OrdAsideMenuComponent,
    ShowMenuItemPipe,
    OrdMenuIconComponent,
    OrdHeaderMenuComponent,
    BreadcrumbComponent,
    GetBrotherMenuItemsPipe,
    OrdContentComponent,
    OrdBreadcrumbItemComponent,
    OrdUserInnerComponent,
    ModalChangePwdComponent,
    ModalUserProfileComponent,
    OrdNotificationIconComponent,
    MomentFromNowPipe,
    MomentFormatPipe
  ],
  exports: [
    OrdAsideMenuComponent,
    OrdUserInnerComponent,
    OrdHeaderMenuComponent,
    BreadcrumbComponent,
    OrdContentComponent,
    OrdNotificationIconComponent,
    MomentFromNowPipe,
    MomentFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    InlineSVGModule,
    TranslationModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzIconModule,
    NgbDropdownModule,
    NzBackTopModule,
    ReuseTabModuleConfigModule,
    NzGridModule,
    NzModalModule,
    NzButtonModule,
    FormWidgetsModule,
    NzBadgeModule,
    NzCardModule,
    NzListModule,
    NzDividerModule
  ]
})
export class OrdLayoutModule {
}
