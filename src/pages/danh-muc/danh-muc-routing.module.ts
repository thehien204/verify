import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TinhComponent} from './tinh/tinh.component';
import {HuyenComponent} from './huyen/huyen.component';
import {XaComponent} from './xa/xa.component';
import {IndexComponent} from './index/index.component';
import {NhomSanPhamComponent} from "./nhom-san-pham/nhom-san-pham.component";
import {QuocGiaComponent} from "./quoc-gia/quoc-gia.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {NhomDoanhNghiepComponent} from "./nhom-doanh-nghiep/nhom-doanh-nghiep.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {path: 'index', component: IndexComponent},
          {path: 'quoc-gia', component: QuocGiaComponent},
          {path: 'tinh', component: TinhComponent},
          {path: 'huyen', component: HuyenComponent},
          {path: 'xa', component: XaComponent},
          {path: 'nhom-san-pham', component: NhomSanPhamComponent},
          {path: 'nhom-doanh-nghiep', component: NhomDoanhNghiepComponent},
          {path: 'schedule', component: ScheduleComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DanhMucRoutingModule {
}
