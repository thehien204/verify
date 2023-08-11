import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {DisplayPipeDataService} from '@app-ordco/display-text-pipe/display-pipe-data.service';
import {ComboBoxDataServiceProxy} from '@service-proxies/verify-service-proxies';

@Pipe({
  name: 'nhomDichVuDisplayText'
})
export class NhomDichVuPipe implements PipeTransform {

  constructor(private dataService: DisplayPipeDataService,
              private proxy: ComboBoxDataServiceProxy) {
  }

  transform(value: string | number): Observable<string> {
    const namePipe = 'nhomDichVu';
    this.dataService.getDataOptions(this.proxy.nhomDichVu(), namePipe);
    return this.dataService.getDisplayTextForPipe(this.dataService.data$(namePipe), value);
  }
}
