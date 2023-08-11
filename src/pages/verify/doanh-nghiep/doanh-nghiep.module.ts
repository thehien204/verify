import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoanhNghiepRoutingModule} from './doanh-nghiep-routing.module';
import {FormWidgetsModule} from "@app-ordco/form-widgets/form-widgets.module";
import {OrdSharedModule} from "@app-ordco/ord-shared/ord-shared.module";
import {OpModule, OtModule} from "@node_modules/@orendaco/of";
import {DisplayTextPipeModule} from "@app-ordco/display-text-pipe/display-text-pipe.module";
import {OrdTableModule} from "@app-ordco/ord-table/ord-table.module";
import {NzInputModule} from "@node_modules/ng-zorro-antd/input";
import {QuanLyDoanhNghiepComponent} from './quan-ly-doanh-nghiep/quan-ly-doanh-nghiep.component';
import {ChiTietDoanhNghiepComponent} from './chi-tiet-doanh-nghiep/chi-tiet-doanh-nghiep.component';
import {LogoDoanhNghiepComponent} from './chi-tiet-doanh-nghiep/logo-doanh-nghiep/logo-doanh-nghiep.component';
import {ThongTinCoBanDnComponent} from './chi-tiet-doanh-nghiep/thong-tin-co-ban-dn/thong-tin-co-ban-dn.component';
import {NzUploadModule} from "@node_modules/ng-zorro-antd/upload";
import {NzSpinModule} from "@node_modules/ng-zorro-antd/spin";
import {SanPhamDoanhNghiepComponent} from './san-pham-doanh-nghiep/san-pham-doanh-nghiep.component';
import {UploadExcelSanPhamComponent} from './upload-excel-san-pham/upload-excel-san-pham.component';
import {NzTabsModule} from "@node_modules/ng-zorro-antd/tabs";
import {NzTableModule} from "@node_modules/ng-zorro-antd/table";
import {NzToolTipModule} from "@node_modules/ng-zorro-antd/tooltip";
import {DsSanPhamComponent} from './ds-san-pham/ds-san-pham.component';
import {
  BarcodeGeneratorAllModule,
  QRCodeGeneratorModule
} from "@node_modules/@syncfusion/ej2-angular-barcode-generator";
import {SanPhamNoiBatComponent} from './ds-san-pham-noi-bat/san-pham-noi-bat.component';
import {DsDoanhNghiepNoiBatComponent} from './ds-doanh-nghiep-noi-bat/ds-doanh-nghiep-noi-bat.component';
import {UploadGiayChungNhanComponent} from './ds-san-pham/upload-giay-chung-nhan/upload-giay-chung-nhan.component';
import {DsDanhGiaSanPhamComponent} from "./ds-danh-gia-sp/ds-danh-gia-san-pham.component";
import {NzRateModule} from "@node_modules/ng-zorro-antd/rate";
import {DanhGiaSanPhamModalComponent} from './ds-danh-gia-sp/danh-gia-san-pham-modal/danh-gia-san-pham-modal.component';
import {NzCommentModule} from "@node_modules/ng-zorro-antd/comment";
import {NzAvatarModule} from "@node_modules/ng-zorro-antd/avatar";
import {NzGridModule} from "@node_modules/ng-zorro-antd/grid";
import {OrdLayoutModule} from "@app-ordco/ord-layout/ord-layout.module";
import {
  ThietLapLuotDanhGiaSanPhamComponent
} from './ds-danh-gia-sp/thiet-lap-luot-danh-gia-san-pham/thiet-lap-luot-danh-gia-san-pham.component';
import {NzFormModule} from "@node_modules/ng-zorro-antd/form";
import {NzInputNumberModule} from "@node_modules/ng-zorro-antd/input-number";
import {
  ThongTinNguoiLienHeTitleComponent
} from "./quan-ly-doanh-nghiep/thong-tin-nguoi-dai-dien-title/thong-tin-nguoi-lien-he-title.component";
import {
  ThongTinNguoiDaiDienTitleComponent
} from "./quan-ly-doanh-nghiep/thong-tin-nguoi-dai-dien-title/thong-tin-nguoi-dai-dien-title.component";
import {ProductBarcodeComponent} from './san-pham-doanh-nghiep/product-barcode/product-barcode.component';
import {DuyetXacThucSanPhamComponent} from './duyet-xac-thuc-san-pham/duyet-xac-thuc-san-pham.component';
import {NzTagModule} from "ng-zorro-antd/tag";
import {
  CapNhatGcpModalComponent
} from './chi-tiet-doanh-nghiep/thong-tin-co-ban-dn/cap-nhat-gcp-modal/cap-nhat-gcp-modal.component';
import {
  DoanhNghiepMaDiaDiemComponent
} from "./chi-tiet-doanh-nghiep/doanh-nghiep-ma-dia-diem/doanh-nghiep-ma-dia-diem.component";
import {
  CreateOrEditDoanhNghiepMaToanCauComponent
} from "./chi-tiet-doanh-nghiep/doanh-nghiep-ma-dia-diem/create-or-edit.component";
import {OraTableModule} from "@app-ordco/ora-table/ora-table.module";
import {OraSelectModule} from "@app-ordco/ora-select/ora-select.module";
import {NzCheckboxModule} from "@node_modules/ng-zorro-antd/checkbox";
import {NzDatePickerModule} from "@node_modules/ng-zorro-antd/date-picker";
import {OraDateTimeModule} from "@app-ordco/ora-date-time/ora-date-time.module";
import {
  GoiDvDoanhNghiepDangKyComponent
} from "./chi-tiet-doanh-nghiep/goi-dv-doanh-nghiep-dang-ky/goi-dv-doanh-nghiep-dang-ky.component";
import {
  XemGoiDichVuDangKyComponent
} from "./chi-tiet-doanh-nghiep/goi-dv-doanh-nghiep-dang-ky/xem-goi-dich-vu-dang-ky/xem-goi-dich-vu-dang-ky.component";
import {NzDescriptionsModule} from "@node_modules/ng-zorro-antd/descriptions";
import {QuanLyTaiKhoanDnComponent} from "./chi-tiet-doanh-nghiep/quan-ly-tai-khoan-dn/quan-ly-tai-khoan-dn.component";
import {CustomModule} from "@app-ordco/custom/custom.module";
import {NzAlertModule} from "@node_modules/ng-zorro-antd/alert";


