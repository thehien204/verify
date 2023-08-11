import {Directive} from '@angular/core';
import {Observable, of} from "@node_modules/rxjs";
import {ISelectOption} from "@app-ordco/ora-select/model";
import {
  ComboBoxDataServiceProxy,
  DoanhNghiepSearchInputDto,
  DoanhNghiepServiceProxy
} from "@service-proxies/verify-service-proxies";
import {map} from "@node_modules/rxjs/operators";

@Directive({
  selector: '[dirDoanhNghiep]'
})
export class DirDoanhNghiepDirective {
  options$ = of<ISelectOption[]>([]);

  constructor(
    private _dataService: DoanhNghiepServiceProxy,
  ) {
    this.options$ = this.getDataSourceFromServer();
  }

  // getDataSourceFromServer(): Observable<ISelectOption[]> {
  //
  //   return this._dataService.searchList(body)
  //     .pipe(
  //       map(lst => lst.items.map(item => {
  //           const res: ISelectOption = {
  //             value: item.id,
  //             displayText: item.ten
  //           };
  //           return res;
  //         })
  //       ));
  // }
  // constructor(
  //   private _dataService: ComboBoxDataServiceProxy,
  // ) {
  //   this.options$ = this.getDataSourceFromServer();
  // }

  getDataSourceFromServer(): Observable<ISelectOption[]> {
    const body = new DoanhNghiepSearchInputDto();
    body.maxResultCount = 9999;
    body.skipCount = 0;
    return this._dataService.searchList(body)
      .pipe(
        map(lst => {
            const temp = lst.items.map(item => {
              const res: ISelectOption = {
                value: item.id,
                displayText: item.ten
              };
              return res;
            })
            return temp;
          }
        ));
  }

}
