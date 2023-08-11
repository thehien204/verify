import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {DisplayPipeDataService} from '@app-ordco/display-text-pipe/display-pipe-data.service';
import {OCoreUtilityService} from '@orendaco/of';
import {of} from '@node_modules/rxjs';
import {ComboBoxDataServiceProxy} from '@service-proxies/verify-service-proxies';

@Pipe({
  name: 'xaDisplayText'
})
export class XaPipe implements PipeTransform {
  constructor(private dataService: DisplayPipeDataService,
              private proxy: ComboBoxDataServiceProxy) {
  }

  transform(value: string | number, maHuyen: string): Observable<string> {
    if (OCoreUtilityService.isNullOrEmpty(value)) {
      return of('');
    }
    this.dataService.getDataOptions(this.proxy.xa(maHuyen), 'xaByHuyen', maHuyen);
    return this.dataService.getDisplayTextForPipe(this.dataService.data$('xaByHuyen', maHuyen), value);
  }
}

