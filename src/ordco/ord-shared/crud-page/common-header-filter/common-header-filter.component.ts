import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {OfSchemaModel} from '@orendaco/of';
import {InputNumber} from '@node_modules/ng-zorro-antd/core/util';
import * as _ from 'lodash';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OCoreUtilityService} from '@node_modules/@orendaco/of';

@Component({
  selector: 'app-common-header-filter',
  templateUrl: './common-header-filter.component.html',
  styles: [
    `.ord-filter {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      min-width: 26px;
      width: 26px;
      height: 26px;
      padding: 0;
    }`,
    `.fas {
      font-size: 12px !important;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonHeaderFilterComponent implements OnInit, AfterViewInit {
  @Input() searchSchema: OfSchemaModel;
  @Input() fields = [];
  @Input() @InputNumber() width = 300;
  @Input() dropDownTrigger: string = 'click';
  @Output() onFilter = new EventEmitter();
  visible = false;
  filterSchema: OfSchemaModel;
  filtered$: Observable<boolean>;


  constructor(private fw: FormWidgetFacadeService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.searchSchema && this.fields.length > 0) {
      const filterSearch = _.cloneDeep(this.searchSchema);
      filterSearch.fields.forEach(f => {
        f.hidden = true;
        if (f.dataField && this.fields.indexOf(f.dataField) > -1) {
          f.hidden = false;
          f.grid = this.fw.getGridByWidth(24);
        }
      });
      this.filterSchema = filterSearch;
    }
  }

  ngAfterViewInit(): void {
    if (this.searchSchema.form) {
      this.filtered$ = this.searchSchema.form.value$.pipe(map(v => {
        let ret = false;
        if (this.fields?.length > 0) {
          _.forEach(this.fields, (f) => {
            if (!OCoreUtilityService.isNullOrEmpty(v[f])) {
              ret = true;
              return false;
            }
          });
        }
        return ret;
      }));
    }
  }

  applyFilterColumn() {
    this.close();
    this.onFilter.emit(this.filterSchema.value);
  }

  onChangeVisibleDropDownFilter($event: boolean) {
    this.visible = $event;
    if ($event && this.filterSchema) {
      this.filterSchema.patchValue(this.searchSchema.value);
      this.filterSchema.focusFirstControl(300);
    }
  }

  clear() {
    if (this.fields?.length > 0 && this.filterSchema?.form) {
      const value = this.searchSchema.value;
      this.fields.forEach(f => {
        value[f] = null;
      });
      this.filterSchema.form.patchValue(value);
      this.cdr.markForCheck();
      this.close();
      setTimeout(() => {
        this.onFilter.emit(this.filterSchema.value);
      });
    }
  }

  close() {
    this.visible = false;
  }


}
