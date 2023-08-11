import {Injectable} from '@angular/core';
import {OCoreUtilityService, OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {GoiDichVuChiTietDto, GoiDichVuDto, GoiDichVuSearchListInnputDto} from "@service-proxies/verify-service-proxies";
import {GoiDichVuChiTietFormComponent} from "./goi-dich-vu-chi-tiet-form/goi-dich-vu-chi-tiet-form.component";

import {FormArray, FormControl, FormGroup} from '@ngneat/reactive-forms';
import {AbstractControl, ValidationErrors} from "@node_modules/@angular/forms";
import {tap} from "@node_modules/rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class FbGoiDichVuService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<GoiDichVuSearchListInnputDto>({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(5),
          placeholder: 'Nhập tên để tìm kiếm',
          allowEnterKeySearch: true
        }),
        loaiDichVuId: {
          ...this.fw.selectControl.loaiDichVu(),
          grid: this.fw.getGridByWidth(5),
        },
        ngayHieuLucRange: {
          ...this.fw.custom.dateRangeWithCustomSelect({
            label: 'Ngày áp dụng',
            grid: this.fw.getGridByWidth(8),
          })
        },
        isActive: this.fw.base.select({
          label: 'Trạng thái',
          options: [{
            value: 'true',
            displayText: 'Đang mở'
          }, {
            value: 'false',
            displayText: 'Đã khóa'
          }],
          grid: this.fw.getGridByWidth(3),
        })
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<GoiDichVuDto>({
      fieldObject: {
        ten: {
          ...this.fw.base.text({
            label: 'Tên',
            required: true,
            maxLength: 200,
            grid: this.fw.getGridByWidth(24)
          })
        },
        moTa: {
          ...this.fw.base.textArea({
            label: 'Mô tả',
            maxLength: 1000,
            rows: 3,
            grid: this.fw.getGridByWidth(24)
          })
        },

        listOfChiTiet: {
          ...this.fw.base.componentRef({
            componentRef: GoiDichVuChiTietFormComponent
          }),
          grid: this.fw.getGridByWidth(24),
        },
        ngayHieuLuc: {
          ...this.fw.base.datePicker({
            label: "Áp dụng từ ngày",
            denNgayDataField: 'ngayHetHieuLuc',
            grid: this.fw.getGridByWidth(6),
            required: true
          })
        },
        ngayHetHieuLuc: {
          ...this.fw.base.datePicker({
            label: "đến ngày",
            tuNgayDataField: 'ngayHieuLuc',
            grid: this.fw.getGridByWidth(6)
          })
        },
        thoiGianTinhGia: {
          ...this.fw.base.numberInput({
            label: "Thời gian tính giá (tháng)",
            grid: this.fw.getGridByWidth(6)
          })
        },
        tongTien: {
          ...this.fw.base.text({
            label: "Tổng tiền",
            grid: this.fw.getGridByWidth(6),
            value: '0',
            disabled: true
          })
        },
        chietKhau: {
          ...this.fw.base.numberInput({
            min: 0,
            label: "Chiết khấu",
            grid: this.fw.getGridByWidth(6),
            value: '0'
          })
        },
        chietKhauTheoId: {
          ...this.fw.selectControl.chietKhauTheo(),
          grid: this.fw.getGridByWidth(6),
          value: '1'
        },
        isActive: {
          ...this.fw.selectControl.trangThaiMoKhoa(),
          grid: this.fw.getGridByWidth(6),
          required: true
        },
      }
    });
  }

  addListChiTietArrayForm(form: FormGroup, listChiTiet: GoiDichVuChiTietDto[]) {
    const controlArray = new FormArray(listChiTiet.map(it => {
      return new FormGroup({
        id: new FormControl(it?.id),
        checked: new FormControl(it?.checked),
        goiDichVuId: new FormControl(it?.goiDichVuId),
        loaiDichVuId: new FormControl(it?.loaiDichVuId),
        bangGiaDichVuId: new FormControl(it?.bangGiaDichVuId, [this.bangGiaIdValid]),
        soLuongThoiGian: new FormControl(it?.soLuongThoiGian),
        soLuong: new FormControl(it?.soLuong, [this.soLuongValid]),
        loaiDichVuDto: new FormControl(it?.loaiDichVuDto),
        listBangGiaDto: new FormControl(it?.listBangGiaDto),
      });
    }));
    form.addControl('listOfChiTiet', controlArray);
    setTimeout(() => {
      form.getControl('listOfChiTiet').valueChanges.pipe(
        tap((lstChiTiet: GoiDichVuChiTietDto[]) => {
          const f = lstChiTiet.filter(x => x.checked === true && x.bangGiaDichVuId > 0);
          let total = 0;
          if (f) {
            f.forEach(it => {
              const findBangGia = it.listBangGiaDto.find(x => x.id == it.bangGiaDichVuId);
              if (findBangGia) {
                total += (it.soLuong * 1 * findBangGia.donGia);
              }
            });
          }
          form.getControl('tongTien').patchValue(total);
        })).subscribe();
    });
  }

  soLuongValid = (abs: AbstractControl): ValidationErrors | null => {
    const value: number = abs.value;
    const parentValue = abs.parent?.value;
    if (!!!parentValue?.checked) {
      return null;
    }
    if (value && +value > 0) {
      return null;
    }
    return {'Nhập số lớn hơn 0': true};
  };
  bangGiaIdValid = (abs: AbstractControl): ValidationErrors | null => {
    const value: number = abs.value;
    const parentValue = abs.parent?.value;
    if (!!!parentValue?.checked) {
      return null;
    }
    if (value && +value > 0) {
      return null;
    }
    return {'Chọn bảng giá áp dụng': true};
  };
}
