import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OraTextComponent} from "@app-ordco/ora-select/ora-text.component";
import {OraSelectComponent} from "@app-ordco/ora-select/ora-select.component";
import {CustomSourceDirective} from "@app-ordco/ora-select/directives/customSource.directive";
import {OraRadioComponent} from "@app-ordco/ora-select/ora-radio.component";
import {NotificationNameDirective} from "@app-ordco/ora-select/directives/notification-name.directive";
import {LoaiThongBaoDirective} from "@app-ordco/ora-select/directives/loai-thong-bao.directive";
import {NzSelectModule} from "@node_modules/ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@node_modules/@angular/forms";
import {NzRadioModule} from "@node_modules/ng-zorro-antd/radio";
import {VaiTroDirective} from "@app-ordco/ora-select/directives/vai-tro.directive";
import {ThietBiNhanThongBaoDirective} from "@app-ordco/ora-select/directives/thiet-bi-nhan-thong-bao.directive";
import {LoaiTaiKhoanDirective} from './directives/loai-tai-khoan.directive';
import {IsOptionPipe} from "@app-ordco/ora-select/is-option.pipe";
import {OraSelectMultiComponent} from "@app-ordco/ora-select/ora-select-multi.component";
import {NzDividerModule} from "@node_modules/ng-zorro-antd/divider";
import {NzCheckboxModule} from "@node_modules/ng-zorro-antd/checkbox";
import {ListNguoiDungDirective} from './directives/list-nguoi-dung.directive';
import {DirNhomDoanhNghiepDirective} from "@app-ordco/ora-select/directives/dir-nhom-doanh-nghiep.directive";
import {DirLoaiDoiTuongNhanTbDirective} from "@app-ordco/ora-select/directives/dirLoaiDoiTuongNhanTb.directive";
import { DirDoanhNghiepDirective } from './directives/dir-doanh-nghiep.directive';

const com = [OraTextComponent, OraSelectComponent, OraRadioComponent, OraSelectMultiComponent];
const pipe = [];
const dir = [CustomSourceDirective,
  NotificationNameDirective,
  LoaiThongBaoDirective,
  VaiTroDirective,
  ThietBiNhanThongBaoDirective,
  LoaiTaiKhoanDirective,
  ListNguoiDungDirective,
  DirNhomDoanhNghiepDirective,
  DirLoaiDoiTuongNhanTbDirective
]

@NgModule({
  declarations: [...com, ...pipe, ...dir, IsOptionPipe, DirDoanhNghiepDirective],
  exports: [...com, ...pipe, ...dir, DirDoanhNghiepDirective],
  imports: [
    CommonModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzRadioModule,
    FormsModule,
    NzDividerModule,
    NzCheckboxModule
  ]
})
export class OraSelectModule {
}
