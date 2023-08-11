import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomModule } from "@app-ordco/custom/custom.module";
import { DisplayTextPipeModule } from "@app-ordco/display-text-pipe/display-text-pipe.module";
import { FormWidgetsModule } from "@app-ordco/form-widgets/form-widgets.module";
import { OraDateTimeModule } from "@app-ordco/ora-date-time/ora-date-time.module";
import { OraSelectModule } from "@app-ordco/ora-select/ora-select.module";
import { OrdLayoutModule } from "@app-ordco/ord-layout/ord-layout.module";
import { OrdSharedModule } from "@app-ordco/ord-shared/ord-shared.module";
import { OrdTableModule } from "@app-ordco/ord-table/ord-table.module";
import { OpModule, OtModule } from "@orendaco/of";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzTagModule } from "ng-zorro-antd/tag";
import { BaoCaoHopDongComponent } from "./bao-cao-hop-dong/bao-cao-hop-dong.component";
import { BaoCaoLuotQuetComponent } from "./bao-cao-luot-quet/bao-cao-luot-quet.component";
import { BaoCaoLuotViewComponent } from "./bao-cao-luot-view/bao-cao-luot-view.component";
import { BaoCaoTaiKhoanComponent } from "./bao-cao-tai-khoan/bao-cao-tai-khoan.component";
import { BaoCaoRoutingModule } from "./bao-cao.routing.module";

@NgModule({
  declarations: [
    BaoCaoLuotViewComponent,
    BaoCaoLuotQuetComponent,
    BaoCaoHopDongComponent,
    BaoCaoTaiKhoanComponent
  ],
  imports: [
    BaoCaoRoutingModule,
    CommonModule,
    FormWidgetsModule,
    OrdSharedModule,
    OtModule,
    OpModule,
    DisplayTextPipeModule,
    OrdTableModule,
    NzInputModule,
    NzInputNumberModule,
    NzCheckboxModule,
    NzTableModule,
    NzSelectModule,
    NzDescriptionsModule,
    OrdLayoutModule,
    NzFormModule,
    NzDatePickerModule,
    OraSelectModule,
    CustomModule,
    OraDateTimeModule,
    NzTagModule
  ]
})
export class BaoCaoModule {

}
