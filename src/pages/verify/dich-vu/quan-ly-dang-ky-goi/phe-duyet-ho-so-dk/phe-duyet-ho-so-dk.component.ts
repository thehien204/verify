import {Component, Input, OnInit} from '@angular/core';
import {
  CHIET_KHAU_THEO,
  DichVuDoanhNghiepDkByIdOutputDto,
  GoiDichVuDnDangKyOutputDto,
  HopDongGoiDvDoanhNghiep_TepDinhKemDto,
  HopDongGoiDvDoanhNghiepDto,
  HopDongGoiDvDoanhNghiepServiceProxy,
  LOAI_DANG_KY_GOI_DICH_VU,
  QuanLyGoiDichVuDnDangKyServiceProxy,
  TRANG_THAI_DANG_KY_GOI_DICH_VU,
  PheDuyetGoiDichVuDnDangKyInputDto, YeuCauDnLamLaiHoSoInputDto
} from "@service-proxies/verify-service-proxies";
import {NzDrawerRef} from "@node_modules/ng-zorro-antd/drawer";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as _ from 'lodash'
import FormHelper from 'src/shared/helpers/formHelper';
import * as moment from "@node_modules/moment";
import {ISelectOption} from "@app-ordco/ora-select/model";
import {DestroyRxjsService} from "@node_modules/@orendaco/of";
import {takeUntil} from "@node_modules/rxjs/internal/operators";

@Component({
  templateUrl: './phe-duyet-ho-so-dk.component.html',
  providers: [DestroyRxjsService],
  styles: [
    `
      ::ng-deep {
        .ant-descriptions-item-label {
          font-weight: bold;
        }
      }
    `
  ]
})
export class PheDuyetHoSoDkComponent implements OnInit {
  @Input() dataItem: GoiDichVuDnDangKyOutputDto;
  listDichVu: DichVuDoanhNghiepDkByIdOutputDto[] = [];
  chietKhauEnum = CHIET_KHAU_THEO;
  loaiDkEnum = LOAI_DANG_KY_GOI_DICH_VU;
  trangThaiEnum = TRANG_THAI_DANG_KY_GOI_DICH_VU;
  rfFormGroup: FormGroup;
  rfFormGroupPheDuyet: FormGroup;
  private cruHopDong = (input: HopDongGoiDvDoanhNghiepDto) => {
    if (this.dataItem.hopDongGoiDvDoanhNghiepId) {
      return this.hopDongGoiDvService.update(input)
    } else {
      return this.hopDongGoiDvService.create(input)
    }
  }
  sourceTrueFalse: ISelectOption[] = [
    {value: true, displayText: "Phê duyệt"},
    {value: false, displayText: "Yêu cầu làm lại hồ sơ"},
  ]

  constructor(
    private drawerRef: NzDrawerRef,
    private qldkService: QuanLyGoiDichVuDnDangKyServiceProxy,
    private hopDongGoiDvService: HopDongGoiDvDoanhNghiepServiceProxy,
    private $destroy: DestroyRxjsService,
    private fb: FormBuilder,
  ) {
    this.rfFormGroup = this.fb.group({
      id: [0],
      maSoThue: [undefined, Validators.required],
      tenDoanhNghiep: [undefined, Validators.required],
      diaChi: [undefined],
      emailNhanHoaDon: [undefined, [Validators.required, Validators.email]],
      tepDinhKem: this.fb.array([])
    })
    this.rfFormGroupPheDuyet = this.fb.group({
      isDongY: [true],
      ngayDuyet: [moment(), [Validators.required]],
      lyDoTuChoi: []
    });
    this.rfFormGroupPheDuyet.get('isDongY').valueChanges.pipe(takeUntil(this.$destroy))
      .subscribe(res => {
        if (res) {
          FormHelper.getInstance().updateValidators(this.rfFormGroupPheDuyet.get('ngayDuyet') as FormControl, [Validators.required]);
          FormHelper.getInstance().updateValidators(this.rfFormGroupPheDuyet.get('lyDoTuChoi') as FormControl, []);
        } else {
          FormHelper.getInstance().updateValidators(this.rfFormGroupPheDuyet.get('lyDoTuChoi') as FormControl, [Validators.required]);
          FormHelper.getInstance().updateValidators(this.rfFormGroupPheDuyet.get('ngayDuyet') as FormControl, []);
        }
      })
  }

