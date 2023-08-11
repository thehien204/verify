import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TinhPipe} from './tinh.pipe';
import {HuyenPipe} from '@app-ordco/display-text-pipe/huyen.pipe';
import {TitleTotalRecordTablePipe} from './title-total-record-table.pipe';
import {XaPipe} from '@app-ordco/display-text-pipe/xa.pipe';
import {TrangThaiDoanhNghiepPipe} from "@app-ordco/display-text-pipe/trang-thai-doanh-nghiep.pipe";
import {NhomDichVuPipe} from "@app-ordco/display-text-pipe/nhom-dich-vu.pipe";
import {DichVuPipe} from "@app-ordco/display-text-pipe/dich-vu.pipe";
import {ImgUrlPipe} from "@app-ordco/display-text-pipe/img-url.pipe";
import {NhomSanPhamPipe} from "@app-ordco/display-text-pipe/nhom-san-pham.pipe";
import {LoaiDonViTinhDichVuPipe} from "@app-ordco/display-text-pipe/loai-don-vi-tinh-dich-vu.pipe";
import {LoaiDichVuPipe} from "@app-ordco/display-text-pipe/loai-dich-vu.pipe";
import {DonViTinhGiaPipe} from "@app-ordco/display-text-pipe/don-vi-tinh-gia.pipe";
import {DoanhNghiepCellComponent} from './doanh-nghiep-cell/doanh-nghiep-cell.component';
import {TrangThaiSanPhamNoiBatPipe} from "@app-ordco/display-text-pipe/trang-thai-san-pham-noi-bat.pipe";
import {TrangThaiDoanhNghiepNoiBatPipe} from "@app-ordco/display-text-pipe/trang-thai-doanh-nghiep-noi-bat.pipe";
import {LoaiThongBaoPipe} from "@app-ordco/display-text-pipe/loai-thong-bao.pipe";
import {VaiTroPipe} from './vai-tro.pipe';
import {LoaiTaiKhoanPipe} from "@app-ordco/display-text-pipe/loai-tai-khoan.pipe";
import {TenThongBaoPipe} from "@app-ordco/display-text-pipe/ten-thong-bao.pipe";
import {NhomDoanhNghiepPipe} from "@app-ordco/display-text-pipe/nhom-doanh-nghiep.pipe";

const PIPE = [
  TinhPipe,
  HuyenPipe,
  XaPipe,
  TrangThaiDoanhNghiepPipe,
  NhomDichVuPipe,
  DichVuPipe,
  ImgUrlPipe,
  NhomSanPhamPipe,
  LoaiDonViTinhDichVuPipe,
  LoaiDichVuPipe,
  DonViTinhGiaPipe,
  TrangThaiSanPhamNoiBatPipe,
  TrangThaiDoanhNghiepNoiBatPipe,
  LoaiThongBaoPipe,
  VaiTroPipe,
  LoaiTaiKhoanPipe,
  TenThongBaoPipe,
  NhomDoanhNghiepPipe
];

@NgModule({
  declarations: [PIPE, TitleTotalRecordTablePipe, DoanhNghiepCellComponent],
  imports: [CommonModule],
  exports: [PIPE, TitleTotalRecordTablePipe, DoanhNghiepCellComponent]
})
export class DisplayTextPipeModule {
}
