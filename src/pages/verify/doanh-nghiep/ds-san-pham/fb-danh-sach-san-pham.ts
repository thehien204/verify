import {Injectable} from '@angular/core';
import {OfGroupModel, OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {SanPhamDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbDanhSachSanPhamService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    return new OfSchemaModel<SanPhamDto>({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(5),
          placeholder: 'Nhập tên/ mã để tìm kiếm',
          allowEnterKeySearch: true
        }),
        doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
          label: 'Doanh nghiệp',
          placeholder: 'Nhập mã/ tên doanh nghiệp để tìm kiếm',
          grid: this.fw.getGridByWidth(9)
        }),
        nhomSanPhamId: {
          ...this.fw.selectControl.nhomSanPham(),
          grid: this.fw.getGridByWidth(4),
        },
        trangThaiXacThuc: {
          ...this.fw.selectControl.trangThaiXacThuc(),
          label: 'Trạng thái xác thực',
          grid: this.fw.getGridByWidth(3),
        }
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity() {
    return new OfSchemaModel<SanPhamDto>({
      fields: [
        new OfGroupModel({
          width: 14,
          allowCard: false,
          css: 'mt-5',
          groupSchema: new OfSchemaModel({
            fieldObject: {
              doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
                label: 'Doanh nghiệp',
                placeholder: 'Nhập mã/ tên doanh nghiệp để tìm kiếm',
                grid: this.fw.getGridByWidth(24),
                required: true
              }),
              gcpDoanhNghiep: {
                ...this.fw.selectControl.gcpDoanhNghiep('doanhNghiepId'),
                required: true,
                grid: this.fw.getGridByWidth(12),
              },
              nhomSanPhamId: {
                ...this.fw.selectControl.nhomSanPham(),
                grid: this.fw.getGridByWidth(12),
              },
              ma: {
                ...this.fw.base.numberInput({
                  label: 'Mã (GTIN)',
                  required: true,
                  onlyKeyNumber: true,
                  maxlength: 14,
                  placeholder: 'Nhập mã gtin của sản phẩm',
                  grid: this.fw.getGridByWidth(12)
                })
              },
              ten: {
                ...this.fw.base.text({
                  label: 'Tên sản phẩm',
                  required: true,
                  maxLength: 100,
                  grid: this.fw.getGridByWidth(12)
                })
              },
              giaThamKhao: this.fw.base.numberInput({
                label: 'Giá tham khảo (vnđ)',
                min: 0,
                grid: this.fw.getGridByWidth(8)
              }),
              xuatXuQuocGiaId: this.fw.selectControl.quocGia({
                label: 'Xuất xứ',
                grid: this.fw.getGridByWidth(8),
                value: '241'
              }),
              trongLuongTheTich: this.fw.base.text({
                label: 'Trọng lượng/Thể tích',
                placeholder: 'Nhập đầy đủ đơn vị tính',
                grid: this.fw.getGridByWidth(8)
              }),
              thiTruongMucTieu: {
                ...this.fw.base.text({
                  label: 'Thị trường mục tiêu',
                  maxLength: 1000,
                  grid: this.fw.getGridByWidth(24)
                })
              },
              moTa: {
                ...this.fw.base.textArea({
                  label: 'Mô tả sản phẩm',
                  rows: 3,
                  maxLength: 999999999,
                  grid: this.fw.getGridByWidth(24)
                })
              }
            }
          })
        }),
        this.fw.custom.danhSachHinhAnhSanPham({
          width: 10
        })
      ]
    });
  }
}
