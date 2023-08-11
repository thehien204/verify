import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {
  BannerDto,
  BannerSearchListInputDto,
  DoanhNghiepNoiBatDto,
  DoanhNghiepNoiBatSearchListInputDto,
  SanPhamNoiBatDto,
  SanPhamNoiBatSearchListInputDto
} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbListBannerService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<BannerSearchListInputDto>({
      fieldObject: {
        doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
          label: 'Doanh nghiệp',
          placeholder: 'Nhập mã/ tên doanh nghiệp để tìm kiếm',
          grid: this.fw.getGridByWidth(8)
        }),
        dateRange: this.fw.custom.dateRangeWithCustomSelect({
          label: 'Ngày hiện thị',
          grid: this.fw.getGridByWidth(8)
        }),
        trangThai: this.fw.selectControl.trangThaiBanner({
          grid: this.fw.getGridByWidth(4)
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<BannerDto>({
      fieldObject: {
        name: this.fw.base.text({
          label: 'Tên',
          maxLength: 200,
          grid: this.fw.getGridByWidth(12)
        }),
        listScheduleId: this.fw.selectControl.bannerSchedule({
          grid: this.fw.getGridByWidth(12),
          nzMode: "multiple"
        }),
        doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
          label: 'Doanh nghiệp',
          placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
          grid: this.fw.getGridByWidth(24),
        }),
        sanPhamId: this.fw.selectControl.sanPhamCuaDoanhNghiepSelectCustom({
          label: 'Sản phẩm',
          placeholder: 'Nhập mã/ tên sản phẩm để tìm kiếm',
          grid: this.fw.getGridByWidth(24)
        }),
        bannerImageUrl: this.fw.custom.hinhAnhBanner({
          required: true,
          grid: this.fw.getGridByWidth(24),
        }),
        startDate: {
          ...this.fw.base.datePicker({
            label: "Hiện thị từ ngày",
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
        linkType: this.fw.selectControl.loaiLinkBanner({
          grid: this.fw.getGridByWidth(12),
          required: true
        }),
        link: this.fw.base.text({
          label: 'Link',
          maxLength: 200,
          grid: this.fw.getGridByWidth(12)
        }),
        trangThai: {
          ...this.fw.selectControl.trangThaiBanner({
            grid: this.fw.getGridByWidth(12),
            required: true,
            value: '2'
          })
        }
      }
    });
  }
}
