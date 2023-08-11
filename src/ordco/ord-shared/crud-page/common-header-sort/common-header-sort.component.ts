import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {OfSchemaModel} from '@orendaco/of';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-common-header-sort',
  templateUrl: './common-header-sort.component.html',
  styles: [
    `
      .sort-column {
        cursor: pointer;
        position: relative;
      }
    `,
    `.icon-sort {
      margin-left: 10px;
     /* position: absolute;*/
     /* right: 0;*/
     /* top: 50%;*/
     /* transform: translateY(-50%);*/
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonHeaderSortComponent {
  @Input() headerText: string;
  @Input() field: string;
  @Input() searchSchema: OfSchemaModel;
  @Input() loading = false;
  @Output() sortEvent = new EventEmitter();
  orderBy = 0;

  constructor(private cdr: ChangeDetectorRef) {
  }

  onClickSortFn() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.orderBy = this.orderBy + 1;
    if (this.orderBy > 2) {
      this.orderBy = 0;
    }
    let sorting = null;
    if (this.orderBy === 1) {
      sorting = this.field + ' asc';
    }
    if (this.orderBy === 2) {
      sorting = this.field + ' desc';
    }
    this.searchSchema.patchValue({
      sorting: sorting,
    });
    this.sortEvent.emit(sorting);
    setTimeout(() => {
      this.searchSchema.search();
    }, 200);
    this.searchSchema.getDataTableFinalize$.pipe(take(1))
      .subscribe(d => {
        this.loading = false;
        this.cdr.markForCheck();
      });
  }
}
