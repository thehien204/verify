import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {SanPhamNoiBatDto, SanPhamNoiBatSearchListInputDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbDsSanPhamNoiBatService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<SanPhamNoiBatSearchListInputDto>({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(4),
          placeholder: 'Nhập mã gtin để tìm kiếm',
          allowEnterKeySearch: true
        }),

        nhomSanPhamId: {
          ...this.fw.selectControl.nhomSanPham(),
          grid: this.fw.getGridByWidth(5),
        },
        doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
          label: 'Doanh nghiệp',
          placeholder: 'Nhập mã/ tên doanh nghiệp để tìm kiếm',
          grid: this.fw.getGridByWidth(8)
        }),
        trangThai: this.fw.selectControl.trangThaiSanPhamNoiBat({
          grid: this.fw.getGridByWidth(4)
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<SanPhamNoiBatDto>({
      fieldObject: {
        doanhNghiepId: this.fw.selectControl.doanhNghiepSelectCustom({
          label: 'Doanh nghiệp',
          placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          required: true
        }),
        sanPhamId: this.fw.selectControl.sanPhamCuaDoanhNghiepSelectCustom({
            label: 'Sản phẩm',
            placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
            grid: this.fw.getGridByWidth(24),
            required: true
        }),
        // sanPhamId: this.fw.selectControl.sanPhamSearchServer({
        //   label: 'Sản phẩm',
        //   placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
        //   grid: this.fw.getGridByWidth(24),
        //   required: true
        // }),
        // startDate: {
        //   ...this.fw.base.datePicker({
        //     label: "Áp dụng từ ngày",
        //     denNgayDataField: 'endDate',
        //     grid: this.fw.getGridByWidth(12),
        //     required: true
        //   })
        // },
        // endDate: {
        //   ...this.fw.base.datePicker({
        //     label: "đến ngày",
        //     tuNgayDataField: 'startDate',
        //     grid: this.fw.getGridByWidth(12)
        //   })
        // },
        trangThai: {
          ...this.fw.selectControl.trangThaiSanPhamNoiBat({
            grid: this.fw.getGridByWidth(12),
            required: true,
            value: '2'
          })
        },
        isActive: {
          ...this.fw.base.checkBox({
            checkBoxLabel: 'Hiệu lực',
            grid: this.fw.getGridByWidth(12),
            value: 'true'
          })
        }
      }
    });
  }
}
