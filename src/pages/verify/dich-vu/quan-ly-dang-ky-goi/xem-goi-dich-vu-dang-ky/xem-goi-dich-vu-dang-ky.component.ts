import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from "@node_modules/ng-zorro-antd/modal";
import {
  CHIET_KHAU_THEO,
  DichVuDoanhNghiepDkByIdOutputDto,
  GoiDichVuDnDangKyOutputDto,
  LOAI_DANG_KY_GOI_DICH_VU,
  QuanLyGoiDichVuDnDangKyServiceProxy,
  TRANG_THAI_DANG_KY_GOI_DICH_VU,
  YeuCauDoanhNghiepLamHoSoInpudto
} from "@service-proxies/verify-service-proxies";
import {OfSchemaModel} from "@node_modules/@orendaco/of";
import {QuanLyDangKyGoiService} from "../quan-ly-dang-ky-goi.service";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-xem-goi-dich-vu-dang-ky',
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

  modalSchema: OfSchemaModel<any>;

  constructor(private modalRef: NzModalRef,
              private fbService: QuanLyDangKyGoiService,
              private fb: FormBuilder,
              private qldkService: QuanLyGoiDichVuDnDangKyServiceProxy
  ) {

  }

  ngOnInit(): void {
    this.modalSchema = this.fbService.builderYeuCauLapHS(this.dataItem.loaiDangKy === LOAI_DANG_KY_GOI_DICH_VU.YeuCauTuVan ? undefined : this.dataItem.loaiDangKy);
    this.qldkService.getAllDichVuDoanhNghiepDkById(this.dataItem.goiDichVuDnId)
      .subscribe(res => {
        this.listDichVu = res;
      })
  }

  close() {
    this.modalRef.destroy();
  }


  tuChoi() {

    this.qldkService.tuChoiPheDuyet(this.dataItem.goiDichVuDnId).subscribe(res => {
      abp.notify.success("Xử lý thành công");
      this.modalRef.destroy(true);
    })
  }

  yeuCauLapHoSo() {
    const data = this.modalSchema.onSubmit();
    if (data === null) {
      abp.notify.error('invalid');
      return;
    }
    const val = this.modalSchema.value;
    this.qldkService.yeuCauDoanhNghiepLamHoSo(new YeuCauDoanhNghiepLamHoSoInpudto({
      goiDichVuDnDkId: this.dataItem.goiDichVuDnId,
      doanhNghiepId: val.doanhNghiepId,
      loaiDangKy: val.loaiDangKy
    }))
      .subscribe(res => {
        abp.notify.success("Xử lý thành công");
        this.modalRef.destroy(true);
      })
  }
}
