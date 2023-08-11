import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';

@Injectable({
  providedIn: 'root'
})
export class FbRoleService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập tên/ mã vai trò để tìm kiếm',
          allowEnterKeySearch: true
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel({
      fieldObject: {
        name: {
          ...this.fw.base.text({
            label: 'Tên vai trò',
            required: true,
            maxLength: 64,
            grid: this.fw.getGridByWidth(24)
          })
        },
        description: {
          ...this.fw.base.textArea({
            label: 'Mô tả vai trò',
            maxLength: 500,
            rows: 3,
            grid: this.fw.getGridByWidth(24)
          })
        },
        isDefault: {
          ...this.fw.base.checkBox({
            checkBoxLabel: 'Mặc định',
            css: 'of-is-active-checkbox',
            grid: this.fw.getGridByWidth(24)
          })
        },
        isPublic: {
          ...this.fw.base.checkBox({
            checkBoxLabel: 'Công khai',
            css: 'of-is-active-checkbox',
            grid: this.fw.getGridByWidth(24)
          })
        },
        isStatic: {
          ...this.fw.base.checkBox({
            checkBoxLabel: 'Tĩnh (Không thể xóa)',
            css: 'of-is-active-checkbox',
            grid: this.fw.getGridByWidth(24)
          })
        }
      },
      afterViewInitFunc: (schemaModel, component) => {
        this.fw.formatData.regexAndUpperCase(/[^a-zA-Z0-9_-]/g, schemaModel.form.get('name'), component.destroyRxjsService);
      }
    });
  }
}
