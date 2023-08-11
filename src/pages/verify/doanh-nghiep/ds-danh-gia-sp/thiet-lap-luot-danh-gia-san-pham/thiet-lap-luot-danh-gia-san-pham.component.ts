import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzModalRef} from "@node_modules/ng-zorro-antd/modal";
import {
  AdminThietLapDanhGiaSanPhamInputDto,
  DanhGiaSanPhamManagerServiceProxy
} from "@service-proxies/verify-service-proxies";
import {FormBuilder, FormControl, FormGroup, Validators} from "@node_modules/@angular/forms";
import {OfFormHelper} from "@node_modules/@orendaco/of";
import {combineLatest, Subject} from "@node_modules/rxjs";
import {debounceTime} from "@node_modules/rxjs/internal/operators";

@Component({
  templateUrl: './thiet-lap-luot-danh-gia-san-pham.component.html',
  styles: []
})
export class ThietLapLuotDanhGiaSanPhamComponent implements OnInit, OnDestroy {
  @Input() dataItem: AdminThietLapDanhGiaSanPhamInputDto;
  rfFormGroup: FormGroup;
  controlDiem = new FormControl();
  $destroy = new Subject();
  nzLablel = 8;
  nzControl = 16;

  constructor(
    private modalRef: NzModalRef,
    private danhGiaSpService: DanhGiaSanPhamManagerServiceProxy,
    private fb: FormBuilder
  ) {
    this.rfFormGroup = this.fb.group({
      tongDiem: [undefined, Validators.required],
      tongLuotDanhGia: [undefined, Validators.required]
    })
  }

  ngOnInit(): void {
    combineLatest([
      this.rfFormGroup.get('tongDiem').valueChanges.pipe(debounceTime(300)),
      this.rfFormGroup.get('tongLuotDanhGia').valueChanges.pipe(debounceTime(300)),
    ]).subscribe(([td, tl]) => {
      if (tl === 0) {
        this.controlDiem.setValue(0)
      } else {
        this.controlDiem.setValue(td / tl);
      }
    });
    this.rfFormGroup.patchValue(this.dataItem);
  }

  close() {
    this.modalRef.destroy();
  }

  save() {
    if (this.rfFormGroup.valid) {
      this.danhGiaSpService.adminThietLapDanhGiaSanPham({
        sanPhamId: this.dataItem.sanPhamId,
        ...this.rfFormGroup.value
      }).subscribe(res => {
        abp.notify.success("Thiết lập thành công");
        this.modalRef.destroy(true);
      })
      // console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.rfFormGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  resetDefault() {
    this.danhGiaSpService.adminThietLapDanhGiaSanPhamChuan(this.dataItem.sanPhamId)
      .subscribe(res => {
        abp.notify.success("Thiết lập thành công");
        this.modalRef.destroy(true);
      })
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
