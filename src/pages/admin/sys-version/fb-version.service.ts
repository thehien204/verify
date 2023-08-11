import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {QuocGiaDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbVersionService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập mã phiên bản để tìm kiếm',
          allowEnterKeySearch: true
        }),
        loaiVersion:{
          ...this.fw.selectControl.loaiVersion(),
          grid: this.fw.getGridByWidth(24),
        }
      },

      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<QuocGiaDto>({
      fieldObject: {
        loaiVersion:{
          ...this.fw.selectControl.loaiVersion(),
          grid: this.fw.getGridByWidth(24),
        },
        prefix: {
          ...this.fw.base.text({
            label: 'Tiền tố',
            required: false,
            maxLength: 10,
            grid: this.fw.getGridByWidth(24)
          })
        },
        maPhienBan: {
          ...this.fw.base.text({
            label: 'Mã phiên bản',
            required: true,
            maxLength:20,
            grid: this.fw.getGridByWidth(24)
          })
        },
        noiDungCapNhat: {
          ...this.fw.base.textArea({
            label: 'Nội dung cập nhật',
            rows: 4,
            required: true,
            grid: this.fw.getGridByWidth(24)
          })
        },
        ngayCapNhat: {
          ...this.fw.base.datePicker({
            label: 'Ngày cập nhật',
            required: true,
            grid: this.fw.getGridByWidth(24)
          })
        },
        requireUpdate: {
          ...this.fw.base.switch({
            label: 'Yêu cầu cập nhật',
            required: true,
            grid: this.fw.getGridByWidth(24)
          })
        },
      }
    });
  }
}
