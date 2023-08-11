import {Directive} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ISelectOption, ISelectOptions, SelectOptions} from "@app-ordco/ora-select/model";
import {ComboBoxDataServiceProxy} from "@service-proxies/verify-service-proxies";

@Directive({
  selector: '[dirThietBiNhanTB]',
  providers: [
    {
      provide: SelectOptions,
      useExisting: ThietBiNhanThongBaoDirective
    }
  ]
})
export class ThietBiNhanThongBaoDirective implements ISelectOptions {
  options$ = of<ISelectOption[]>([]);

  constructor(
    private _dataService: ComboBoxDataServiceProxy,
  ) {
    this.options$ = this.getDataSourceFromServer();
  }

  getDataSourceFromServer(): Observable<ISelectOption[]> {
    return this._dataService.thietBiNhanThongBao()
      .pipe(
        map(lst => lst.map(item => {
            const res: ISelectOption = {
              value: parseInt(item.value),
              displayText: item.displayText
            };
            return res;
          })
        ));
  }

}
