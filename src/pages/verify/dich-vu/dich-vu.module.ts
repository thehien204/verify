import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DichVuRoutingModule} from './dich-vu-routing.module';
import {FormWidgetsModule} from "@app-ordco/form-widgets/form-widgets.module";
import {OrdSharedModule} from "@app-ordco/ord-shared/ord-shared.module";
import {OpModule, OtModule} from "@node_modules/@orendaco/of";
import {DisplayTextPipeModule} from "@app-ordco/display-text-pipe/display-text-pipe.module";
import {OrdTableModule} from "@app-ordco/ord-table/ord-table.module";
import {NzInputModule} from "@node_modules/ng-zorro-antd/input";
import {LoaiDichVuComponent} from './loai-dich-vu/loai-dich-vu.component';
import {BangGiaDichVuComponent} from './bang-gia-dich-vu/bang-gia-dich-vu.component';
import {GoiDichVuComponent} from './goi-dich-vu/goi-dich-vu.component';
import {GoiDichVuChiTietFormComponent} from './goi-dich-vu/goi-dich-vu-chi-tiet-form/goi-dich-vu-chi-tiet-form.component';
import {NzInputNumberModule} from "@node_modules/ng-zorro-antd/input-number";
import {NzCheckboxModule} from "@node_modules/ng-zorro-antd/checkbox";
import {NzTableModule} from "@node_modules/ng-zorro-antd/table";
import {NzSelectModule} from "@node_modules/ng-zorro-antd/select";
import { QuanLyDangKyGoiComponent } from './quan-ly-dang-ky-goi/quan-ly-dang-ky-goi.component';
import { XemGoiDichVuDangKyComponent } from './quan-ly-dang-ky-goi/xem-goi-dich-vu-dang-ky/xem-goi-dich-vu-dang-ky.component';
import {NzDescriptionsModule} from "@node_modules/ng-zorro-antd/descriptions";
import {OrdLayoutModule} from "@app-ordco/ord-layout/ord-layout.module";
import {NzFormModule} from "@node_modules/ng-zorro-antd/form";
import {NzDatePickerModule} from "@node_modules/ng-zorro-antd/date-picker";
import {OraSelectModule} from "@app-ordco/ora-select/ora-select.module";
import {PheDuyetHoSoDkComponent} from "./quan-ly-dang-ky-goi/phe-duyet-ho-so-dk/phe-duyet-ho-so-dk.component";
import {CustomModule} from "@app-ordco/custom/custom.module";
import {OraDateTimeModule} from "@app-ordco/ora-date-time/ora-date-time.module";


@NgModule({
  declarations: [
    LoaiDichVuComponent,
    BangGiaDichVuComponent,
    GoiDichVuComponent,
    GoiDichVuChiTietFormComponent,
    QuanLyDangKyGoiComponent,
    XemGoiDichVuDangKyComponent, PheDuyetHoSoDkComponent
  ],
  imports: [
    DichVuRoutingModule,
    CommonModule,
    FormWidgetsModule,
    OrdSharedModule,
    OtModule,
    OpModule,
    DisplayTextPipeModule,
    OrdTableModule,
    NzInputModule,
    NzInputNumberModule,
    NzCheckboxModule,
    NzTableModule,
    NzSelectModule,
    NzDescriptionsModule,
    OrdLayoutModule,
    NzFormModule,
    NzDatePickerModule,
    OraSelectModule,
    CustomModule,
    OraDateTimeModule
  ]
})
export class DichVuModule {
}
