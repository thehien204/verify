import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import {OrdColumnComponent} from '@app-ordco/ord-table/columns/ord-column.component';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {nzTableHelper, OpConfigModel} from '@node_modules/@orendaco/of';
import {Observable, of} from '@node_modules/rxjs';
import {PagedResultDto} from '@node_modules/@orendaco/of/op/models/paged-result-dto';
import {OfSchemaModel} from '@orendaco/of';
import {InputBoolean, InputNumber} from '@node_modules/ng-zorro-antd/core/util';
import {finalize} from '@node_modules/rxjs/operators';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'ord-grid',
  templateUrl: './ord-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ord-grid.component.scss']
})
export class OrdGridComponent implements OnInit {
  @Input() gridType: 'ant' | 'ej2' = 'ej2';
  @Input() loading = false;
  @Input() searchSchema: OfSchemaModel;

  @Input() set bindDataSource(items: NzSafeAny[]) {
    setTimeout(() => {
      this.setDataSource(items);
    });
  }

  @Input() dataSourceFunc: (searchDto: NzSafeAny) => Observable<PagedResultDto<NzSafeAny>>;
  @Input() @InputBoolean() showPagination = true;
  @Input() @InputNumber() rowHeight = 45;
  @Input() @InputBoolean() hasRowIndexColumn = true;
  @Input() @InputBoolean() hasCheckboxColumn = false;
  @Input() @InputBoolean() allowCheckAll = true;
  @Input() keyField = 'id';
  @Input() @InputBoolean() clearCheckedWhenChangeDatasource = false;
  @Input() itemsChecked = [];
  @Input() tyLeChieuCaoDong = 1;
  @Output() itemsCheckedChange = new EventEmitter<NzSafeAny[]>();
  @ContentChildren(OrdColumnComponent, {descendants: true}) listOfColumn!: QueryList<OrdColumnComponent>;
  gridHeight = 60;
  dataSource: NzSafeAny[] = [];
  pageConfig = new OpConfigModel({
    type: 'ord-not-total-record',
    dataSourceFunc: searchDto => {
      return this.dataSource$(searchDto);
    },
    allowSelectPageSize: true,
    pageSizeOptions: [10, 20, 50]
  });
  nzTable: nzTableHelper = new nzTableHelper();
  allChecked = false;
  indeterminate = false;


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  trackByColumn(index, item: OrdColumnComponent) {
    return item.id;
  }

  onItemPaginationChange(nzTable: nzTableHelper) {
    this.nzTable = nzTable;
    this.setDataSource(nzTable?.items);
  }

  dataSource$(searchDto: NzSafeAny): Observable<PagedResultDto<any>> {
    if (this.dataSourceFunc) {
      this.loading = true;
      return this.dataSourceFunc(searchDto).pipe(
        map(d => {
          if (!!d) {
            return d;
          }
          return {
            items: this.nzTable.items,
            totalCount: this.nzTable.totalCount
          };
        }),
        finalize(() => {
          this.loading = false;
        }));
    } else {
      return of({
        items: this.nzTable.items,
        totalCount: this.nzTable.totalCount
      })
    }
  }

  setDataSource(items: NzSafeAny[]) {
    this.dataSource = items || [];
    this.allChecked = false;
    this.indeterminate = false;
    if (this.dataSource) {
      this.dataSource.forEach(record => {
        if (record?.checked === true) {
          return;
        }
        if (this.clearCheckedWhenChangeDatasource) {
          record.checked = false;
          return;
        }
        record.checked = !!this.itemsChecked.find(x => x[this.keyField] === record[this.keyField]);
      });
      this.updateSingleChecked();
    }

    if (this.clearCheckedWhenChangeDatasource) {
      this.itemsChecked = [];
      this.itemsCheckedChange.emit([]);
      this.dataSource.forEach(it => {
        it.checked = false;
      })
    } else {
      this.getStatusCheckedFromItemChecked();
    }
    this.calGridHeight();
    this.cdr.markForCheck();
  }

  getStatusCheckedFromItemChecked() {
    if (this.dataSource) {
      this.dataSource.forEach(it => {

      });
    }
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.dataSource = this.dataSource.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.dataSource = this.dataSource.map(item => ({
        ...item,
        checked: false
      }));
    }
    this.getItemSelected();
  }

  updateSingleChecked(): void {
    if (this.dataSource.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.dataSource.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
    this.getItemSelected();
  }

  getItemSelected() {
    if (this.dataSource) {
      this.dataSource.forEach(record => {
        if (record?.checked === true) {
          this.itemsChecked.push(record);
        } else {
          this.itemsChecked = this.itemsChecked.filter(x => x[this.keyField] !== record[this.keyField]);
        }
      });
      this.itemsChecked = _.uniqBy(this.itemsChecked, this.keyField);
      this.itemsCheckedChange.emit(this.itemsChecked);
      this.cdr.markForCheck();
    }
  }

  /**
   * Tính lại gridHeight dựa vào length của dataSource
   */
  calGridHeight() {
    const count = this.dataSource?.length || 0;
    if (count === 0) {
      this.gridHeight = 50 * this.tyLeChieuCaoDong;
      return;
    }
    if (count < 10) {
      this.gridHeight = (this.rowHeight) * count * this.tyLeChieuCaoDong;
      return;
    }
    this.gridHeight = (this.rowHeight) * 10 * this.tyLeChieuCaoDong;
  }
}
