import {Component, Injector, OnInit} from '@angular/core';
import {FbRoleService} from './fb-role.service';
import {AppOrdCoComponentBase} from '@app-ordco/utils/app-ordco-component-base';
import {IRoleDto, SysRoleProxyService} from './sys-role-proxy.service';
import {NzDrawerService} from '@node_modules/ng-zorro-antd/drawer';
import {RolePermissionComponent} from '../role-permission/role-permission.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: []
})
export class RolesComponent extends AppOrdCoComponentBase implements OnInit {
  searchSchema = this.fb.builderSearch();
  pageConfig = this.builderPagination(searchDto => this.sysRoleProxyService.getList(searchDto));
  getList = (searchInput) => {
    return this.sysRoleProxyService.getList(searchInput);
  }

  constructor(private injector: Injector,
              private fb: FbRoleService,
              private sysRoleProxyService: SysRoleProxyService) {
    super(injector);
  }

  ngOnInit(): void {
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'vai trò',
      id: record?.id,
      editDto: record,
      nzModalOptions: {
        nzWidth: '500px'
      },
      callBackSavedSuccess: value => {
        this.searchSchema.reloadDataTable();
      },
      type: 'modal',
      entitySchema: this.fb.builderEntity(),
      proxyServices: this.sysRoleProxyService,
      afterViewInitFunc: (entitySchema, id, editDto) => {
        if (record?.id) {
          entitySchema.form.get('name').disable();
        }
      }
    });
  }

  delete(record: any): void {
    this.crudService.removeById({
      name: `Vai trò "${record.name}"`,
      proxyServices: this.sysRoleProxyService,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  grantPermission(role: IRoleDto) {
    const drawerService = this.injector.get(NzDrawerService);
    drawerService.create({
      nzTitle: 'PHÂN QUYỀN CHO VAI TRÒ: ' + role.name,
      nzContent: RolePermissionComponent,
      nzWrapClassName: 'grant-permission-role',
      nzPlacement: 'bottom',
      nzHeight: '100vh',
      nzContentParams: {
        role
      }
    });
  }
}
