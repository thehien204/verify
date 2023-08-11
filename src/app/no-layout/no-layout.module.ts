import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XemSanPhamByGtinComponent } from './xem-san-pham-by-gtin/xem-san-pham-by-gtin.component';
import {NoLayoutRoutingModule} from "./no-layout-routing.module";
import {NzCardModule} from "@node_modules/ng-zorro-antd/card";
import {NzGridModule} from "@node_modules/ng-zorro-antd/grid";
import {NzRateModule} from "@node_modules/ng-zorro-antd/rate";
import {FormsModule} from "@node_modules/@angular/forms";
import {
  BarcodeGeneratorAllModule,
   QRCodeGeneratorModule
} from "@syncfusion/ej2-angular-barcode-generator";
import {NzTabsModule} from "@node_modules/ng-zorro-antd/tabs";
import {NzCommentModule} from "@node_modules/ng-zorro-antd/comment";
import {OrdLayoutModule} from "@app-ordco/ord-layout/ord-layout.module";
import {NzAvatarModule} from "@node_modules/ng-zorro-antd/avatar";
import {NzButtonModule} from "@node_modules/ng-zorro-antd/button";



@NgModule({
  declarations: [
    XemSanPhamByGtinComponent
  ],
  imports: [
    CommonModule,
    NoLayoutRoutingModule,
    NzCardModule,
    NzGridModule,
    NzRateModule,
    FormsModule,
    BarcodeGeneratorAllModule,
    QRCodeGeneratorModule,
    NzTabsModule,
    NzCommentModule,
    OrdLayoutModule,
    NzAvatarModule,
    NzButtonModule,
  ]
})
export class NoLayoutModule { }
