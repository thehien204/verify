import {Injectable} from '@angular/core';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {OfSchemaModel} from '@orendaco/of';
import {combineLatest} from '@node_modules/rxjs';
import {tap} from 'rxjs/operators';
import {OCoreUtilityService} from '@node_modules/@orendaco/of';
import {UserUpdateProfileDto} from '@service-proxies/verify-service-proxies';

@Injectable({
  providedIn: 'root'
})
export class FbUserInnerService {

  constructor(private formWidget: FormWidgetFacadeService) {
  }

  builderChangePwd(): OfSchemaModel {
    return new OfSchemaModel({
      fieldObject: {
        currentPassword: this.formWidget.base.passWordInput({
          label: 'Mật khẩu hiện tại',
          grid: this.formWidget.getGridByWidth(24),
          required: true
        }),
        newPassword: this.formWidget.base.passWordInput({
          label: 'Mật khẩu mới',
          grid: this.formWidget.getGridByWidth(24),
          required: true,
          validations: [
            {
              name: 'password'
            }
          ]
        }),
        rePassword: this.formWidget.base.passWordInput({
          label: 'Nhập lại mật khẩu mới',
          grid: this.formWidget.getGridByWidth(24),
          required: true
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        const newPasswordCtrl = schemaModel.form.getControl('newPassword');
        const rePasswordCtrl = schemaModel.form.getControl('rePassword');
        combineLatest([newPasswordCtrl.valueChanges, rePasswordCtrl.valueChanges])
          .pipe(tap(([password, rePassword]) => {
            if (!OCoreUtilityService.isNullOrEmpty(rePassword)) {
              if (password !== rePassword) {
                rePasswordCtrl.setErrors({'Nhập lại mật khẩu mới chưa chính xác': true});
              } else {
                rePasswordCtrl.setErrors(null);
              }
            }
          })).subscribe();
      }
    });
  }

  builderUserProfile(): OfSchemaModel<UserUpdateProfileDto> {
    return new OfSchemaModel<UserUpdateProfileDto>({
      fieldObject: {
        userName: {
          ...this.formWidget.base.text({
            label: 'Tên đăng nhập',
            disabled: true,
            maxLength: 100,
            grid: this.formWidget.getGridByWidth(24)
          })
        },
        hoTen: {
          ...this.formWidget.base.text({
            label: 'Họ tên người dùng',
            maxLength: 64,
            grid: this.formWidget.getGridByWidth(24)
          })
        },
        maTinh: {
          ...this.formWidget.selectControl.tinh(),
          grid: this.formWidget.getGridByWidth(24)
        },
        maHuyen: {
          ...this.formWidget.selectControl.huyen('maTinh'),
          grid: this.formWidget.getGridByWidth(24)
        },
        maXa: {
          ...this.formWidget.selectControl.xa('maHuyen'),
          grid: this.formWidget.getGridByWidth(24)
        }
      },
      afterViewInitFunc: (schemaModel,
                          component) => {
        this.formWidget.formatData.hoTen(schemaModel.form.get('hoTen'), component.destroyRxjsService);
      }
    });
  }

}
