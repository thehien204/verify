import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {FieldObjectConfig} from '@node_modules/@orendaco/of/lib/models/of-schema.model';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {UserSessionStateService} from '@app-ordco/services/user-session-state.service';

@Injectable({
  providedIn: 'root'
})
export class FbUserService {

  constructor(private fw: FormWidgetFacadeService,
              private userSession: UserSessionStateService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(10),
          placeholder: 'Nhập tên/ username để tìm kiếm',
          allowEnterKeySearch: true
        }),
        ngayTaoRange: {
          ...this.fw.custom.dateRangeWithCustomSelect({
            label: 'Ngày tạo'
          }, true),
          grid: this.fw.getGridByWidth(10)
        },
        isActive: {
          ...this.fw.selectControl.suDung(),
          label: 'Hiệu lực',
          grid: this.fw.getGridByWidth(3),
        },
        loaiTaiKhoan: this.fw.selectControl.loaiTaiKhoan({
          grid: this.fw.getGridByWidth(5)
        }),
        maTinh: {
          ...this.fw.selectControl.tinh(),
          grid: this.fw.getGridByWidth(5)
        },
        maHuyen: {
          ...this.fw.selectControl.huyen('maTinh'),
          grid: this.fw.getGridByWidth(5)
        },
        maXa: {
          ...this.fw.selectControl.xa('maHuyen'),
          grid: this.fw.getGridByWidth(5)
        },
      },
      afterViewInitFunc: (schemaModel, component) => {
       //  schemaModel.patchValue(this.userSession.user);
        schemaModel.search();
      }
    });
  }

  builderCreateEntity() {
    return new OfSchemaModel({
      fieldObject: {
        loaiTaiKhoan: this.fw.selectControl.loaiTaiKhoan({
          grid: this.fw.getGridByWidth(24),
          required: true,
        }),
        userName: {
          ...this.fw.base.text({
            label: 'Tên đăng nhập',
            required: true,
            maxLength: 100,
            grid: this.fw.getGridByWidth(24),
            validations: [
              {
                validator: this.fw.validate.userName
              }
            ]
          })
        },
        password: {
          ...this.fw.base.passWordInput({
            label: 'Mật khẩu',
            required: true,
            grid: this.fw.getGridByWidth(24),
            validations: [{
              validator: this.fw.validate.password
            }],
          })
        },
        ...this.builderBaseEntity()
      },
      afterViewInitFunc: (schemaModel, component) => {
        this.fw.formatData.hoTen(schemaModel.form.get('name'), component.destroyRxjsService);
        this.fw.formatData.khongCoKhoangTrang(schemaModel.form.get('userName'), component.destroyRxjsService);
        this.fw.formatData.khongCoKhoangTrang(schemaModel.form.get('password'), component.destroyRxjsService);
      }
    });
  }

  builderEditEntity() {
    return new OfSchemaModel({
      fieldObject: {
        userName: {
          ...this.fw.base.text({
            label: 'Tên đăng nhập',
            required: true,
            disabled: true,
            maxLength: 100,
            grid: this.fw.getGridByWidth(24)
          })
        },
        loaiTaiKhoan: this.fw.selectControl.loaiTaiKhoan({
          grid: this.fw.getGridByWidth(24),
          required: true,
        }),
        ...this.builderBaseEntity()
      },
      afterViewInitFunc: (schemaModel, component) => {
        this.fw.formatData.hoTen(schemaModel.form.get('name'), component.destroyRxjsService);
      }
    });
  }

  builderBaseEntity(): Partial<FieldObjectConfig<NzSafeAny>> {
    return {
      name: {
        ...this.fw.base.text({
          label: 'Họ tên người dùng',
          maxLength: 64,
          grid: this.fw.getGridByWidth(24)
        })
      },
      maTinh: {
        ...this.fw.selectControl.tinh(),
        grid: this.fw.getGridByWidth(24)
      },
      maHuyen: {
        ...this.fw.selectControl.huyen('maTinh'),
        grid: this.fw.getGridByWidth(24)
      },
      maXa: {
        ...this.fw.selectControl.xa('maHuyen'),
        grid: this.fw.getGridByWidth(24)
      },
      doanhNghiepId: this.fw.selectControl.doanhNghiepSelectCustom({
        label: 'Doanh nghiệp',
        placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
        grid: this.fw.getGridByWidth(24),
      }),

      // isActive: {
      //   ...this.fw.base.checkBox({
      //     checkBoxLabel: 'Hiệu lực',
      //     css: 'of-is-active-checkbox',
      //     value: true
      //   })
      // }
    }
  }

  builderInfomation() {
    return new OfSchemaModel({
      fieldObject: {
        name: {
          ...this.fw.base.text({
            label: 'Họ tên người dùng',
            maxLength: 64,
            grid: this.fw.getGridByWidth(24)
          })
        },
        userName: {
          ...this.fw.base.text({
            label: 'Tên đăng nhập',
            maxLength: 100,
            grid: this.fw.getGridByWidth(24),
            validations: [
              {
                validator: this.fw.validate.userName
              }
            ]
          })
        },
        maTinh: {
          ...this.fw.selectControl.tinh(),
          grid: this.fw.getGridByWidth(24)
        },
        maHuyen: {
          ...this.fw.selectControl.huyen('maTinh'),
          grid: this.fw.getGridByWidth(24)
        },
        maXa: {
          ...this.fw.selectControl.xa('maHuyen'),
          grid: this.fw.getGridByWidth(24)
        },
      }
    });
  }

  builderChangePassword() {
    return new OfSchemaModel({
      fieldObject: {
        name: {
          ...this.fw.base.text({
            label: 'Họ tên người dùng',
            disabled: true,
            maxLength: 64,
            grid: this.fw.getGridByWidth(24)
          })
        },
        userName: {
          ...this.fw.base.text({
            label: 'Tên đăng nhập',
            disabled: true,
            maxLength: 100,
            grid: this.fw.getGridByWidth(24),
            validations: [
              {
                validator: this.fw.validate.userName
              }
            ]
          })
        },
        password: {
          ...this.fw.base.passWordInput({
            label: 'Mật khẩu mới',
            required: true,
            grid: this.fw.getGridByWidth(24),
            validations: [{
              validator: this.fw.validate.password
            }],
          })
        }
      },
      afterViewInitFunc: (schemaModel, component) => {
        this.fw.formatData.hoTen(schemaModel.form.get('name'), component.destroyRxjsService);
        this.fw.formatData.khongCoKhoangTrang(schemaModel.form.get('userName'), component.destroyRxjsService);
        this.fw.formatData.khongCoKhoangTrang(schemaModel.form.get('password'), component.destroyRxjsService);
      }
    });
  }
}
