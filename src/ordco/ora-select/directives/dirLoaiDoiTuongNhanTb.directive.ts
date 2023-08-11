import {Directive} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ISelectOption, ISelectOptions, SelectOptions} from "@app-ordco/ora-select/model";
import {ComboBoxDataServiceProxy, LOAI_TAI_KHOAN, SysUserDto} from "@service-proxies/verify-service-proxies";

@Directive({
  selector: '[dirLoaiDoiTuongNhanTb]',
  providers: [
    {
      provide: SelectOptions,
      useExisting: DirLoaiDoiTuongNhanTbDirective
    }
  ]
})
export class DirLoaiDoiTuongNhanTbDirective implements ISelectOptions {
  options$ = of<ISelectOption[]>([]);

  constructor(
    private _dataService: ComboBoxDataServiceProxy,
  ) {
    this.options$ = this.getDataSourceFromServer();
  }

  getDataSourceFromServer(): Observable<ISelectOption[]> {
    return this._dataService.loaiDoiTuongNhanTb()
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
