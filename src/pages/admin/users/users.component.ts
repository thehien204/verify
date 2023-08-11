import {Component, Injector, OnInit} from '@angular/core';
import {FbUserService} from './fb-user.service';
import {SysUserProxyService} from './sys-user-proxy.service';
import {AppOrdCoComponentBase} from '@app-ordco/utils/app-ordco-component-base';
import {finalize} from '@node_modules/rxjs/operators';
import {forkJoin} from 'rxjs';
import {NzDrawerService} from '@node_modules/ng-zorro-antd/drawer';
import {GrantRoleUserComponent} from '../grant-role-user/grant-role-user.component';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {SysUserDto} from "@service-proxies/verify-service-proxies";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {GanDoanhNghiepPhuTrachComponent} from "./gan-doanh-nghiep-phu-trach/gan-doanh-nghiep-phu-trach.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent extends AppOrdCoComponentBase implements OnInit {
  searchSchema = this.fb.builderSearch();
  getList = (searchInput) => {
    return this.sysUserProxyService.getList(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  }

  constructor(private injector: Injector,
              public sysUserProxyService: SysUserProxyService,
              private fb: FbUserService,
              private modalService: NzModalService) {
    super(injector);
  }

  ngOnInit(): void {
  }

  openCreate() {
    this.crudService.openCreateOrUpdate({
      entityName: 'Tài khoản người dùng',
      id: null,
      editDto: null,
      nzModalOptions: {
        nzWidth: '500px'
      },
      callBackSavedSuccess: value => {
        this.searchSchema.reloadDataTable();
      },
      type: 'modal',
      entitySchema: this.fb.builderCreateEntity(),
      proxyServices: this.sysUserProxyService
    });
  }

  openEdit(user) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Tài khoản người dùng',
      id: user.id,
      editDto: user,
      nzModalOptions: {
        nzWidth: '500px'
      },
      callBackSavedSuccess: value => {
        this.searchSchema.reloadDataTable();
      },
      type: 'modal',
      entitySchema: this.fb.builderEditEntity(),
      proxyServices: this.sysUserProxyService
    });
  }

  openChangePassword(user) {
    this.crudService.openEditModal({
      schemaModel: this.fb.builderChangePassword(),
      nzModalOptions: {
        nzTitle: 'Đổi mật khẩu'
      },
      afterViewInitFunc: entitySchema => {
        entitySchema.patchValue(user);
      },
      saveProxy: dto => {
        return this.sysUserProxyService.changePassword(user.id, dto.password);
      },
      messageSuccess: 'Đổi mật khẩu thành công cho tài khoản: ' + user.userName
    });

  }

  delete(user: any) {
    this.crudService.removeById({
      name: `Người dùng "${user.name}"`,
      proxyServices: this.sysUserProxyService,
      id: user.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  onGrantRole(user: any) {
    abp.ui.setBusy();
    forkJoin([
      this.sysUserProxyService.getRoleCanGrant(user.id),
      this.sysUserProxyService.getGrantedRoleId(user.id)
    ])
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(([roles, grantedId]) => {
        let roleGranted = [];
        if (roles?.length > 0 && grantedId?.length > 0) {
          roleGranted = roles.filter((it: NzSafeAny) => {
            return grantedId.indexOf(it.id) > -1;
          });
        }

        const drawerRef = this.injector.get(NzDrawerService).create({
          nzTitle: 'Gán vai trò cho người dùng',
          nzWidth: '100vw',
          nzWrapClassName: 'grant-role-users',
          nzContent: GrantRoleUserComponent,
          nzContentParams: {
            userInformation: user,
            roleGranted: roleGranted,
            roles
          }
        });

      });

  }

  onFilterColumn($event: any) {
    this.searchSchema.patchValue($event);
    this.loading = true;
    setTimeout(() => {
      this.searchSchema.search();
    });
  }

  onLockUser(user: SysUserDto, lock: boolean) {

    this.sysUserProxyService.lock(user.id, lock).subscribe(d => {
      abp.notify.success(lock ? 'Khóa tài khoản thành công' : 'Mở khóa thành công');
      this.searchSchema.reloadDataTable();
    });
  }

  openGanDoanhNghiepModal(user: SysUserDto) {
    this.modalService.create({
      nzTitle: 'Gán doanh nghiệp phụ trách',
      nzContent: GanDoanhNghiepPhuTrachComponent,
      nzWidth: '900px',
      nzComponentParams: {
        user
      }
    });
  }
}
