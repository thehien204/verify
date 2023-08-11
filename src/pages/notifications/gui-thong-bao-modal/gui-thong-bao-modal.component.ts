import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzModalRef} from "@node_modules/ng-zorro-antd/modal";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@node_modules/@angular/forms";
import {
  ICommonResultDtoOfNotificationsDto,
  LOAI_THONG_BAO,
  LoaiDoiTuongNhanTb,
  NotificationsData,
  NotificationsDto,
  NotificationsServiceProxy,
  THIET_BI_NHAN_TB,
  SysAuditLogServiceProxy,
  _definitions_TINH_NANG_HE_THONG
} from "@service-proxies/verify-service-proxies";
import {Observable, Subject} from "@node_modules/rxjs";
import * as moment from 'moment'
import {distinctUntilChanged, takeUntil} from "@node_modules/rxjs/internal/operators";
import {OfFormHelper} from "@node_modules/@orendaco/of";

@Component({
  templateUrl: './gui-thong-bao-modal.component.html',
  styles: []
})
export class GuiThongBaoModalComponent implements OnInit, OnDestroy {
  @Input() dataItem: NotificationsDto;
  rfFormGroup: FormGroup;
  btnBusy = false;
  enumLoaiThongBao = LOAI_THONG_BAO;
  enumLoaiDtNhanTb = LoaiDoiTuongNhanTb;
  $destroy = new Subject();

  constructor(private modalRef: NzModalRef,
              private fb: FormBuilder,
              private notifiService: NotificationsServiceProxy,
              private sysAuditLogService: SysAuditLogServiceProxy
  ) {

  }

  get cruService(): Observable<ICommonResultDtoOfNotificationsDto> {
    const fValue = this.rfFormGroup.value;
    const temp = new NotificationsDto({
      ...this.dataItem,
      ...fValue,
      ngayTaoThongBao: this.dataItem?.ngayTaoThongBao ? moment(this.dataItem.ngayTaoThongBao) : undefined,
      dataObject: new NotificationsData({
        title: fValue.title,
        message: fValue.message,
        properties: undefined
      }),
    });
    switch (temp.loaiDoiTuongNhanTb) {
      case LoaiDoiTuongNhanTb.ListUser:
        temp.sendToListLoaiTaiKhoan = null;
        temp.listNhomDoanhNghiepId = null;
        break;
      case LoaiDoiTuongNhanTb.ListLoaiTaiKhoan:
        temp.listUserId = null;
        temp.listNhomDoanhNghiepId = null;
        break;
      case LoaiDoiTuongNhanTb.ListNhomDoanhNghiep:
        temp.listUserId = null;
        temp.sendToListLoaiTaiKhoan = null;
        break;

    }

    return this.dataItem?.id ? this.notifiService.update(temp) : this.notifiService.create(temp);
  }

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.QuanLyThongBao).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.QuanLyThongBao);
    })
    this.rfFormGroup = this.fb.group({
      notificationName: [undefined, Validators.required],
      loaiDoiTuongNhanTb: [LoaiDoiTuongNhanTb.ListLoaiTaiKhoan, Validators.required],
      sendToListLoaiTaiKhoan: [undefined, Validators.required],
      listNhomDoanhNghiepId: [undefined],
      listUserId: [undefined],
      thietBiNhanTB: [THIET_BI_NHAN_TB.ALL, Validators.required],
      title: [undefined, Validators.required],
      message: [undefined, Validators.required],
    });

    if (this.dataItem) {
      this.rfFormGroup.patchValue({
        ...this.dataItem,
        message: this.dataItem.dataObject?.message,
        title: this.dataItem.dataObject?.title,
      })
    }
    this.rfFormGroup.get("loaiDoiTuongNhanTb")
      .valueChanges.pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(res => {
        switch (res as LoaiDoiTuongNhanTb) {
          case LoaiDoiTuongNhanTb.ListUser:
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('listUserId') as FormControl,
              [this.validArr]);
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('sendToListLoaiTaiKhoan') as FormControl,
              []);
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('listNhomDoanhNghiepId') as FormControl,
              []);
            break;
          case LoaiDoiTuongNhanTb.ListLoaiTaiKhoan:
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('listUserId') as FormControl,
              []);
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('sendToListLoaiTaiKhoan') as FormControl,
              [this.validArr]);
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('listNhomDoanhNghiepId') as FormControl,
              []);
            break;
          case LoaiDoiTuongNhanTb.ListNhomDoanhNghiep:
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('listUserId') as FormControl,
              []);
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('sendToListLoaiTaiKhoan') as FormControl,
              []);
            OfFormHelper.getInstance().updateValidators(this.rfFormGroup.get('listNhomDoanhNghiepId') as FormControl,
              [this.validArr]);
            break;
        }
      })
  }

  validArr = (abs: AbstractControl) => {
    const val: any[] = abs.value;
    if (val) {
      if (val.length === 0) {
        return {
          required: true
        }
      }
      return;
    } else {
      return {
        required: true
      }
    }
  }

  close() {
    this.modalRef.destroy();
  }

  save() {
    if (this.rfFormGroup.invalid) {
      for (const i in this.rfFormGroup.controls) {
        this.rfFormGroup.controls[i].markAsDirty();
        this.rfFormGroup.controls[i].updateValueAndValidity();
      }
      abp.notify.error("Vui lòng kiểm tra lại thông tin đã nhập!");
    } else {
      abp.ui.setBusy();
      this.cruService.subscribe(res => {
        abp.ui.clearBusy();
        abp.notify.success("Xử lý thành công");
        this.modalRef.destroy(true);
      })
    }
  }

  ngOnDestroy(): void {
  }
}
