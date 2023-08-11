import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {ScheduleDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbScheduleService {

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
    return new OfSchemaModel<ScheduleDto>({
      fieldObject: {
        name: {
          ...this.fw.base.text({
            label: 'Tên khung giờ',
            required: true,
            maxLength: 100,
            grid: this.fw.getGridByWidth(24)
          })
        },
        khungGioStart: {
          ...this.fw.selectControl.hourSelect({
            label: 'Giờ bắt đầu',
            required: true,
            grid: this.fw.getGridByWidth(12)
          })
        },
        khungGioEnd: {
          ...this.fw.selectControl.hourSelect({
            label: 'Giờ kết thúc',
            required: true,
            grid: this.fw.getGridByWidth(12)
          })
        }
      }
    });
  }
}
