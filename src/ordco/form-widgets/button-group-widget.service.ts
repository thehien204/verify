import {Injectable, Injector} from '@angular/core';
import {OCoreUtilityService, OfFormWidgetsService} from '@orendaco/of';
import {IBtnGroupWidgetOption} from '@node_modules/@orendaco/of/lib/components/of-btn-group/of-btn-group.component';


@Injectable({
  providedIn: 'root'
})
export class ButtonGroupWidgetService {

  constructor(private baseWidget: OfFormWidgetsService,
              private inject: Injector) {
  }

  private btnSearch: IBtnGroupWidgetOption = {
    name: 'search',
    onClick: (loading$, schema) => {
      schema.search(loading$);
    }
  }

  searchList(width = 3) {
    return {
      ...this.baseWidget.buttonGroup([this.btnSearch]),
      grid: OCoreUtilityService.getGridByWidth(width),
    };
  }
}
