import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {DoanhNghiepGcpDto, DoanhNghiepServiceProxy} from "@service-proxies/verify-service-proxies";
import {FormArray, FormBuilder, Validators} from "@node_modules/@angular/forms";
import {OfFormHelper} from "@node_modules/@orendaco/of";
import FormHelper from "../../../../../../shared/helpers/formHelper";

@Component({
  templateUrl: './cap-nhat-gcp-modal.component.html',
  styles: []
})
export class CapNhatGcpModalComponent implements OnInit {
  @Input() doanhNghiepId: number;
  formArray: FormArray;

  constructor(private nzModalRef: NzModalRef,
              private doanhNghiepService: DoanhNghiepServiceProxy,
              private fb: FormBuilder
  ) {
    this.formArray = this.fb.array([]);
  }

  ngOnInit(): void {
    this.doanhNghiepService.getListDoanhNghiepGcp(this.doanhNghiepId)
      .subscribe(res => {
        res.forEach(item => {
          this.formArray.push(this.fb.group({
            id: item.id,
            gcp: [item.gcp, Validators.required],
            doanhNghiepId: item.doanhNghiepId
          }))
        })
      })
  }

  close() {
    this.nzModalRef.close();
  }

  capNhat() {
    abp.ui.setBusy();
    FormHelper.getInstance().checkValid(this.formArray, (res) => {
      this.doanhNghiepService.updateDoanhNghiepGcp(res.map(x => new DoanhNghiepGcpDto(x)))
        .subscribe(res => {
          abp.notify.success("Cập nhật thành công")
          this.nzModalRef.close();
          abp.ui.clearBusy();
        }, () => abp.ui.clearBusy())
    })
  }

  themGcp() {
    this.formArray.push(this.fb.group({
      id: 0,
      gcp: ['', Validators.required],
      doanhNghiepId: this.doanhNghiepId
    }))
  }

  delete(i: number) {
    this.formArray.removeAt(i);
  }
}
