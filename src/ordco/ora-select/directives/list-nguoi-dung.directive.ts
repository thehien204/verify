import {Directive} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ISelectOption, ISelectOptions, SelectOptions} from "@app-ordco/ora-select/model";
import {ComboBoxDataServiceProxy, LOAI_TAI_KHOAN, SysUserDto} from "@service-proxies/verify-service-proxies";

@Directive({
  selector: '[dirNguoiDung]',
  providers: [
    {
      provide: SelectOptions,
      useExisting: ListNguoiDungDirective
    }
  ]
})
export class ListNguoiDungDirective implements ISelectOptions {
  options$ = of<ISelectOption[]>([]);

  constructor(
    private _dataService: ComboBoxDataServiceProxy,
  ) {
    this.options$ = this.getDataSourceFromServer();
  }

  getDataSourceFromServer(): Observable<ISelectOption[]> {
    return this._dataService.listNguoiDung()
      .pipe(
        map(lst => lst.map(item => {
            const data: SysUserDto = item.data;
            const res: ISelectOption = {
              value: item.value,
              displayText: `${item.displayText} ${this.txtLoaiTk(data.loaiTaiKhoan)}`
            };
            return res;
          })
        ));
  }

  private txtLoaiTk(loaiTk: LOAI_TAI_KHOAN) {
    switch (loaiTk) {
      case LOAI_TAI_KHOAN.SuperAdmin:
        return "(Quản trị hệ thống)";

      case LOAI_TAI_KHOAN.SaleAdmin:
        return "(Sale admin)";
      case LOAI_TAI_KHOAN.DoanhNghiep:
        return "(Doanh nghiệp)";
      case LOAI_TAI_KHOAN.CaNhan:
        return "(Cá nhân)";
    }
    return ""
  }

//   public enum LOAI_TAI_KHOAN
// {
//   [EnumDisplayString("Quản trị hệ thống")]
//   SuperAdmin = 1,
//   [EnumDisplayString("Sale admin")]
//   SaleAdmin = 2,
//   [EnumDisplayString("Doanh nghiệp")]
//   DoanhNghiep = 3,
//   [EnumDisplayString("Cá nhân")]
//   CaNhan = 4,
// }

}