  get rfArrTepDinhKem(): FormArray {
    return this.rfFormGroup.get('tepDinhKem') as FormArray
  }

  ngOnInit(): void {
    this.qldkService.getAllDichVuDoanhNghiepDkById(this.dataItem.goiDichVuDnId)
      .subscribe(res => {
        this.listDichVu = res;
      });
    if (this.dataItem.hopDongGoiDvDoanhNghiepId) {
      this.hopDongGoiDvService.getById(this.dataItem.hopDongGoiDvDoanhNghiepId)
        .subscribe(res => {
          this.rfFormGroup.patchValue(res);
          _.forEach(res.listTaiLieuDinhKem, data => {
            this.rfArrTepDinhKem.push(this.fb.group({
              id: data.id,
              tenTaiLieu: data.tenTaiLieu,
              documentIds: [[data.documentId]]
            }))
          })
          FormHelper.getInstance().setDisable(this.rfFormGroup);
        })
    } else {
      this.rfFormGroup.patchValue({
        maSoThue: this.dataItem.maSoThue,
        tenDoanhNghiep: this.dataItem.tenDoanhNghiep,
        emailNhanHoaDon: this.dataItem.email,
        diaChi: this.dataItem.diaChi,
      });
      FormHelper.getInstance().setDisable(this.rfFormGroup);
    }
  }

  close() {
    this.drawerRef.close()
  }

  xuLy() {
    if (this.rfFormGroupPheDuyet.get('isDongY').value) {
      FormHelper.getInstance().checkValid(this.rfFormGroupPheDuyet, (res) => {
        this.qldkService.pheDuyetGoiDichVuDnDangKy(new PheDuyetGoiDichVuDnDangKyInputDto({
          goiDichVuDnDkId: this.dataItem.goiDichVuDnId,
          ngayHieuLuc: res.ngayHieuLuc,
        })).subscribe(res => {
          abp.notify.success("Xử lý thành công");
          this.drawerRef.close(true)
        })
      })
    } else {
      FormHelper.getInstance().checkValid(this.rfFormGroupPheDuyet, (res) => {
        this.qldkService.yeuCauDnLamLaiHoSo(new YeuCauDnLamLaiHoSoInputDto({
          goiDichVuDnDkId: this.dataItem.goiDichVuDnId,
          lyDoTuChoi: res.lyDoTuChoi
        })).subscribe(res => {
          abp.notify.success("Xử lý thành công");
          this.drawerRef.close(true)
        })
      })
    }
  }

  tuChoi() {

    this.qldkService.tuChoiPheDuyet(this.dataItem.goiDichVuDnId).subscribe(res => {
      abp.notify.success("Xử lý thành công");
      this.drawerRef.close()
    })
  }

  guiHopDong() {
    FormHelper.getInstance().checkValid(this.rfFormGroup, (res) => {
      const input = new HopDongGoiDvDoanhNghiepDto(res);
      input.goiDichVuDnId = this.dataItem.goiDichVuDnId;
      input.listTaiLieuDinhKem = (res.tepDinhKem as any[]).map(item => {
        const docId = item.documentIds[0];
        const isNumber = _.isNumber(docId)
        return new HopDongGoiDvDoanhNghiep_TepDinhKemDto({
          documentId: isNumber ? parseInt(docId) : undefined,
          documentCacheId: isNumber ? undefined : docId,
          hopDongGoiDvDoanhNghiepId: this.dataItem.hopDongGoiDvDoanhNghiepId,
          tenTaiLieu: item.tenTaiLieu,
          id: item.id ?? 0
        })
      })
      this.cruHopDong(input).subscribe(res => {
        abp.notify.success("Xử lý thành công");
        this.drawerRef.close(true);
      })
    })

    // this.hopDongGoiDvService.
  }


  onUploadOneFileSuccess($event: string) {
    this.rfArrTepDinhKem.push(this.fb.group({
      id: 0,
      tenTaiLieu: [undefined, Validators.required],
      documentIds: [[$event]]
    }))
  }

  removeRow(i: number) {
    this.rfArrTepDinhKem.removeAt(i);
  }
}
