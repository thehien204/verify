import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {
  BangGiaDichVuDto,
  BangGiaDichVuSearchListInputDto,
  LOAI_THONG_BAO
} from "@service-proxies/verify-service-proxies";
import {Validators} from "@node_modules/@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class NotificationsFromUserservice {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<BangGiaDichVuSearchListInputDto>({
      fieldObject: {
        from: {
          ...this.fw.base.datePicker({
            label: "Hiện thị từ ngày",
            denNgayDataField: 'to',
            grid: this.fw.getGridByWidth(12),
            required: false
          })
        },
        to: {
          ...this.fw.base.datePicker({
            label: "đến ngày",
            tuNgayDataField: 'from',
            grid: this.fw.getGridByWidth(12)
          })
        },
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

}
