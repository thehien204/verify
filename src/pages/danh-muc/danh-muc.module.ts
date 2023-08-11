import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormWidgetsModule} from '@app-ordco/form-widgets/form-widgets.module';
import {TinhComponent} from './tinh/tinh.component';
import {DanhMucRoutingModule} from './danh-muc-routing.module';
import {OrdSharedModule} from '@app-ordco/ord-shared/ord-shared.module';
import {OpModule, OtModule} from '@node_modules/@orendaco/of';
import {DisplayTextPipeModule} from '@app-ordco/display-text-pipe/display-text-pipe.module';
import {HuyenComponent} from './huyen/huyen.component';
import {XaComponent} from './xa/xa.component';
import {IndexComponent} from './index/index.component';
import {InlineSVGModule} from '@node_modules/ng-inline-svg';
import {OrdTableModule} from '@app-ordco/ord-table/ord-table.module';
import {NzInputModule} from '@node_modules/ng-zorro-antd/input';
import {NhomSanPhamComponent} from './nhom-san-pham/nhom-san-pham.component';
import {QuocGiaComponent} from './quoc-gia/quoc-gia.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { KhungGioDisplayPipe } from './schedule/khung-gio-display.pipe';
import { NhomDoanhNghiepComponent } from './nhom-doanh-nghiep/nhom-doanh-nghiep.component';


@NgModule({
  declarations: [
    TinhComponent,
    HuyenComponent,
    XaComponent,
    IndexComponent,
    NhomSanPhamComponent,
    QuocGiaComponent,
    ScheduleComponent,
    KhungGioDisplayPipe,
    NhomDoanhNghiepComponent
  ],
    imports: [
        CommonModule,
        FormWidgetsModule,
        DanhMucRoutingModule,
        OrdSharedModule,
        OtModule,
        OpModule,
        DisplayTextPipeModule,
        InlineSVGModule,
        OrdTableModule,
        NzInputModule
    ]
})
export class DanhMucModule {
}
