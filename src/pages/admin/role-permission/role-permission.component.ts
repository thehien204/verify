import {Component, Injector, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {IGroupPermissionListDto, IRoleDto, SysRoleProxyService} from '../roles/sys-role-proxy.service';
import {PermissionTreeComponent} from '../permission-tree/permission-tree.component';
import {forkJoin} from 'rxjs';
import {NzDrawerRef} from '@node_modules/ng-zorro-antd/drawer';
import {finalize} from '@node_modules/rxjs/operators';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RolePermissionComponent implements OnInit {
  @ViewChildren(PermissionTreeComponent) permissionTrees: QueryList<PermissionTreeComponent>;
  role: IRoleDto;
  groups: IGroupPermissionListDto[];
  groupSelected: IGroupPermissionListDto;
  grantedPermissions = [];
  btnBusy = false;
  countGrantedInGroup = [];

  constructor(private roleProxy: SysRoleProxyService,
              private inject: Injector) {
  }

  ngOnInit(): void {
    this.getPermission();
  }

  getPermission() {
    forkJoin([this.roleProxy.getPermissions(),
      this.roleProxy.getGrantedPermissions(this.role.id)])
      .subscribe(([groups, granted]) => {
        this.groups = groups;
        this.groupSelected = groups[0];
        this.grantedPermissions = [];
        this.countGrantedInGroup = [];
        const parentNames = [];
        if (groups) {
          groups.forEach(g => {
            if (g.permissions) {
              g.permissions.forEach(p => {
                parentNames.push(p.parentName);
              })
            }
            this.countGrantedInGroup.push(g.permissions.filter(x => granted.indexOf(x.name) > -1)?.length || 0);
          });
        }
        if (granted?.length > 0) {
          granted.forEach(it => {
            if (parentNames.indexOf(it) === -1) {
              this.grantedPermissions.push(it);
            }
          });
        }
      });
  }

  save() {
    if (this.btnBusy) {
      return false;
    }
    this.btnBusy = true;
    let permissions = [];
    this.permissionTrees.forEach(tree => {
      permissions = [...permissions, ...tree.getGrantedPermissions()]
    });
    abp.ui.setBusy();
    this.roleProxy.setGrantPermission(this.role.id, permissions)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
        this.btnBusy = false;
      }))
      .subscribe(d => {
        abp.notify.success('Lưu thành công quyền cho vai trò: ' + this.role.name);
        this.close();
      })
  }

  close() {
    this.inject.get(NzDrawerRef).close();
  }
}
