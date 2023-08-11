import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';

@Injectable({
  providedIn: 'root'
})
export class FbHuyenService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập tên/ mã huyện để tìm kiếm',
          allowEnterKeySearch: true
        }),
        maTinh: {
          ...this.fw.selectControl.tinh(),
          grid: this.fw.getGridByWidth(24),
        },
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
        // maHuyen: {
        //   ...this.fw.base.numberInput({
        //     label: 'Mã huyện',
        //     required: true,
        //     maxlength: 10,
        //     onlyKeyNumber: true,
        //     grid: this.fw.getGridByWidth(24)
        //   })
        // },
        tenHuyen: {
          ...this.fw.base.text({
            label: 'Tên huyện',
            required: true,
            maxLength: 100,
            grid: this.fw.getGridByWidth(24)
          })
        },
        maTinh: {
          ...this.fw.selectControl.tinh(),
          grid: this.fw.getGridByWidth(24),
          required: true,
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
