import {Injectable} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {GetListSysAuditLogInput} from "@service-proxies/verify-service-proxies";

@Injectable({
  providedIn: 'root'
})
export class FbAuditLogService {

  constructor(private fw: FormWidgetFacadeService) {
  }

  builderSearch() {
    const httpStatusCode = [200, 204, 302, 400, 404, 403, 409, 500];
    const httpStatusCodeOptions = httpStatusCode.map((status) => {
      return {
        displayText: '' + status,
        value: '' + status
      }
    });
    return new OfSchemaModel<GetListSysAuditLogInput>({
      fieldObject: {
        filter: this.fw.base.text({
          label: 'Tên đăng nhập',
          grid: this.fw.getGridByWidth(6),
          placeholder: 'Nhập Tên đăng nhập để tìm kiếm',
          allowEnterKeySearch: true
        }),

        executionTimeRange: this.fw.custom.dateRangeWithCustomSelect({
          label: 'Ngày thực hiện',
          grid: this.fw.getGridByWidth(10),
        }),
        httpStatusCode: {
          ...this.fw.base.select({
            label: 'Status code',
            grid: this.fw.getGridByWidth(4),
            options: httpStatusCodeOptions
          })
        },
        isSuccess: {
          ...this.fw.base.select({
            label: 'Trạng trái',
            grid: this.fw.getGridByWidth(4),
            options: [
              {
                displayText: '200',
                value: '200'
              },
              {
                displayText: 'Có lỗi',
                value: 'false'
              }
            ]
          })
        },
        url: this.fw.base.text({
          label: 'Url',
          grid: this.fw.getGridByWidth(6),
          allowEnterKeySearch: true
        }),
      },
      afterViewInitFunc: (schemaModel, component) => {
        setTimeout(() => {
          schemaModel.form.patchValue({
            executionTimeRange: {
              tuNgay: new Date(),
              denNgay: new Date(),
            }
          });
          schemaModel.search();
        });

      }
    });
  }
}
