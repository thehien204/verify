import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaoCaoHopDongComponent } from "./bao-cao-hop-dong/bao-cao-hop-dong.component";
import { BaoCaoLuotQuetComponent } from "./bao-cao-luot-quet/bao-cao-luot-quet.component";
import { BaoCaoLuotViewComponent } from "./bao-cao-luot-view/bao-cao-luot-view.component";
import { BaoCaoTaiKhoanComponent } from "./bao-cao-tai-khoan/bao-cao-tai-khoan.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'bao-cao-luot-view', component: BaoCaoLuotViewComponent},
      {path: 'bao-cao-luot-quet', component: BaoCaoLuotQuetComponent},
      {path: 'bao-cao-tai-khoan', component: BaoCaoTaiKhoanComponent},
      {path: 'bao-cao-hop-dong', component: BaoCaoHopDongComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaoCaoRoutingModule {
}
