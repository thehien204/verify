import {Component} from '@angular/core';
import {FbUserInnerService} from '@app-ordco/ord-layout/ord-user-inner/fb-user-inner.service';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {UserChangePasswordDto, UserProfileServiceProxy} from '@service-proxies/verify-service-proxies';
import {finalize} from '@node_modules/rxjs/operators';

@Component({
  selector: 'app-change-pwd-modal',
  template: `
    <nz-modal *ngIf="isVisible" [(nzVisible)]="isVisible" nzTitle="Đổi mật khẩu" (nzOnCancel)="close()">
      <div *nzModalContent>
        <of [schemaModel]="schema"></of>
      </div>
      <div *nzModalFooter>
        <button type='button' nz-button nzType='default' (click)='close()' [nzLoading]='btnBusy'>
          <i nz-icon nzType='close' nzTheme='outline'></i>Đóng
        </button>
        <button type='submit' nz-button nzType='primary' (click)='save()' [nzLoading]='btnBusy'>
          <i nz-icon nzType='save' nzTheme='outline'></i>Đổi mật khẩu
        </button>
      </div>
    </nz-modal>
  `,
  styles: []
})
export class ModalChangePwdComponent {
  isVisible = false;
  btnBusy = false;
  schema: OfSchemaModel;

  constructor(private userInnerFb: FbUserInnerService,
              private userProfileProxy: UserProfileServiceProxy) {
  }

  open() {
    this.schema = this.userInnerFb.builderChangePwd();
    this.isVisible = true;

  }

  close(): void {
    this.isVisible = false;
  }

  save() {
    if (this.btnBusy) {
      return;
    }
    this.btnBusy = true;
    const valueOfForm = this.schema.onSubmit();
    if (valueOfForm === null) {
      abp.notify.error('invalid');
      this.btnBusy = false;
      return;
    }
    if (valueOfForm.currentPassword === valueOfForm.newPassword) {
      abp.notify.error('Mật khẩu mới không được trùng với mật khẩu hiện tại!');
      this.btnBusy = false;
      return;
    }
    abp.ui.setBusy();
    this.userProfileProxy.changePassword(new UserChangePasswordDto({
      matKhauCu: valueOfForm.currentPassword,
      matKhauMoi: valueOfForm.newPassword
    })).pipe(finalize(() => {
      this.btnBusy = false;
      abp.ui.clearBusy();
    }))
      .subscribe(d => {
        if (d.isSuccessful) {
          abp.notify.success('Thay đổi mật khẩu thành công!');
          this.close();
        } else {
          abp.notify.error(d.errorMessage);
        }

      })

  }
}
