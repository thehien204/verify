import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';

@Injectable({
  providedIn: 'root'
})
export class FbTinhService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập tên/ mã tỉnh để tìm kiếm',
          allowEnterKeySearch: true
        }),
        isActive: {
          ...this.fw.selectControl.suDung(),
          grid: this.fw.getGridByWidth(24),
        }
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel({
      fieldObject: {
        // maTinh: {
        //   ...this.fw.base.numberInput({
        //     label: 'Mã',
        //     required: true,
        //     maxlength: 3,
        //     onlyKeyNumber: true,
        //     grid: this.fw.getGridByWidth(24)
        //   })
        // },
        tenTinh: {
          ...this.fw.base.text({
            label: 'Tên tỉnh/ thành phố',
            required: true,
            maxLength: 100,
            grid: this.fw.getGridByWidth(24)
          })
        },
        isActive: {
          ...this.fw.base.checkBox({
            checkBoxLabel: 'Sử dụng',
            css: 'of-is-active-checkbox',
            value: true
          })
        }

      }
    });
  }
}
