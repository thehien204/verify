import { Component, Injector, OnInit } from '@angular/core';
import { AppOrdCoComponentBase } from '@app-ordco/utils/app-ordco-component-base';
import { BaoCaoServiceProxy, BaoCaoTaiKhoanExportInputDto } from '@service-proxies/verify-service-proxies';
import { finalize } from 'rxjs/operators';
import { BaoCaoTaiKhoanService } from './bao-cao-tai-khoan.service';
import * as moment from 'moment';
import { OrdUploadDownloadServiceProxies } from '@service-proxies/ord-upload-download.service';

@Component({
  selector: 'app-bao-cao-tai-khoan',
  templateUrl: './bao-cao-tai-khoan.component.html',
  styles: [
  ]
})
export class BaoCaoTaiKhoanComponent extends AppOrdCoComponentBase implements OnInit {
  searchSchema = this.fbService.buiderSearch();
  getList = (searchInput) => {
    return this.baoCaoService.getAllBaoCaoTaiKhoanPaging(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  }
  constructor(private injector: Injector,
    private fbService: BaoCaoTaiKhoanService,
    private baoCaoService: BaoCaoServiceProxy,
    private ordUploadDownloadService: OrdUploadDownloadServiceProxies) {
    super(injector);
   }

  ngOnInit(): void {
  }
  onDownloadExcel() {
    let input = new BaoCaoTaiKhoanExportInputDto({
      tuNgay: moment(this.searchSchema.value.executionTimeRange.tuNgay) ,
      denNgay: moment(this.searchSchema.value.executionTimeRange.denNgay)
    });
    abp.ui.setBusy();
    const fileDownloadName = this.ordUploadDownloadService.createFileDownloadNameWithTimeStamp('bao-cao-tai-khoan', '.xlsx');
    this.ordUploadDownloadService.getDownloadFileByInput(input, '/api/app/bao-cao/export-bao-cao-tai-khoan').subscribe(
      data => {
        this.ordUploadDownloadService.handlerSubscribedDownloadFile(data, fileDownloadName);
        abp.ui.clearBusy();
      });
  }
}
