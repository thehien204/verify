import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {
  LOAI_DANG_KY_GOI_DICH_VU,
  PheDuyetGoiDichVuDnDangKyInputDto,
  TRANG_THAI_DANG_KY_GOI_DICH_VU
} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class XemGoiDichVuDangKyService {

  constructor(private fw: FormWidgetFacadeService) {
  }
  builderSearch() {
    return new OfSchemaModel<any>({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập tên gói, Ten doanh nghiệp/ mã số doanh nghiệp/ điện thoại để tìm kiếm',
          allowEnterKeySearch: true
        }),

        trangThai: {
          ...this.fw.selectControl.trangThaiDangKyGoiDvDn(),
          grid: this.fw.getGridByWidth(24),
          // value: TRANG_THAI_DANG_KY_GOI_DICH_VU.ChoDuyet.toString()
        },
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }
  builderEntity(loai : LOAI_DANG_KY_GOI_DICH_VU) {
    if(loai === LOAI_DANG_KY_GOI_DICH_VU.YeuCauTuVan){
      return new OfSchemaModel<PheDuyetGoiDichVuDnDangKyInputDto>({
        fieldObject: {
          doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
            label: 'Doanh nghiệp áp dụng',
            placeholder: 'Nhập mã/ tên doanh nghiệp để tìm kiếm',
            grid: this.fw.getGridByWidth(24),
            required: true
          }),
          ngayHieuLuc: {
            ...this.fw.base.datePicker({
              label: "Ngày áp dụng",
              denNgayDataField: 'ngayHieuLuc',
              grid: this.fw.getGridByWidth(12),
              required: true,
              value: new Date()
            })
          },
        }
      });
    }else{
      return new OfSchemaModel<PheDuyetGoiDichVuDnDangKyInputDto>({
        fieldObject: {
          ngayHieuLuc: {
            ...this.fw.base.datePicker({
              label: "Ngày áp dụng",
              denNgayDataField: 'ngayHieuLuc',
              grid: this.fw.getGridByWidth(12),
              required: true,
              value: new Date()
            })
          },
        }
      });
    }

  }

}
