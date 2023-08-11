import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@node_modules/@ngx-translate/core';
import {NzOutletModule} from '@node_modules/ng-zorro-antd/core/outlet';
import {NzPaginationModule} from '@node_modules/ng-zorro-antd/pagination';
import {NzTableModule} from '@node_modules/ng-zorro-antd/table';
import {OraCellDirective} from './directives/ora-cell.directive';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "@node_modules/ng-zorro-antd/icon";
import {NzEmptyModule} from "@node_modules/ng-zorro-antd/empty";
import {NzTagModule} from "@node_modules/ng-zorro-antd/tag";
import { OraTableComponent } from './table.component';
import { OraColumnDirective } from './directives/ora-column.directive';
import { OraHeaderDirective } from './directives/ora-header.directive';
import {NzSpinModule} from "@node_modules/ng-zorro-antd/spin";
import {OrdLayoutModule} from "@app-ordco/ord-layout/ord-layout.module";

const COM_EXPORT = [OraTableComponent, OraColumnDirective, OraCellDirective, OraHeaderDirective];

@NgModule({
  declarations: [...COM_EXPORT],
  exports: [...COM_EXPORT],
  imports: [CommonModule, NzTableModule, NzOutletModule, TranslateModule, NzPaginationModule, NzButtonModule, NzIconModule, NzEmptyModule, NzTagModule, NzSpinModule, OrdLayoutModule],
})
export class OraTableModule {
}
