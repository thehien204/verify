import {Component} from '@angular/core';
import {FbUserInnerService} from '@app-ordco/ord-layout/ord-user-inner/fb-user-inner.service';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {UserProfileServiceProxy, UserUpdateProfileDto} from '@service-proxies/verify-service-proxies';
import {finalize} from '@node_modules/rxjs/operators';

@Component({
  selector: 'app-user-profile-modal',
  template: `
    <nz-modal [(nzVisible)]="isVisible"
              nzTitle="Thông tin tài khoản"
              (nzOnCancel)="close()">
      <div *nzModalContent>
        <of [schemaModel]="schema"></of>
      </div>
      <div *nzModalFooter>
        <button type='button' nz-button nzType='default' (click)='close()' [nzLoading]='btnBusy'>
          <i nz-icon nzType='close' nzTheme='outline'></i>Đóng
        </button>
        <button type='submit' nz-button nzType='primary' (click)='save()' [nzLoading]='btnBusy'>
          <i nz-icon nzType='save' nzTheme='outline'></i>Sửa thông tin
        </button>
      </div>
    </nz-modal>

  `,
  styles: []
})
export class ModalUserProfileComponent {
  isVisible = false;
  btnBusy = false;
  schema: OfSchemaModel<UserUpdateProfileDto> = this.userInnerFb.builderUserProfile();

  constructor(private userInnerFb: FbUserInnerService,
              private userProfileProxy: UserProfileServiceProxy) {
  }

  open() {
    abp.ui.setBusy();
    this.isVisible = true;
    this.userProfileProxy.getProfile()
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(d => {
        this.schema.patchValue(d);
      });
  }

  close(): void {
    this.isVisible = false;
  }

  save() {
    if (this.btnBusy) {
      return;
    }
    this.btnBusy = true;
    const valueOfForm: UserUpdateProfileDto = this.schema.onSubmit();
    if (valueOfForm === null) {
      abp.notify.error('invalid');
      this.btnBusy = false;
      return;
    }
    abp.ui.setBusy();
    const body = new UserUpdateProfileDto();
    body.init(valueOfForm);
    this.userProfileProxy.updateProfile(body)
      .pipe(finalize(() => {
        this.btnBusy = false;
        abp.ui.clearBusy();
      }))
      .subscribe(d => {
        abp.notify.success('Cập nhật thông tin tài khoản thành công!');
        this.close();
      })

  }
}
