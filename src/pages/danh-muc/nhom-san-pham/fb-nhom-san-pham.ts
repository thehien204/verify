import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {NhomSanPhamDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbNhomSanPhamService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập tên/ mã để tìm kiếm',
          allowEnterKeySearch: true
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<NhomSanPhamDto>({
      fieldObject: {
        ma: {
          ...this.fw.base.text({
            label: 'Mã',
            required: true,
            maxLength: 50,
            grid: this.fw.getGridByWidth(24)
          })
        },
        tenNhom: {
          ...this.fw.base.text({
            label: 'Tên nhóm',
            required: true,
            maxLength: 200,
            grid: this.fw.getGridByWidth(24)
          })
        }
      }
    });
  }
}
