import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoaiDichVuComponent} from "./loai-dich-vu/loai-dich-vu.component";
import {BangGiaDichVuComponent} from "./bang-gia-dich-vu/bang-gia-dich-vu.component";
import {GoiDichVuComponent} from "./goi-dich-vu/goi-dich-vu.component";
import {QuanLyDangKyGoiComponent} from "./quan-ly-dang-ky-goi/quan-ly-dang-ky-goi.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'loai-dich-vu', component: LoaiDichVuComponent},
      {path: 'bang-gia-dich-vu', component: BangGiaDichVuComponent},
      {path: 'goi-dich-vu', component: GoiDichVuComponent},
      {path: 'quan-ly-dang-ky-goi', component: QuanLyDangKyGoiComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DichVuRoutingModule {
}
