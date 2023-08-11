import {Component, Inject, Injector, OnInit, Input} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {XemGoiDichVuDangKyService} from "./xem-goi-dich-vu-dang-ky.service";
import {
  DoanhNghiepDto,
  GoiDichVuDnDangKyOutputDto,
  QuanLyGoiDichVuDnDangKyServiceProxy,
  TRANG_THAI_DANG_KY_GOI_DICH_VU
} from "@service-proxies/verify-service-proxies";
import {finalize} from "@node_modules/rxjs/operators";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {XemGoiDichVuDangKyComponent} from "./xem-goi-dich-vu-dang-ky/xem-goi-dich-vu-dang-ky.component";
import {NzDrawerService} from "@node_modules/ng-zorro-antd/drawer";

@Component({
  selector: 'goi-dv-doanh-nghiep-dang-ky',
  templateUrl: './goi-dv-doanh-nghiep-dang-ky.component.html',
  styles: [`
    .text-cho-duyet {
      color: #009EF7;
      font-weight: bold;
    }
  `]
})
export class GoiDvDoanhNghiepDangKyComponent extends AppOrdCoComponentBase implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;
  searchSchema = this.fbService.builderSearch();
  getList = (searchInput) => {
    searchInput.doanhNghiepId = this.doanhNghiepModeDto.id;
    return this.qldkService.getAllGoiDichVuPaging(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  };
  trangThaiEnum = TRANG_THAI_DANG_KY_GOI_DICH_VU;

  constructor(private injector: Injector,
              private fbService: XemGoiDichVuDangKyService,
              private qldkService: QuanLyGoiDichVuDnDangKyServiceProxy,
              private modalService: NzModalService,
              private drawerService: NzDrawerService
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  xemChiTiet(record: GoiDichVuDnDangKyOutputDto) {
    this.drawerService.create<XemGoiDichVuDangKyComponent>({
      nzContent: XemGoiDichVuDangKyComponent,
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

  delete(record) {

  }
}
