import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {LoaiDichVuDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbLoaiDichVuService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập tên để tìm kiếm',
          allowEnterKeySearch: true
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<LoaiDichVuDto>({
      fieldObject: {
        ten: {
          ...this.fw.base.text({
            label: 'Tên',
            required: true,
            maxLength: 200,
            grid: this.fw.getGridByWidth(24)
          })
        },
        // loaiDonViTinh: {
        //   ...this.fw.selectControl.loaiDonViTinhDichVu(),
        //   required: true,
        //   grid: this.fw.getGridByWidth(24)
        // },
      }
    });
  }
}
