import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DoanhNghiepDto, DoanhNghiepServiceProxy} from "@service-proxies/verify-service-proxies";
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbQuanLyDoanhNghiepService} from "../../quan-ly-doanh-nghiep/fb-quan-ly-doanh-nghiep.service";
import {Router} from "@node_modules/@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {CapNhatGcpModalComponent} from "./cap-nhat-gcp-modal/cap-nhat-gcp-modal.component";

@Component({
  selector: 'app-thong-tin-co-ban-dn',
  templateUrl: './thong-tin-co-ban-dn.component.html',
  styles: []
})
export class ThongTinCoBanDnComponent extends AppOrdCoComponentBase implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;
  proxyServices = this.builderCommonCrudProxyService('app/doanh-nghiep');

  constructor(private injector: Injector,
              private fbService: FbQuanLyDoanhNghiepService,
              private doanhNghiepSP: DoanhNghiepServiceProxy,
              private modalService: NzModalService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
    super(injector);
  }

  ngOnInit(): void {
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'doanh nghiệp',
      id: record?.id,
      editDto: record,
      nzModalOptions: {
        nzWidth: '1000px'
      },
      callBackSavedSuccess: () => {
        this.doanhNghiepSP.getById(this.doanhNghiepModeDto.id).subscribe(d => {
          this.doanhNghiepModeDto = d;
          this.cdr.markForCheck();
        })
      },
      type: 'modal',
      entitySchema: this.fbService.builderEntity(),
      proxyServices: this.proxyServices
    });
  }

  capNhatGCPDoanhNghiep(doanhNghiepModeDto: DoanhNghiepDto) {
    this.modalService.create<CapNhatGcpModalComponent>(
      {
        nzContent: CapNhatGcpModalComponent,
        nzTitle: "Cập nhật GCP doanh nghiệp",
        nzFooter: null,
        nzComponentParams: {
          doanhNghiepId: doanhNghiepModeDto.id
        }
      }
    ).afterClose.subscribe(res => {

    })
  }

  capNhatMaDiaDiemToanCau(doanhNghiepModeDto: DoanhNghiepDto) {
    this.router.navigate(['/doanh-nghiep/ma-dia-diem', doanhNghiepModeDto.id]);
  }
}
