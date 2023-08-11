import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {
  BangGiaDichVuDto,
  BangGiaDichVuSearchListInputDto,
  LOAI_THONG_BAO
} from "@service-proxies/verify-service-proxies";
import {Validators} from "@node_modules/@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class Notificationservice {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<BangGiaDichVuSearchListInputDto>({
      fieldObject: {
        notificationName: {
          ...this.fw.selectControl.listNotificationName(),
          grid: this.fw.getGridByWidth(6),
        },
        doiTuongNhanThongBao: {
          ...this.fw.selectControl.loaiTaiKhoan(),
          label: 'Đối tượng nhận thông báo',
          grid: this.fw.getGridByWidth(6),
        },
        loaiThongBao: {
          ...this.fw.selectControl.loaiThongBao(),
          grid: this.fw.getGridByWidth(6),
          value: LOAI_THONG_BAO.GUI_NGAY.toString(),
          allowClearIcon: false, // ???

        },
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
            grid: this.fw.getGridByWidth(12)
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
          grid: this.fw.getGridByWidth(12)
        },
        isActive: {
          ...this.fw.selectControl.trangThaiMoKhoa(),
          grid: this.fw.getGridByWidth(12),
          required: true
        },
      }
    });
  }
}
