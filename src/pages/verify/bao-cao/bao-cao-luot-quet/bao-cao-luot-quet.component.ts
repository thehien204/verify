import { Component, Injector, OnInit } from '@angular/core';
import { AppOrdCoComponentBase } from '@app-ordco/utils/app-ordco-component-base';
import { DestroyRxjsService } from '@orendaco/of';
import { BaoCaoLuotQuetExportInputDto, BaoCaoServiceProxy } from '@service-proxies/verify-service-proxies';
import { finalize } from 'rxjs/operators';
import { BaoCaoLuotQuetService } from './bao-cao-luot-quet.service';
import * as moment from 'moment';
import { OrdUploadDownloadServiceProxies } from '@service-proxies/ord-upload-download.service';

@Component({
  selector: 'app-bao-cao-luot-quet',
  templateUrl: './bao-cao-luot-quet.component.html',
  styles: [
  ],
  providers: [DestroyRxjsService]
})
export class BaoCaoLuotQuetComponent extends AppOrdCoComponentBase implements OnInit {
  searchSchema = this.fbService.buiderSearch();
  getList = (searchInput) => {
    return this.baoCaoService.getAllBaoCaoLuotQuetPaging(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  }
  constructor(private injector: Injector,
    private fbService: BaoCaoLuotQuetService,
    private baoCaoService: BaoCaoServiceProxy,
    private ordUploadDownloadService: OrdUploadDownloadServiceProxies) {
    super(injector);
   }

  ngOnInit(): void {
  }
  onDownloadExcel() {
    let input = new BaoCaoLuotQuetExportInputDto({
      tuNgay: moment(this.searchSchema.value.executionTimeRange.tuNgay) ,
      denNgay: moment(this.searchSchema.value.executionTimeRange.denNgay)
    });
    abp.ui.setBusy();
    const fileDownloadName = this.ordUploadDownloadService.createFileDownloadNameWithTimeStamp('bao-cao-luot-quet', '.xlsx');
    this.ordUploadDownloadService.getDownloadFileByInput(input, '/api/app/bao-cao/export-bao-cao-luot-quet').subscribe(
      data => {
        this.ordUploadDownloadService.handlerSubscribedDownloadFile(data, fileDownloadName);
        abp.ui.clearBusy();
      });
  }
}
