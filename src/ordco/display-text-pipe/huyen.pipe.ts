import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {DisplayPipeDataService} from '@app-ordco/display-text-pipe/display-pipe-data.service';
import {OCoreUtilityService} from '@orendaco/of';
import {of} from '@node_modules/rxjs';
import {ComboBoxDataServiceProxy} from '@service-proxies/verify-service-proxies';

@Pipe({
  name: 'huyenDisplayText'
})
export class HuyenPipe implements PipeTransform {
  constructor(private dataService: DisplayPipeDataService,
              private proxy: ComboBoxDataServiceProxy) {
  }

  transform(value: string | number, maTinh: string): Observable<string> {
    if (OCoreUtilityService.isNullOrEmpty(value)) {
      return of('');
    }
    this.dataService.getDataOptions(this.proxy.huyen(maTinh), 'huyenByTinh', maTinh);
    return this.dataService.getDisplayTextForPipe(this.dataService.data$('huyenByTinh', maTinh), value);
  }
}

