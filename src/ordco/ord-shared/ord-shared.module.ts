import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzSpinModule} from '@node_modules/ng-zorro-antd/spin';
import {CommonGridActionsComponent} from './crud-page/common-grid-actions/common-grid-actions.component';
import {CommonGridActionItemComponent} from './crud-page/common-grid-actions/common-grid-action-item.component';
import {FormWidgetsModule} from '../form-widgets/form-widgets.module';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from '@node_modules/ng-zorro-antd/button';
import {NzIconModule} from '@node_modules/ng-zorro-antd/icon';
import {NzDropDownModule} from '@node_modules/ng-zorro-antd/dropdown';
import {NzBreadCrumbModule} from '@node_modules/ng-zorro-antd/breadcrumb';
import {TranslateModule} from '@node_modules/@ngx-translate/core';
import {RouterModule} from '@node_modules/@angular/router';
import {CommonConfirmModalComponent} from './crud-page/common-confirm-modal/common-confirm-modal.component';
import {CommonCreateUpdateDrawerComponent} from './crud-page/common-create-update-drawer/common-create-update-drawer.component';
import {NzDividerModule} from '@node_modules/ng-zorro-antd/divider';
import {CommonCreateUpdateModalComponent} from '@app-ordco/ord-shared/crud-page/common-create-update-modal/common-create-update-modal.component';
import {NzToolTipModule} from '@node_modules/ng-zorro-antd/tooltip';
import {SearchPageSharedComponent} from '@app-ordco/ord-shared/search-page-shared/search-page-shared.component';
import {NzGridModule} from '@node_modules/ng-zorro-antd/grid';
import {L10n, setCulture} from '@node_modules/@syncfusion/ej2-base';
import {GridModule} from '@node_modules/@syncfusion/ej2-angular-grids';
import {CommonCellIsActiveComponent} from './crud-page/common-cell-is-active/common-cell-is-active.component';
import {CommonHeaderSortComponent} from '@app-ordco/ord-shared/crud-page/common-header-sort/common-header-sort.component';
import {CommonEditModalComponent} from './crud-page/common-edit-modal/common-edit-modal.component';
import {CommonSaveButtonGroupComponent} from './save-button-group/common-save-button-group.component';
import {CommonSearchFormComponent} from '@app-ordco/ord-shared/crud-page/common-search-form/common-search-form.component';
import {CommonHeaderFilterComponent} from './crud-page/common-header-filter/common-header-filter.component';


setCulture('vi');
L10n.load({
  vi: {
    grid: {
      EmptyRecord: 'Không có dữ liệu',
      EmptyDataSourceError: 'Không có dữ liệu',
      Item: 'Bản ghi',
      Items: 'Bản ghi',
    },
  },
});


@NgModule({
  declarations: [
    SearchPageSharedComponent,
    CommonCreateUpdateModalComponent,
    CommonGridActionsComponent,
    CommonGridActionItemComponent,
    CommonConfirmModalComponent,
    CommonCreateUpdateDrawerComponent,
    CommonHeaderSortComponent,
    CommonCellIsActiveComponent,
    CommonEditModalComponent,
    CommonSaveButtonGroupComponent,
    CommonSearchFormComponent,
    CommonHeaderFilterComponent
  ],
  imports: [
    CommonModule,
    NzSpinModule,
    FormWidgetsModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    RouterModule,
    NzDividerModule,
    NzToolTipModule,
    NzGridModule,
    TranslateModule
  ],
    exports: [
        GridModule,
        SearchPageSharedComponent,
        CommonGridActionsComponent,
        CommonGridActionItemComponent,
        NzModalModule,
        FormWidgetsModule,
        NzButtonModule,
        NzIconModule,
        CommonHeaderSortComponent,
        CommonCellIsActiveComponent,
        TranslateModule,
        CommonSaveButtonGroupComponent,
        CommonSearchFormComponent,
        CommonHeaderFilterComponent
    ],
})
export class OrdSharedModule {
}
