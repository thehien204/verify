import {Injectable} from '@angular/core';
import {DestroyRxjsService, OfGroupModel, OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {DoanhNghiepDto, SanPhamDto} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbSanPhamDoanhNghiepService {
  doanhNghiepModeDto: DoanhNghiepDto;

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch(doanhNghiepId: number) {
    return new OfSchemaModel<SanPhamDto>({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Từ khóa tìm kiếm',
          grid: this.fw.getGridByWidth(24),
          placeholder: 'Nhập tên/ mã để tìm kiếm',
          allowEnterKeySearch: true
        }),

        nhomSanPhamId: {
          ...this.fw.selectControl.nhomSanPham(),
          grid: this.fw.getGridByWidth(24),
        },
        doanhNghiepId: this.fw.base.text({
          label: 'doanhNghiepId',
          grid: this.fw.getGridByWidth(24),
          hidden: true,
          value: doanhNghiepId
        }),
      },
      afterViewInitFunc: (schemaModel, component) => {
        schemaModel.search();
      }
    });
  }

  builderEntity(destroy$: DestroyRxjsService, doanhNghiepModeDto: DoanhNghiepDto) {
    this.doanhNghiepModeDto = doanhNghiepModeDto;
    return new OfSchemaModel<SanPhamDto>({
      fields: [
        new OfGroupModel({
          width: 14,
          allowCard: false,
          css: 'mt-5',
          groupSchema: new OfSchemaModel({
            fieldObject: {
              doanhNghiepId: this.fw.base.text({
                label: 'doanhNghiepId',
                grid: this.fw.getGridByWidth(24),
                hidden: true,
                value: doanhNghiepModeDto.id
              }),
              maDoanhNghiep: {
                ...this.fw.base.text({
                  label: 'Mã doanh nghiệp',
                  disabled: true,
                  value: this.doanhNghiepModeDto.maDoanhNghiep,
                }),
                grid: this.fw.getGridByWidth(12),
              },
              tenDoanhNghiep: {
                ...this.fw.base.text({
                  label: 'Tên doanh nghiệp',
                  disabled: true,
                  value: this.doanhNghiepModeDto.ten,
                }),
                grid: this.fw.getGridByWidth(12),
              },
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
                  maxLength: 999999999,
                  rows: 3,
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

  checkGtinDigit(s: string): number {
    let result = 0;

    for (let counter = 1; counter <= s.length; counter++) {

      if (counter % 2 === 0) {

        result += (parseInt(s.charAt(s.length - counter)));

      } else {

        result += (parseInt(s.charAt(s.length - counter)) * 3);

      }

    }
    return (10 - (result % 10)) % 10;
  }
}
