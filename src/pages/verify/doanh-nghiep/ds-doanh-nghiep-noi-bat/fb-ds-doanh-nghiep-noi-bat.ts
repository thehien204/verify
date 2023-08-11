import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {
  DoanhNghiepNoiBatDto,
  DoanhNghiepNoiBatSearchListInputDto,
  SanPhamNoiBatDto,
  SanPhamNoiBatSearchListInputDto
} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbDsDoanhNghiepNoiBatService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<DoanhNghiepNoiBatSearchListInputDto>({
      fieldObject: {
        doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
          label: 'Doanh nghiệp',
          placeholder: 'Nhập tên/ giấy phép kinh doanh/ điện thoại để tìm kiếm',
          grid: this.fw.getGridByWidth(8)
        }),
        trangThai: this.fw.selectControl.trangThaiDoanhNghiepNoiBat({
          grid: this.fw.getGridByWidth(4)
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<DoanhNghiepNoiBatDto>({
      fieldObject: {
        // doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
        //   label: 'Doanh nghiệp',
        //   placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
        //   grid: this.fw.getGridByWidth(24),
        //   required: true
        // }),
        doanhNghiepId: this.fw.selectControl.doanhNghiepSelectCustom({
          label: 'Doanh nghiệp',
          placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          required: true
        }),
        startDate: {
          ...this.fw.base.datePicker({
            label: "Áp dụng từ ngày",
            denNgayDataField: 'endDate',
            grid: this.fw.getGridByWidth(12),
            required: true
          })
        },
        endDate: {
          ...this.fw.base.datePicker({
            label: "đến ngày",
            tuNgayDataField: 'startDate',
            grid: this.fw.getGridByWidth(12)
          })
        },
        trangThai: {
          ...this.fw.selectControl.trangThaiDoanhNghiepNoiBat({
            grid: this.fw.getGridByWidth(12),
            required: true,
            value: "2"
          })
        },
        isActive: {
          ...this.fw.base.checkBox({
            checkBoxLabel: 'Hiệu lực',
            grid: this.fw.getGridByWidth(12),
            value: "true"
          })
        }
      }
    });
  }
}
