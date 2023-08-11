import {Component, Injector, Input, OnInit} from '@angular/core';
import {finalize, map, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalComponentBase} from 'src/shared/common/modal-component-base';
import {DoanhNghiep_MaToanCauDto, DoanhNghiep_MaToanCauServiceProxy} from "@service-proxies/verify-service-proxies";
import FormHelper from 'src/shared/helpers/formHelper';


@Component({
  templateUrl: './create-or-edit.component.html',
})
export class CreateOrEditDoanhNghiepMaToanCauComponent extends ModalComponentBase implements OnInit {
  @Input() dataItem: DoanhNghiep_MaToanCauDto;
  @Input() doanhNghiepId: number;
  rfDataModal: FormGroup;
  saving = false;
  flexLabel = '120px';

  constructor(
    injector: Injector,
    private _dataService: DoanhNghiep_MaToanCauServiceProxy,
    private fb: FormBuilder,
  ) {
    super(injector);
  }

  createOrUpdate = (formVal: any) => {
    if (formVal.id) {
      const input = new DoanhNghiep_MaToanCauDto(formVal);
      input.doanhNghiepId = this.doanhNghiepId;
      return this._dataService.update(input)
        .pipe(
          tap(() => this.saving = true),
          map((res) => {
            if (res.isSuccessful) {
              abp.notify.success("Xử lý thành công");
              return res.dataResult;
            } else {
              abp.notify.error(res.errorMessage);
              return null;
            }
          }), finalize(() => {
            this.saving = false;
          }))
    } else {
      const input = new DoanhNghiep_MaToanCauDto(formVal);
      input.doanhNghiepId = this.doanhNghiepId;
      return this._dataService.create(input).pipe(
        tap(() => this.saving = true),
        map((res) => {
          if (res.isSuccessful) {
            abp.notify.success("Xử lý thành công");
            return res.dataResult;
          } else {
            abp.notify.error(res.errorMessage);
            return null;
          }
        }), finalize(() => {
          this.saving = false;
        }))
    }
  }

  ngOnInit(): void {
    this.rfDataModal = this.fb.group({
      id: [0],
      stt: [undefined, [Validators.required]],
      loaiMa: ['', [Validators.required]],
      ma: ['', [Validators.required]],
      ngayCap: [undefined, [Validators.required]],
      ngayHetHan: [undefined, [Validators.required]],
      namNoPhi: [undefined, [Validators.required]],
      tongNoPhi: [undefined, [Validators.required]],
      isActive: [true],
    });
    // public int DoanhNghiepId { get; set; }
    // public string Ma { get; set; }
    // public int STT { get; set; }
    // public string LoaiMa { get; set; }
    // public bool IsActive { get; set; }
    // public DateTime? NgayCap { get; set; }
    // public DateTime? NgayHetHan { get; set; }
    // public int NamNoPhi { get; set; }
    // public decimal TongNoPhi { get; set; }
    if (this.dataItem)
      this.rfDataModal.patchValue(this.dataItem);
  }

  save(): void {
    FormHelper.getInstance().checkValid(this.rfDataModal, () => {
      this.createOrUpdate(this.rfDataModal.value).subscribe(res => {
        if (res) {
          this.success(res)
        }
      })
    })
  }


}
