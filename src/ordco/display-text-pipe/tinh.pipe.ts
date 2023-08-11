import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {DisplayPipeDataService} from '@app-ordco/display-text-pipe/display-pipe-data.service';
import {ComboBoxDataServiceProxy} from '@service-proxies/verify-service-proxies';

@Pipe({
  name: 'tinhDisplayText'
})
export class TinhPipe implements PipeTransform {

  constructor(private dataService: DisplayPipeDataService,
              private proxy: ComboBoxDataServiceProxy) {
  }

  transform(value: string | number): Observable<string> {
    this.dataService.getDataOptions(this.proxy.tinh(), 'tinh');
    return this.dataService.getDisplayTextForPipe(this.dataService.data$('tinh'), value);
  }
}