@NgModule({
  declarations: [
    QuanLyDoanhNghiepComponent,
    ChiTietDoanhNghiepComponent,
    LogoDoanhNghiepComponent,
    ThongTinCoBanDnComponent,
    SanPhamDoanhNghiepComponent,
    UploadExcelSanPhamComponent,
    DsSanPhamComponent,
    SanPhamNoiBatComponent,
    DsDoanhNghiepNoiBatComponent,
    UploadGiayChungNhanComponent,
    DsDanhGiaSanPhamComponent,
    DanhGiaSanPhamModalComponent,
    ThietLapLuotDanhGiaSanPhamComponent,
    ThongTinNguoiDaiDienTitleComponent,
    ThongTinNguoiLienHeTitleComponent,
    ProductBarcodeComponent,
    DuyetXacThucSanPhamComponent,
    CapNhatGcpModalComponent,
    DoanhNghiepMaDiaDiemComponent, CreateOrEditDoanhNghiepMaToanCauComponent,
    GoiDvDoanhNghiepDangKyComponent, XemGoiDichVuDangKyComponent,
    QuanLyTaiKhoanDnComponent,
  ],
  imports: [
    DoanhNghiepRoutingModule,
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
    BarcodeGeneratorAllModule,
    NzRateModule,
    NzCommentModule,
    NzAvatarModule,
    NzGridModule,
    OrdLayoutModule,
    NzFormModule,
    NzInputNumberModule,
    QRCodeGeneratorModule,
    NzTagModule,
    OraTableModule,
    OraSelectModule,
    NzCheckboxModule,
    NzDatePickerModule,
    OraDateTimeModule,
    NzDescriptionsModule,
    CustomModule,
    NzAlertModule,
  ]
})
export class DoanhNghiepModule {
}
