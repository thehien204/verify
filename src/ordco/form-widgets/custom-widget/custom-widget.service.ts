import {Injectable} from '@angular/core';
import {OCoreUtilityService, OfFormWidgetsService, OfGridSchema} from '@node_modules/@orendaco/of';
import {OfControlModelConfig} from '@node_modules/@orendaco/of/lib/models';
import {DateRangeComponent} from './date-range/date-range.component';
import {
  DateRangeWithCustomSelectComponent
} from './date-range-with-custom-select/date-range-with-custom-select.component';
import {OfValidateService} from '../of-validate.service';
import {
  DemoCustomControlComponent
} from '@app-ordco/form-widgets/custom-widget/demo-custom-control/demo-custom-control.component';
import {
  DanhSachHinhAnhSanPhamComponent
} from "@app-ordco/form-widgets/custom-widget/danh-sach-hinh-anh-san-pham/danh-sach-hinh-anh-san-pham.component";
import {HinhAnhBannerComponent} from "@app-ordco/form-widgets/custom-widget/hinh-anh-banner/hinh-anh-banner.component";
import {
  UploadGiayChungNhanComponent
} from "@app-ordco/form-widgets/custom-widget/upload-giay-chung-nhan/upload-giay-chung-nhan.component";

@Injectable({
  providedIn: 'root'
})
export class CustomWidgetService {

  constructor(private base: OfFormWidgetsService,
              private _validateService: OfValidateService) {
  }

  dateRange(config: OfControlModelConfig, notGreaterThanCurrent = true) {
    return this.base.componentRef({
      componentRef: DateRangeComponent,
      css: 'of-date-range',
      ...config,
      extendOptions: {
        notGreaterThanCurrent
      }
    });
  }

  /**
   * date range có button lựa chọn nhanh khoảng thời gian: hôm nay, hôm qua, 7 ngày qua, tháng này...
   */
  dateRangeWithCustomSelect(config: OfControlModelConfig, notGreaterThanCurrent: boolean = true) {
    return this.base.componentRef({
      componentRef: DateRangeWithCustomSelectComponent,
      ...config,
      extendOptions: {
        notGreaterThanCurrent
      }
    });
  }

  demoCustom(config: OfControlModelConfig) {
    return this.base.componentRef({
      componentRef: DemoCustomControlComponent,
      layoutFormItem: '1',
      ...config
    })
  }

  danhSachHinhAnhSanPham(config: OfControlModelConfig) {
    return this.base.componentRef({
      componentRef: DanhSachHinhAnhSanPhamComponent,
      layoutFormItem: '1',
      dataField: 'images',
      ...config
    })
  }

  uploadGiayChungNhan(config: OfControlModelConfig) {
    return this.base.componentRef({
      componentRef: UploadGiayChungNhanComponent,
      layoutFormItem: '1',
      dataField: 'images',
      ...config
    })
  }

  hinhAnhBanner(config: OfControlModelConfig) {
    return this.base.componentRef({
      componentRef: HinhAnhBannerComponent,
      layoutFormItem: '1',
      ...config
    })
  }

  public getGridByWidth(width: number): OfGridSchema {
    return OCoreUtilityService.getGridByWidth(width);
  }
}
