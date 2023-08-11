import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LuuGiayChungNhanInputDto, SanPhamDto, SanPhamServiceProxy} from "@service-proxies/verify-service-proxies";
import {NzModalRef} from "@node_modules/ng-zorro-antd/modal";
import {OfGroupModel, OfSchemaModel} from "@node_modules/@orendaco/of";
import {FormWidgetFacadeService} from "@app-ordco/form-widgets/form-widget-facade.service";
import {finalize} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-upload-giay-chung-nhan',
  templateUrl: './upload-giay-chung-nhan.component.html',
  styles: []
})
export class UploadGiayChungNhanComponent implements OnInit, AfterViewInit {
  sanPhamDto: SanPhamDto;
  formSchema: OfSchemaModel;

  constructor(private modal: NzModalRef,
              private sanPhamSP: SanPhamServiceProxy,
              private fb: FormWidgetFacadeService) {
  }


  ngOnInit(): void {
    this.formSchema = new OfSchemaModel({
      fieldObject: {
        listGiayChungNhan: this.fb.custom.uploadGiayChungNhan({
          grid: this.fb.getGridByWidth(24)
        })
      }
    });
  }

  ngAfterViewInit(): void {
    this.sanPhamSP.getGiayChungNhan(this.sanPhamDto.id).subscribe(ret => {
      this.formSchema.form.getControl('listGiayChungNhan').patchValue(ret);
    });
  }

  onSave() {
    const body = new LuuGiayChungNhanInputDto();
    body.sanPhamId = this.sanPhamDto.id;
    body.listGiayChungNhan = this.formSchema.form.getControl('listGiayChungNhan').value;
    abp.ui.setBusy();
    this.sanPhamSP.luuGiayChungNhan(body)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(d => {
        abp.notify.success('Lưu thành công danh sách giấy chứng nhận');
        this.destroyModal();
      })
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
