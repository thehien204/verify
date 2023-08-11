import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {DisplayPipeDataService} from '@app-ordco/display-text-pipe/display-pipe-data.service';
import {ComboBoxDataServiceProxy} from '@service-proxies/verify-service-proxies';

@Pipe({
  name: 'loaiDonViTinhDichVuDisplayText'
})
export class LoaiDonViTinhDichVuPipe implements PipeTransform {

  constructor(private dataService: DisplayPipeDataService,
              private proxy: ComboBoxDataServiceProxy) {
  }

  transform(value: string | number): Observable<string> {
    const typeName = 'loaiDonViDichVu';
    this.dataService.getDataOptions(this.proxy.loaiDonViTinh(), typeName);
    return this.dataService.getDisplayTextForPipe(this.dataService.data$(typeName), value);
  }
}
