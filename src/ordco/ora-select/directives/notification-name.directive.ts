
import {Directive} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ISelectOption, ISelectOptions, SelectOptions} from "@app-ordco/ora-select/model";
import {ComboBoxDataServiceProxy} from "@service-proxies/verify-service-proxies";

@Directive({
  selector: '[dirNotificationName]',
  providers: [
    {
      provide: SelectOptions,
      useExisting: NotificationNameDirective
    }
  ]
})
export class NotificationNameDirective implements ISelectOptions {
  options$ = of<ISelectOption[]>([]);
  constructor(
    private _dataService: ComboBoxDataServiceProxy,
  ) {
    this.options$ = this.getDataSourceFromServer();
  }
  getDataSourceFromServer(): Observable<ISelectOption[]> {
    return this._dataService.listNotificationName()
      .pipe(
        map(lst => lst.map(item => {
            const res: ISelectOption = {
              value: item.value,
              displayText: item.displayText
            };
            return res;
          })
        ));
  }

}

