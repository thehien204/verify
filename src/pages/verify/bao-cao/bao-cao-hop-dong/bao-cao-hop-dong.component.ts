import { Component, Injector, OnInit } from '@angular/core';
import { AppOrdCoComponentBase } from '@app-ordco/utils/app-ordco-component-base';
import { BaoCaoHopDongExportInputDto, BaoCaoServiceProxy } from '@service-proxies/verify-service-proxies';
import { BaoCaoHopDongService } from './bao-cao-hop-dong.service';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { OrdUploadDownloadServiceProxies } from '@service-proxies/ord-upload-download.service';

@Component({
  selector: 'app-bao-cao-hop-dong',
  templateUrl: './bao-cao-hop-dong.component.html',
  styles: [
  ]
})
export class BaoCaoHopDongComponent extends AppOrdCoComponentBase implements OnInit {
  searchSchema = this.fbService.buiderSearch();
  getList = (searchInput) => {
    return this.baoCaoService.getAllBaoCaoHopDongPaging(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  }
  constructor(private injector: Injector,
    private fbService: BaoCaoHopDongService,
    private baoCaoService: BaoCaoServiceProxy,
    private ordUploadDownloadService: OrdUploadDownloadServiceProxies) {
    super(injector);
   }

  ngOnInit(): void {
  }
  onDownloadExcel() {
    let input = new BaoCaoHopDongExportInputDto({
      tuNgay: moment(this.searchSchema.value.executionTimeRange.tuNgay) ,
      denNgay: moment(this.searchSchema.value.executionTimeRange.denNgay)
    });
    abp.ui.setBusy();
    const fileDownloadName = this.ordUploadDownloadService.createFileDownloadNameWithTimeStamp('bao-cao-hop-dong', '.xlsx');
    this.ordUploadDownloadService.getDownloadFileByInput(input, '/api/app/bao-cao/export-bao-cao-hop-dong').subscribe(
      data => {
        this.ordUploadDownloadService.handlerSubscribedDownloadFile(data, fileDownloadName);
        abp.ui.clearBusy();
      });
  }
}
