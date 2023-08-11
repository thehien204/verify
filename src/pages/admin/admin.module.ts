import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormWidgetsModule} from '@app-ordco/form-widgets/form-widgets.module';
import {OrdSharedModule} from '@app-ordco/ord-shared/ord-shared.module';
import {OpModule, OtModule} from '@node_modules/@orendaco/of';
import {DisplayTextPipeModule} from '@app-ordco/display-text-pipe/display-text-pipe.module';
import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';
import {RolePermissionComponent} from './role-permission/role-permission.component';
import {InlineSVGModule} from '@node_modules/ng-inline-svg';
import {PermissionTreeComponent} from './permission-tree/permission-tree.component';
import {NzTreeModule} from '@node_modules/ng-zorro-antd/tree';
import {NzCheckboxModule} from '@node_modules/ng-zorro-antd/checkbox';
import {GrantRoleUserComponent} from './grant-role-user/grant-role-user.component';
import {NzGridModule} from '@node_modules/ng-zorro-antd/grid';
import {OrdTableModule} from '@app-ordco/ord-table/ord-table.module';
import {AuditLogsComponent} from './audit-logs/audit-logs.component';
import { GanDoanhNghiepPhuTrachComponent } from './users/gan-doanh-nghiep-phu-trach/gan-doanh-nghiep-phu-trach.component';
import {NzTagModule} from "@node_modules/ng-zorro-antd/tag";
import {SysVersionComponent} from "./sys-version/sys-version.component";


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    RolePermissionComponent,
    PermissionTreeComponent,
    GrantRoleUserComponent,
    AuditLogsComponent,
    GanDoanhNghiepPhuTrachComponent,
    SysVersionComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormWidgetsModule,
    OrdSharedModule,
    OtModule,
    OpModule,
    DisplayTextPipeModule,
    InlineSVGModule,
    NzTreeModule,
    NzCheckboxModule,
    NzGridModule,
    OrdTableModule,
    NzTagModule
  ]
})
export class AdminModule {
}
