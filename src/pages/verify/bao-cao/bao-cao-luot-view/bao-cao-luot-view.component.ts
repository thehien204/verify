import { Component, Injector, OnInit } from '@angular/core';
import { AppOrdCoComponentBase } from '@app-ordco/utils/app-ordco-component-base';
import {DestroyRxjsService, OCoreUtilityService, OfSchemaModel} from "@node_modules/@orendaco/of";
import { BaoCaoLuotViewExportInputDto, BaoCaoServiceProxy } from '@service-proxies/verify-service-proxies';
import { finalize } from 'rxjs/operators';
import { BaoCaoLuotViewService } from './bao-cao-luot-view.service';
import { OrdUploadDownloadServiceProxies } from '@service-proxies/ord-upload-download.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bao-cao-luot-view',
  templateUrl: './bao-cao-luot-view.component.html',
  styles: [],
  providers: [DestroyRxjsService]
})
export class BaoCaoLuotViewComponent extends AppOrdCoComponentBase implements OnInit {
  searchSchema = this.fbService.buiderSearch();
  getList = (searchInput) => {
    return this.baoCaoService.getAllBaoCaoLuotViewPaging(searchInput).pipe(finalize(() => {
      this.loading = false;
    }))
  }
  constructor(private injector: Injector,
    private fbService: BaoCaoLuotViewService,
    private baoCaoService: BaoCaoServiceProxy,
    private ordUploadDownloadService: OrdUploadDownloadServiceProxies) {
    super(injector);
   }

  ngOnInit(): void {
  }
  onDownloadExcel() {
    let input = new BaoCaoLuotViewExportInputDto({
      tuNgay: moment(this.searchSchema.value.executionTimeRange.tuNgay) ,
      denNgay: moment(this.searchSchema.value.executionTimeRange.denNgay)
    });
    abp.ui.setBusy();
    const fileDownloadName = this.ordUploadDownloadService.createFileDownloadNameWithTimeStamp('bao-cao-luot-view', '.xlsx');
    this.ordUploadDownloadService.getDownloadFileByInput(input, '/api/app/bao-cao/export-bao-cao-luot-view').subscribe(
      data => {
        this.ordUploadDownloadService.handlerSubscribedDownloadFile(data, fileDownloadName);
        abp.ui.clearBusy();
      });
  }
}
