import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {QuocGiaDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbQuocGiaService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập mã/ tên quốc gia để tìm kiếm',
          allowEnterKeySearch: true
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<QuocGiaDto>({
      fieldObject: {
        ma: {
          ...this.fw.base.numberInput({
            label: 'Mã',
            required: true,
            maxlength: 3,
            onlyKeyNumber: true,
            grid: this.fw.getGridByWidth(24)
          })
        },
        tenEn: {
          ...this.fw.base.text({
            label: 'Tên quốc tế',
            required: true,
            maxLength: 200,
            grid: this.fw.getGridByWidth(24)
          })
        },
        ten: {
          ...this.fw.base.text({
            label: 'Tên thường gọi',
            maxLength: 200,
            grid: this.fw.getGridByWidth(24)
          })
        }
      }
    });
  }
}
