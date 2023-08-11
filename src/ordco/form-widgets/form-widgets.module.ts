import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfModule, OfWidgetRegistry} from '@orendaco/of';
import {DateRangeComponent} from './custom-widget/date-range/date-range.component';
import {DateRangeWithCustomSelectComponent} from './custom-widget/date-range-with-custom-select/date-range-with-custom-select.component';
import {ReactiveFormsModule} from '@node_modules/@angular/forms';
import {NzSelectModule} from '@node_modules/ng-zorro-antd/select';
import {NzSpinModule} from '@node_modules/ng-zorro-antd/spin';
import {NzEmptyModule} from '@node_modules/ng-zorro-antd/empty';
import {NzDividerModule} from '@node_modules/ng-zorro-antd/divider';
import {NzIconModule} from '@node_modules/ng-zorro-antd/icon';
import {NzInputModule} from '@node_modules/ng-zorro-antd/input';
import {NzGridModule} from '@node_modules/ng-zorro-antd/grid';
import {NzPopoverModule} from '@node_modules/ng-zorro-antd/popover';
import {NzToolTipModule} from '@node_modules/ng-zorro-antd/tooltip';
import {NzTagModule} from '@node_modules/ng-zorro-antd/tag';
import {NzAutocompleteModule} from '@node_modules/ng-zorro-antd/auto-complete';
import {TranslateModule} from '@node_modules/@ngx-translate/core';
import {NzButtonModule} from '@node_modules/ng-zorro-antd/button';
import {NzInputNumberModule} from '@node_modules/ng-zorro-antd/input-number';
import {NzRadioModule} from '@node_modules/ng-zorro-antd/radio';
import {NzDropDownModule} from '@node_modules/ng-zorro-antd/dropdown';
import {NzDatePickerModule} from '@node_modules/ng-zorro-antd/date-picker';
import {DemoCustomControlComponent} from './custom-widget/demo-custom-control/demo-custom-control.component';
import {DanhSachHinhAnhSanPhamComponent} from './custom-widget/danh-sach-hinh-anh-san-pham/danh-sach-hinh-anh-san-pham.component';
import {NzUploadModule} from "@node_modules/ng-zorro-antd/upload";
import {NzModalModule} from "@node_modules/ng-zorro-antd/modal";
import {HinhAnhBannerComponent} from './custom-widget/hinh-anh-banner/hinh-anh-banner.component';
import { UploadGiayChungNhanComponent } from './custom-widget/upload-giay-chung-nhan/upload-giay-chung-nhan.component';
import { DoanhNghiepSelectComponent } from './custom-widget/doanh-nghiep-select/doanh-nghiep-select.component';
import {DisplayTextPipeModule} from "@app-ordco/display-text-pipe/display-text-pipe.module";
import { SanPhamCuaDoanhNghiepSelectComponent } from './custom-widget/san-pham-cua-doanh-nghiep-select/san-pham-cua-doanh-nghiep-select.component';

@NgModule({
  declarations: [
    DateRangeComponent,
    DateRangeWithCustomSelectComponent,
    DemoCustomControlComponent,
    DanhSachHinhAnhSanPhamComponent,
    HinhAnhBannerComponent,
    UploadGiayChungNhanComponent,
    DoanhNghiepSelectComponent,
    SanPhamCuaDoanhNghiepSelectComponent
  ],
    imports: [
        CommonModule,
        OfModule.forRoot({
            nzSelectIgnoreEnterKeyOpenDropDown: true,
            nzSelectFocusInOpenDropDown: false,
            showErrorWhenDirty: true
        }),
        ReactiveFormsModule,
        NzSelectModule,
        NzSpinModule,
        NzEmptyModule,
        NzDividerModule,
        NzIconModule,
        NzInputModule,
        NzGridModule,
        NzPopoverModule,
        NzToolTipModule,
        NzTagModule,
        NzAutocompleteModule,
        TranslateModule,
        NzButtonModule,
        NzInputNumberModule,
        NzRadioModule,
        NzDropDownModule,
        NzDatePickerModule,
        NzUploadModule,
        NzModalModule,
        DisplayTextPipeModule
    ],
  exports: [OfModule]
})
export class FormWidgetsModule {
  constructor(widgetRegistry: OfWidgetRegistry) {
    // widgetRegistry.register('text', DemoCustomControlComponent);
  }
}
