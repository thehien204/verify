import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';
import {AuditLogsComponent} from "./audit-logs/audit-logs.component";
import {SysVersionComponent} from "./sys-version/sys-version.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'users', component: UsersComponent},
      {path: 'roles', component: RolesComponent},
      {path: 'audit-logs', component: AuditLogsComponent},
      {path: 'version', component: SysVersionComponent},
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
