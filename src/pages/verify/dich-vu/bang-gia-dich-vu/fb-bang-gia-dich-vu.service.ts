import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {BangGiaDichVuDto, BangGiaDichVuSearchListInputDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbBangGiaDichVuService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<BangGiaDichVuSearchListInputDto>({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(5),
          placeholder: 'Nhập tên để tìm kiếm',
          allowEnterKeySearch: true
        }),
        loaiDichVuId: {
          ...this.fw.selectControl.loaiDichVu(),
          grid: this.fw.getGridByWidth(6),
        },
        ngayHieuLucRange: {
          ...this.fw.custom.dateRangeWithCustomSelect({
            label: 'Ngày áp dụng',
            grid: this.fw.getGridByWidth(6),
          })
        },
        isActive: {
          ...this.fw.selectControl.trangThaiMoKhoa(),
          grid: this.fw.getGridByWidth(3),
        }
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<BangGiaDichVuDto>({
      fieldObject: {
        ten: {
          ...this.fw.base.text({
            label: 'Tên',
            required: true,
            maxLength: 200,
            grid: this.fw.getGridByWidth(24)
          })
        },
        loaiDichVuId: {
          ...this.fw.selectControl.loaiDichVu(),
          required: true,
          grid: this.fw.getGridByWidth(24)
        },
        ngayHieuLuc: {
          ...this.fw.base.datePicker({
            label: "Áp dụng từ ngày",
            denNgayDataField: 'ngayHetHieuLuc',
            grid: this.fw.getGridByWidth(12),
            required: true,
            minDate: new Date()
          })
        },
        ngayHetHieuLuc: {
          ...this.fw.base.datePicker({
            label: "đến ngày",
            tuNgayDataField: 'ngayHieuLuc',
            grid: this.fw.getGridByWidth(12)
          })
        },
        donGia: {
          ...this.fw.base.numberInput({
            min: 0,
            required: true,
            label: "Đơn giá",
            grid: this.fw.getGridByWidth(12)
          })
        },
        donViTinh: {
          ...this.fw.selectControl.donViTinhGia(),
          required: true,
          value: '2',
          disabled: true,
          grid: this.fw.getGridByWidth(12)
        },
        moTa: {
          ...this.fw.base.textArea({
            label: 'Mô tả',
            maxLength: 1000,
            rows: 3,
            grid: this.fw.getGridByWidth(24)
          })
        },
        isActive: {
          ...this.fw.selectControl.trangThaiMoKhoa(),
          grid: this.fw.getGridByWidth(12),
          value: 'true',
          required: true
        },
      }
    });
  }
}
