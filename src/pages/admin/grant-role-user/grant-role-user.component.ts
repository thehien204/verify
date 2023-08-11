import {AfterViewInit, Component, Injector, ViewEncapsulation} from '@angular/core';
import {FbUserService} from '../users/fb-user.service';
import {IRoleDto} from '../roles/sys-role-proxy.service';
import {NzDrawerRef} from '@node_modules/ng-zorro-antd/drawer';
import {SysUserProxyService} from '../users/sys-user-proxy.service';
import {finalize} from '@node_modules/rxjs/operators';

@Component({
  selector: 'app-grant-role-user',
  templateUrl: './grant-role-user.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./index.scss']
})
export class GrantRoleUserComponent implements AfterViewInit {
  userInformation = null;
  roles: Partial<IRoleDto>[] = [];
  informationForm = this.fbUser.builderInfomation();
  btnBusy = false;
  roleGranted: IRoleDto[] = [];

  constructor(private fbUser: FbUserService,
              private inject: Injector,
              private userProxy: SysUserProxyService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.informationForm.form.patchValue(this.userInformation);
      this.informationForm.form.disable();
    });
  }

  save() {
    if (this.btnBusy) {
      return;
    }
    this.btnBusy = true;
    const granted = this.roleGranted?.map(x => x.id) || [];
    abp.ui.setBusy();
    this.userProxy.grantRoleUser(this.userInformation.id, granted)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
        this.btnBusy = false;
      }))
      .subscribe(d => {
        abp.notify.success('Gán vai trò thành công cho người dùng: ' + this.userInformation.name);
        this.inject.get(NzDrawerRef).close(granted);
      })
  }

  close() {
    this.inject.get(NzDrawerRef).close();
  }
}
