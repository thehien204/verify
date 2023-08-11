import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {XemSanPhamByGtinComponent} from "./xem-san-pham-by-gtin/xem-san-pham-by-gtin.component";
import {ServiceProxyModule} from "@service-proxies/service-proxy.module";
import { MillionPipe } from './million.pipe';
import { DecimalPipe } from '@angular/common'
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'san-pham-gtin/:gtin',
            component: XemSanPhamByGtinComponent
          },
        ]
      }
    ])
  ],
  providers: [ServiceProxyModule, DecimalPipe],
  declarations: [ MillionPipe ],
  exports: [RouterModule]
})
export class NoLayoutRoutingModule {
}
