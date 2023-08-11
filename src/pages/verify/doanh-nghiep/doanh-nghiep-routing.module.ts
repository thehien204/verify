import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuanLyDoanhNghiepComponent} from "./quan-ly-doanh-nghiep/quan-ly-doanh-nghiep.component";
import {ChiTietDoanhNghiepComponent} from "./chi-tiet-doanh-nghiep/chi-tiet-doanh-nghiep.component";
import {DsSanPhamComponent} from "./ds-san-pham/ds-san-pham.component";
import {SanPhamNoiBatComponent} from "./ds-san-pham-noi-bat/san-pham-noi-bat.component";
import {DsDoanhNghiepNoiBatComponent} from "./ds-doanh-nghiep-noi-bat/ds-doanh-nghiep-noi-bat.component";
import {DsDanhGiaSanPhamComponent} from "./ds-danh-gia-sp/ds-danh-gia-san-pham.component";
import {DuyetXacThucSanPhamComponent} from "./duyet-xac-thuc-san-pham/duyet-xac-thuc-san-pham.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'quan-ly-doanh-nghiep', component: QuanLyDoanhNghiepComponent},
      {path: 'chi-tiet/:id', component: ChiTietDoanhNghiepComponent},
      {path: 'ds-san-pham', component: DsSanPhamComponent},
      {path: 'ds-san-pham-noi-bat', component: SanPhamNoiBatComponent},
      {path: 'ds-doanh-nghiep-noi-bat', component: DsDoanhNghiepNoiBatComponent},
      {path: 'ds-danh-gia-san-pham', component: DsDanhGiaSanPhamComponent},
      {path: 'duyet-xac-thuc', component: DuyetXacThucSanPhamComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoanhNghiepRoutingModule {
}
