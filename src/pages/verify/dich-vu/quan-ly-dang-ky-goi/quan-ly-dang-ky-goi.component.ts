import {Component, Injector, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {QuanLyDangKyGoiService} from "./quan-ly-dang-ky-goi.service";
import {
  GoiDichVuDnDangKyOutputDto,
  QuanLyGoiDichVuDnDangKyServiceProxy,
  SysAuditLogServiceProxy,
  TRANG_THAI_DANG_KY_GOI_DICH_VU,
  TRANG_THAI_YEU_CAU_DN_LAM_HS,
  _definitions_TINH_NANG_HE_THONG
} from "@service-proxies/verify-service-proxies";
import {finalize} from "@node_modules/rxjs/operators";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {XemGoiDichVuDangKyComponent} from "./xem-goi-dich-vu-dang-ky/xem-goi-dich-vu-dang-ky.component";
import {NzDrawerService} from "@node_modules/ng-zorro-antd/drawer";
import {PheDuyetHoSoDkComponent} from "./phe-duyet-ho-so-dk/phe-duyet-ho-so-dk.component";

@Component({
  selector: 'app-quan-ly-dang-ky-goi',
  templateUrl: './quan-ly-dang-ky-goi.component.html',
  styles: [`
    .text-cho-duyet {
      color: #009EF7;
      font-weight: bold;
    }
  `]
})
export class QuanLyDangKyGoiComponent extends AppOrdCoComponentBase implements OnInit {
  searchSchema = this.fbService.builderSearch();
  getList = (searchInput) => {
    return this.qldkService.getAllGoiDichVuPaging(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  };
  trangThaiEnum = TRANG_THAI_DANG_KY_GOI_DICH_VU;
  trangThaiHdDnEnum = TRANG_THAI_YEU_CAU_DN_LAM_HS;

  constructor(private injector: Injector,
              private fbService: QuanLyDangKyGoiService,
              private drawerService: NzDrawerService,
              private qldkService: QuanLyGoiDichVuDnDangKyServiceProxy,
              private modalService: NzModalService,
              private sysAuditLogService: SysAuditLogServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.QuanLyDangKyGoiDichVu).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.QuanLyDangKyGoiDichVu);
    })
  }

  xemChiTiet(record: GoiDichVuDnDangKyOutputDto) {
    if (record.trangThai === TRANG_THAI_DANG_KY_GOI_DICH_VU.ChoDuyet || record.trangThai === TRANG_THAI_DANG_KY_GOI_DICH_VU.TuChoi) {
      const modal = this.modalService.create<XemGoiDichVuDangKyComponent>({
          nzTitle: "Xem gói dịch vụ đăng ký",
          nzContent: XemGoiDichVuDangKyComponent,
          nzComponentParams: {
            dataItem: record
          },
          nzFooter: null,
        }
      );
      modal.afterClose.subscribe(res => {
        if (res) {
          this.searchSchema.reloadDataTable();
        }
      })
    } else {
      this.drawerService.create({
        nzContent: PheDuyetHoSoDkComponent,
        nzTitle: "Xem gói dịch vụ đăng ký",
        nzContentParams: {
          dataItem: record
        },
        nzWidth: "100%"
      }).afterClose.subscribe(res => {
        if (res) {
          this.searchSchema.reloadDataTable();
        }
      })
    }

  }

  delete(record) {

  }
}
