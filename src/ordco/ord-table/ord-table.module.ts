import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdColumnComponent} from '@app-ordco/ord-table/columns/ord-column.component';
import {OrdGridComponent} from './ord-grid/ord-grid.component';
import {GridModule} from '@node_modules/@syncfusion/ej2-angular-grids';
import {OrdHeaderColumnDirective} from '@app-ordco/ord-table/columns/ord-header-column.directive';
import {OrdContentColumnDirective} from '@app-ordco/ord-table/columns/ord-content-column.directive';
import {OpModule, OtModule} from '@node_modules/@orendaco/of';
import {NzSpinModule} from '@node_modules/ng-zorro-antd/spin';
import {NzCheckboxModule} from '@node_modules/ng-zorro-antd/checkbox';
import {FormsModule} from '@node_modules/@angular/forms';
import {TranslateModule} from '@node_modules/@ngx-translate/core';
import {InlineSVGModule} from '@node_modules/ng-inline-svg';


@NgModule({
  declarations: [
    OrdColumnComponent,
    OrdGridComponent,
    OrdHeaderColumnDirective,
    OrdContentColumnDirective
  ],
  exports: [
    OrdGridComponent,
    OrdColumnComponent,
    OrdHeaderColumnDirective,
    OrdContentColumnDirective
  ],
  imports: [
    CommonModule,
    GridModule,
    OpModule,
    NzSpinModule,
    NzCheckboxModule,
    FormsModule,
    TranslateModule,
    OtModule,
    InlineSVGModule
  ]
})
export class OrdTableModule {
}
