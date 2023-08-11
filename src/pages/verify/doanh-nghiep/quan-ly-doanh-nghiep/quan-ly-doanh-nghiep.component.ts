import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbQuanLyDoanhNghiepService} from "./fb-quan-ly-doanh-nghiep.service";
import {DoanhNghiepDto, SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG} from "@service-proxies/verify-service-proxies";
import {Router} from "@node_modules/@angular/router";

@Component({
  selector: 'app-quan-ly-doanh-nghiep',
  templateUrl: './quan-ly-doanh-nghiep.component.html',
  styles: [`.thong-tin-dn {
    cursor: pointer !important;
  }`]
})
export class QuanLyDoanhNghiepComponent extends AppOrdCoComponentBase implements OnInit {

  proxyServices = this.builderCommonCrudProxyService('app/doanh-nghiep');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbQuanLyDoanhNghiepService,
              private router: Router,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }
  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.DanhSachDoanhNghiep).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.DanhSachDoanhNghiep);
    })
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'doanh nghiệp',
      id: record?.id,
      editDto: record,
      nzModalOptions: {
        nzWidth: '1000px'
      },
      nzDrawerOptions: {
        nzWidth: '100vw',
        nzHeight: '100vh'
      },
      callBackSavedSuccess: () => {
        setTimeout(() => {
          this.searchSchema.reloadDataTable();
        });
      },
      type: 'modal',
      entitySchema: this.fbService.builderEntity(),
      proxyServices: this.proxyServices
    });
  }

  openViewModal(record) {
    const url = '/doanh-nghiep/chi-tiet/' + record.id;
    this.router.navigateByUrl(url);
  }

  delete(record: DoanhNghiepDto): void {
    this.crudService.removeById({
      name: `Doanh nghiệp "${record.ten}"`,
      proxyServices: this.proxyServices,
      id: '' + record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  goToDetail(record: DoanhNghiepDto) {
    const url = '/doanh-nghiep/chi-tiet/' + record.id;
    this.router.navigateByUrl(url);
  }
}
