import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ComboBoxDto, DoanhNghiepDto, DoanhNghiepServiceProxy} from "@service-proxies/verify-service-proxies";
import {DisplayPipeDataService} from "@app-ordco/display-text-pipe/display-pipe-data.service";
import {map, takeUntil} from "@node_modules/rxjs/internal/operators";
import {DestroyRxjsService} from "@node_modules/@orendaco/of";

@Component({
  selector: 'app-doanh-nghiep-cell',
  templateUrl: './doanh-nghiep-cell.component.html',
  providers: [DestroyRxjsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoanhNghiepCellComponent{
  _doanhNgiepId: number;
  doanhNghiepDto: DoanhNghiepDto;

  get doanhNghiepId(): number {
    return this._doanhNgiepId;
  }

  @Input() set doanhNghiepId(value: number) {
    this._doanhNgiepId = value;
    if (value) {
      this.getDoanhNghiep(value);
    }

  }

  constructor(private doanhNghiepSP: DoanhNghiepServiceProxy,
              private dataService: DisplayPipeDataService,
              private cdr: ChangeDetectorRef,
              private destroy$: DestroyRxjsService) {
  }

  getDoanhNghiep(value: number) {
    const key = "app-doanh-nghiep-cell-" + value;
    this.dataService.getDataOptionsNotCache(this.doanhNghiepSP.getDisplayCell(value).pipe(map(d => {
      return [{
        value: d.id + '',
        displayText: d.ten,
        data: d
      }] as ComboBoxDto[];
    })), key);
    setTimeout(() => {
      this.dataService.data$(key)
        .pipe(takeUntil(this.destroy$))
        .subscribe(lst => {
          if (lst) {
            this.doanhNghiepDto = lst[0]?.data;
            this.cdr.detectChanges();
          }
        });
    }, 100);
  }

}
