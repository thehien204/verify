import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {DoanhNghiepDto} from "@service-proxies/verify-service-proxies";
import {
  ThongTinNguoiDaiDienTitleComponent
} from "./thong-tin-nguoi-dai-dien-title/thong-tin-nguoi-dai-dien-title.component";
import {
  ThongTinNguoiLienHeTitleComponent
} from "./thong-tin-nguoi-dai-dien-title/thong-tin-nguoi-lien-he-title.component";

@Injectable({
  providedIn: 'root'
})
export class FbQuanLyDoanhNghiepService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(6),
          placeholder: 'Nhập tên/ giấy phép kinh doanh/ điện thoại để tìm kiếm',
          allowEnterKeySearch: true
        }),
        maTinh: {
          ...this.fw.selectControl.tinh(),
          grid: this.fw.getGridByWidth(4)
        },
        maHuyen: {
          ...this.fw.selectControl.huyen('maTinh'),
          grid: this.fw.getGridByWidth(4)
        },
        maXa: {
          ...this.fw.selectControl.xa('maHuyen'),
          grid: this.fw.getGridByWidth(4)
        },
        trangThai: {
          ...this.fw.selectControl.trangThaiDoanhNghiep(),
          grid: this.fw.getGridByWidth(3),
        },
        nhomDoanhNghiepId: {
          ...this.fw.selectControl.nhomDoanhNghiep(),
          grid: this.fw.getGridByWidth(4)
        },
        maSoThue:  this.fw.base.text({
          label: 'Mã số thuế',
          grid: this.fw.getGridByWidth(4),
          placeholder: 'Nhập  mã số thuế doanh nghiệp',
        }),
        soGiayPhepKinhDoanh:  this.fw.base.text({
          label: 'Số giấy phép kinh doanh',
          grid: this.fw.getGridByWidth(4),
          placeholder: 'Nhập số giấy phép kinh doanh',
        }),
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<DoanhNghiepDto>({
      fieldObject: {
        ten: {
          ...this.fw.base.text({
            label: 'Tên doanh nghiệp',
            required: true,
            maxLength: 200,
            grid: this.fw.getGridByWidth(6),
          })
        },
        listNhomDoanhNghiepId: {
          ...this.fw.selectControl.nhomDoanhNghiepMulti(),

          grid: this.fw.getGridByWidth(6),
        },
        maDoanhNghiep: {
          ...this.fw.base.numberInput({
            label: 'Giấy phép kinh doanh',
            required: true,
            maxlength: 200,
            onlyKeyNumber: true,
            grid: this.fw.getGridByWidth(6)
          })
        },
        maDiaDiemGLN: {
          ...this.fw.base.text({
            label: 'Mã địa điểm toàn cầu GLN',
            maxLength: 200,
            grid: this.fw.getGridByWidth(6)
          })
        },
        maSoThue: {
          ...this.fw.base.numberInput({
            label: 'Mã số thuế',
            required: true,
            maxlength: 200,
            onlyKeyNumber: true,
            grid: this.fw.getGridByWidth(6)
          })
        },
        soDienThoai: {
          ...this.fw.base.text({
            label: 'Số điện thoại',
            maxLength: 200,
            grid: this.fw.getGridByWidth(6),
            required: true,
          })
        },
        email: {
          ...this.fw.base.text({
            label: 'Email',
            maxLength: 200,
            grid: this.fw.getGridByWidth(6),
            required: true,
            validations: [{
              name: 'email'
            }]
          })
        },
        website: {
          ...this.fw.base.text({
            label: 'Website',
            maxLength: 200,
            grid: this.fw.getGridByWidth(6)
          })
        },
        quocGiaId: {
          ...this.fw.selectControl.quocGia(),
          grid: this.fw.getGridByWidth(6),
          required: true,
        },
        maTinh: {
          ...this.fw.selectControl.tinh(),
          grid: this.fw.getGridByWidth(6),
          required: true,
        },
        maHuyen: {
          ...this.fw.selectControl.huyen('maTinh'),
          required: true,
          grid: this.fw.getGridByWidth(6)
        },
        maXa: {
          ...this.fw.selectControl.xa('maHuyen'),
          required: true,
          grid: this.fw.getGridByWidth(6)
        },
        diaChi: {
          ...this.fw.base.text({
            label: 'Số nhà',
            maxLength: 200,
            required: true,
            grid: this.fw.getGridByWidth(24)
          })
        },
        // trangThai: {
        //   ...this.fw.selectControl.trangThaiDoanhNghiep({
        //     nzAllowClear: false
        //   }),
        //   grid: this.fw.getGridByWidth(6),
        //   value: '1',
        // },
        thongTinNguoiDaiDienTitle: this.fw.base.componentRef({
          componentRef: ThongTinNguoiDaiDienTitleComponent,
          grid: this.fw.getGridByWidth(24)
        }),
        nguoiDaiDienHoTen: {
          ...this.fw.base.text({
            label: 'Tên người đại diện',
            required: true,
            maxLength: 200,
            grid: this.fw.getGridByWidth(6)
          })
        },
        nguoiDaiDienSoDienThoai: {
          ...this.fw.base.numberInput({
            label: 'Số điện thoại người đại diện',
            maxlength: 20,
            onlyKeyNumber: true,
            grid: this.fw.getGridByWidth(6)
          })
        },
        nguoiDaiDienEmail: {
          ...this.fw.base.text({
            label: 'Email người đại diện',
            maxLength: 200,
            grid: this.fw.getGridByWidth(6),
            validations: [{
              name: 'email'
            }]
          })
        },
        nguoiDaiDienCanCuoc: {
          ...this.fw.base.numberInput({
            label: 'Số CCCD/CMND người đại diện',
            maxlength: 15,
            onlyKeyNumber: true,
            grid: this.fw.getGridByWidth(6)
          })
        },
        thongTinNguoiLienHeTitle: this.fw.base.componentRef({
          componentRef: ThongTinNguoiLienHeTitleComponent,
          grid: this.fw.getGridByWidth(24)
        }),
        nguoiLienHeHoTen: {
          ...this.fw.base.text({
            label: 'Tên người liên hệ',
            maxLength: 200,
            grid: this.fw.getGridByWidth(6)
          })
        },
        nguoiLienHeSoDienThoai: {
          ...this.fw.base.numberInput({
            label: 'Số điện thoại người liên hệ',
            maxlength: 20,
            onlyKeyNumber: true,
            grid: this.fw.getGridByWidth(6),
            validations: [{
              name: 'phone'
            }]
          })
        },
        nguoiLienHeEmail: {
          ...this.fw.base.text({
            label: 'Email người liên hệ',
            maxLength: 200,
            grid: this.fw.getGridByWidth(6),
            validations: [{
              name: 'email'
            }]
          })
        },
      }
    });
  }
}
