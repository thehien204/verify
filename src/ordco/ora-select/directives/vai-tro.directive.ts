import {Directive, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ISelectOption, ISelectOptions, SelectOptions} from "@app-ordco/ora-select/model";
import {ComboBoxDataServiceProxy} from "@service-proxies/verify-service-proxies";
import {BooleanInput, coerceBooleanProperty,} from '@angular/cdk/coercion';

@Directive({
  selector: '[dirVaiTro]',
  providers: [
    {
      provide: SelectOptions,
      useExisting: VaiTroDirective
    }
  ]
})
export class VaiTroDirective implements ISelectOptions {

  @Input()
  get addItemOther() {
    return this._addItemOther;
  }

  set addItemOther(value: BooleanInput) {
    this._addItemOther = coerceBooleanProperty(value);
  }

  private _addItemOther = false;
  options$ = of<ISelectOption[]>([]);

  constructor(
    private _dataService: ComboBoxDataServiceProxy,
  ) {
    this.options$ = this.getDataSourceFromServer();
  }

  getDataSourceFromServer(): Observable<ISelectOption[]> {
    return this._dataService.danhSachVaiTro()
      .pipe(
        map(lst => {
            const temp = lst.map(item => {
              const res: ISelectOption = {
                value: item.value,
                displayText: item.displayText
              };
              return res;
            })
          if (this.addItemOther) {
            temp.push({
              value: '-1',
              displayText: 'Khác'
            })
          }
          return temp;
        }
        ));
  }

}
