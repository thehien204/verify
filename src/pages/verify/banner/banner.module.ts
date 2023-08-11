import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormWidgetsModule} from "@app-ordco/form-widgets/form-widgets.module";
import {OrdSharedModule} from "@app-ordco/ord-shared/ord-shared.module";
import {OpModule, OtModule} from "@node_modules/@orendaco/of";
import {DisplayTextPipeModule} from "@app-ordco/display-text-pipe/display-text-pipe.module";
import {OrdTableModule} from "@app-ordco/ord-table/ord-table.module";
import {NzInputModule} from "@node_modules/ng-zorro-antd/input";
import {NzUploadModule} from "@node_modules/ng-zorro-antd/upload";
import {NzSpinModule} from "@node_modules/ng-zorro-antd/spin";
import {NzTabsModule} from "@node_modules/ng-zorro-antd/tabs";
import {NzTableModule} from "@node_modules/ng-zorro-antd/table";
import {NzToolTipModule} from "@node_modules/ng-zorro-antd/tooltip";
import {RouterModule} from "@node_modules/@angular/router";
import {ListBannerComponent} from './list-banner/list-banner.component';

@NgModule({
  declarations: [
    ListBannerComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {path: 'list', component: ListBannerComponent},
        ]
      }
    ]),
    CommonModule,
    FormWidgetsModule,
    OrdSharedModule,
    OtModule,
    OpModule,
    DisplayTextPipeModule,
    OrdTableModule,
    NzInputModule,
    NzUploadModule,
    NzSpinModule,
    NzTabsModule,
    NzTableModule,
    NzToolTipModule,
  ]
})
export class BannerModule {
}
