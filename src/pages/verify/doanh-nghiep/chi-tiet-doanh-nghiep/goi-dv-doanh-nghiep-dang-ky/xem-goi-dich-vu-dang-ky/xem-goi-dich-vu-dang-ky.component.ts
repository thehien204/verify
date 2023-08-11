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
  TRANG_THAI_DANG_KY_GOI_DICH_VU, TRANG_THAI_YEU_CAU_DN_LAM_HS
} from "@service-proxies/verify-service-proxies";
import {XemGoiDichVuDangKyService} from "../xem-goi-dich-vu-dang-ky.service";
import {NzDrawerRef} from "@node_modules/ng-zorro-antd/drawer";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import FormHelper from "../../../../../../shared/helpers/formHelper";
import * as _ from 'lodash'

@Component({
  templateUrl: './xem-goi-dich-vu-dang-ky.component.html',
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
export class XemGoiDichVuDangKyComponent implements OnInit {
  @Input() dataItem: GoiDichVuDnDangKyOutputDto;
  listDichVu: DichVuDoanhNghiepDkByIdOutputDto[] = [];
  chietKhauEnum = CHIET_KHAU_THEO;
  loaiDkEnum = LOAI_DANG_KY_GOI_DICH_VU;
  trangThaiEnum = TRANG_THAI_DANG_KY_GOI_DICH_VU;
  trangThaiHdEnum = TRANG_THAI_YEU_CAU_DN_LAM_HS;
  rfFormGroup: FormGroup;
  private cruHopDong = (input: HopDongGoiDvDoanhNghiepDto) => {
    if (this.dataItem.hopDongGoiDvDoanhNghiepId) {
      return this.hopDongGoiDvService.update(input)
    } else {
      return this.hopDongGoiDvService.create(input)
    }
  }

  get isDisableFormDk(): boolean {
    return !(this.dataItem.trangThai === TRANG_THAI_DANG_KY_GOI_DICH_VU.YeuCauDnLamHoSo);
  }

  rfFormFileAll = new FormControl();

  constructor(
    private drawerRef: NzDrawerRef,
    private fbService: XemGoiDichVuDangKyService,
    private qldkService: QuanLyGoiDichVuDnDangKyServiceProxy,
    private hopDongGoiDvService: HopDongGoiDvDoanhNghiepServiceProxy,
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
            }));
          });
          FormHelper.getInstance().setDisable(this.rfFormGroup, this.isDisableFormDk);
        })
    } else {
      this.rfFormGroup.patchValue({
        maSoThue: this.dataItem.maSoThue,
        tenDoanhNghiep: this.dataItem.tenDoanhNghiep,
        emailNhanHoaDon: this.dataItem.email,
        diaChi: this.dataItem.diaChi,
      });
      FormHelper.getInstance().setDisable(this.rfFormGroup, this.isDisableFormDk);
    }
  }

  close() {
    this.drawerRef.close()
  }

  xuLy() {

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
