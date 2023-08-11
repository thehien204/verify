import { Injectable } from "@angular/core";
import { FormWidgetFacadeService } from "@app-ordco/form-widgets/form-widget-facade.service";
import { OfSchemaModel } from "@orendaco/of";


@Injectable({
  providedIn: 'root'
})
export class BaoCaoHopDongService {
  constructor(private fw: FormWidgetFacadeService) {

  }
  buiderSearch() {
    return new OfSchemaModel<any>({
      fieldObject: {
        executionTimeRange: this.fw.custom.dateRangeWithCustomSelect({
          label: 'Ngày thực hiện',
          grid: this.fw.getGridByWidth(10),
        }),
      },
      afterViewInitFunc: (schemaModel, component) => {
        setTimeout(() => {
          schemaModel.form.patchValue({
            executionTimeRange: {
              tuNgay: new Date(),
              denNgay: new Date(),
            }
          });
          schemaModel.search();
        });

      }
    })
  }

}
