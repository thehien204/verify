import {Component, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {OCoreUtilityService, OfComponentRefModel, OfControlUIWidget, OfGridSchema} from '@node_modules/@orendaco/of';
import {DestroyRxjsService, OfSchemaModel} from '@orendaco/of';
import * as moment from 'moment';
import {DurationInputArg2} from '@node_modules/moment';
import {takeUntil} from 'rxjs/operators';
import {debounceTime} from '@node_modules/rxjs/operators';
import * as _ from 'lodash';
import {DateRangeComponent} from '../date-range/date-range.component';

@Component({
  templateUrl: './date-range-with-custom-select.component.html',
  styleUrls: ['./index.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyRxjsService]
})
export class DateRangeWithCustomSelectComponent extends OfControlUIWidget implements OnInit {
  notGreaterThanCurrent = false;
  dateRangeSchema: OfSchemaModel = null;
  iTruocDay = 1;
  khoangTruocDay = '2';
  options = [{
    value: '1',
    displayText: 'Ngày trước'
  }, {
    value: '2',
    displayText: 'Tháng trước'
  },
    {
      value: '3',
      displayText: 'Năm trước'
    }];
  visibleCustomDDL = false;
  theoKieu = 'theo-nam';
  quyOptions = [];
  thangOptions = [];
  namOptions = [];
  yNow = new Date().getFullYear();
  thangTu = null;
  quyTu = null;
  namTu = null;
  thangDen = null;
  quyDen = null;
  namDen = null;

  constructor(private inject: Injector) {
    super(inject);
  }

  ngOnInit(): void {
    this.notGreaterThanCurrent = this.field.extendOptions?.notGreaterThanCurrent;
    this.dateRangeSchema = new OfSchemaModel({
      fields: [
        new OfComponentRefModel(
          {
            dataField: this.field.dataField,
            grid: this.getGridByWidth(24),
            componentRef: DateRangeComponent,
            css: 'of-date-range',
            extendOptions: this.field?.extendOptions
          }
        )
      ]
    });
    for (let i = 1; i <= 4; i++) {
      this.quyOptions.push({
        value: i + '',
        displayText: 'Quý ' + i
      });
    }
    for (let i = 1; i <= 12; i++) {
      this.thangOptions.push({
        value: i + '',
        displayText: 'Tháng ' + i
      });
    }
    for (let i = this.yNow; i >= 1900; i--) {
      this.namOptions.push({
        value: i + '',
        displayText: 'Năm ' + i
      });
    }
  }

  getGridByWidth(width: number): OfGridSchema {
    return OCoreUtilityService.getGridByWidth(width);
  }

  afterViewInit(): void {
    setTimeout(() => {
      this.rootFormGroup.addControl(this.field.dataField, this.dateRangeSchema.form.getControl(this.field.dataField));
      const f = this.rootFormGroup.get(this.field.dataField);
      f.valueChanges
        .pipe(takeUntil(this.destroy$), debounceTime(100))
        .subscribe(d => {
          let mustUpdateValue = false;
          let startDate = d?.tuNgay;
          let endDate = d?.denNgay;
          if (startDate && endDate) {
            if (this.compareDate(startDate, endDate) > 0) {
              startDate = endDate;
              mustUpdateValue = true;
            }
          }
          if (this.notGreaterThanCurrent) {
            if (startDate && this.compareDate(startDate, new Date()) > 0) {
              startDate = new Date();
              mustUpdateValue = true;
            }
            if (endDate && this.compareDate(endDate, new Date()) > 0) {
              endDate = new Date();
              mustUpdateValue = true;
            }
          }
          if (mustUpdateValue) {
            if (startDate) {
              f.get('tuNgay').patchValue(startDate);
            }
            if (endDate) {
              f.get('denNgay').patchValue(endDate);
            }
          }
        });
    });
  }

  private compareDate = (d1: Date, d2: Date): number => {
    const n1 = +(moment(_.cloneDeep(d1)).format('yyyyMMDD'));
    const n2 = +(moment(_.cloneDeep(d2)).format('yyyyMMDD'));
    return n1 - n2;
  };


  /**
   * Áp dụng hôm nay, tuần này...
   */
  apDungCustom(type: string) {
    if (type === 'hom-nay') {
      this.formForDataField.get('tuNgay').patchValue(new Date());
      this.formForDataField.get('denNgay').patchValue(new Date());
    }
    if (type === 'tuan-nay') {
      const startDate = (moment(new Date()).startOf('week').add(1, 'day')).toDate();
      this.formForDataField.get('tuNgay').patchValue(startDate);
      this.formForDataField.get('denNgay').patchValue(new Date());
    }
    if (type === 'thang-nay') {
      const now = new Date();
      this.formForDataField.get('tuNgay').patchValue(new Date(now.getFullYear(), now.getMonth(), 1));
      this.formForDataField.get('denNgay').patchValue(new Date());
    }
    if (type === 'thang-truoc') {
      const startDate = (moment(new Date()).add(-1, 'M').startOf('month')).toDate();
      const endDate = (moment(new Date()).add(-1, 'M').endOf('month')).toDate();
      this.formForDataField.get('tuNgay').patchValue(startDate);
      this.formForDataField.get('denNgay').patchValue(endDate);
    }
    if (type === 'nam-nay') {
      const now = new Date();
      this.formForDataField.get('tuNgay').patchValue(new Date(now.getFullYear(), 0, 1));
      this.formForDataField.get('denNgay').patchValue(new Date());
    }
    if (type === 'nam-truoc') {
      const now = new Date();
      this.formForDataField.get('tuNgay').patchValue(new Date(now.getFullYear() - 1, 0, 1));
      this.formForDataField.get('denNgay').patchValue(new Date(now.getFullYear() - 1, 11, 31));
    }
    this.close();
  }

  close() {
    this.visibleCustomDDL = false;
  }


  apDungKhoangTruocDay() {
    if (this.iTruocDay > 0) {
      let unit: DurationInputArg2 = 'month';
      if (this.khoangTruocDay === '1') {
        unit = 'day';
      }
      if (this.khoangTruocDay === '3') {
        unit = 'year';
      }
      const startDate = (moment(new Date()).add(-this.iTruocDay, unit)).toDate();
      this.formForDataField.get('tuNgay').patchValue(startDate);
      this.formForDataField.get('denNgay').patchValue(new Date());
    }
    this.close();
  }

  funcDisableThangTu(value) {
    if (this.thangDen) {
      if (this.namDen && this.namTu) {
        if (this.namTu === this.namDen) {
          return +value > +this.thangDen;
        }
      }
    }
    return false;
  }

  funcDisableThangDen(value) {
    if (this.thangTu) {
      if (this.namDen && this.namTu) {
        if (this.namTu === this.namDen) {
          return +value < +this.thangTu;
        }
      }
    }
    return false;
  }

  funcDisableQuyTu(value) {
    if (this.quyDen) {
      if (this.namDen && this.namTu) {
        if (this.namTu === this.namDen) {
          return +value > +this.quyDen;
        }
      }
    }
    return false;
  }

  funcDisableQuyDen(value) {
    if (this.quyTu) {
      if (this.namDen && this.namTu) {
        if (this.namTu === this.namDen) {
          return +value < +this.quyTu;
        }
      }
    }
    return false;
  }

  funcDisableNamDen(value) {
    if (this.namTu) {
      if (this.theoKieu === 'theo-thang' && this.thangDen && this.thangTu && (+this.thangTu > +this.thangDen)) {
        return value <= this.namTu;
      }
      if (this.theoKieu === 'theo-quy' && this.quyDen && this.quyTu && (+this.quyTu > +this.quyDen)) {
        return value <= this.namTu;
      }
      return value < this.namTu;
    }
    return false;
  }

  funcDisableNamTu(value) {
    if (this.namDen) {
      if (this.theoKieu === 'theo-thang' && this.thangDen && this.thangTu && (+this.thangTu > +this.thangDen)) {
        return value >= this.namDen;
      }
      if (this.theoKieu === 'theo-quy' && this.quyDen && this.quyTu && (+this.quyTu > +this.quyDen)) {
        return value >= this.namDen;
      }
      return value > this.namDen;
    }
    return false;
  }

  /**
   * Theo kỳ tháng/quý/năm
   */
  apDungKyThoiGian() {
    this.formatTuDenKyThoiGian();
    if (this.theoKieu === 'theo-thang') {
      if (this.thangTu && this.namTu) {
        const start = new Date(this.namTu, +this.thangTu - 1, 1);
        this.formForDataField.get('tuNgay').patchValue(start);
      }
      if (this.thangDen && this.namDen) {
        const endDate = moment(new Date(this.namDen, +this.thangDen, 1)).add(-1, 'day').toDate();
        this.formForDataField.get('denNgay').patchValue(endDate);
      }
    }
    if (this.theoKieu === 'theo-quy') {
      if (this.quyTu && this.namTu) {
        const start = new Date(this.namTu, (+this.quyTu - 1) * 3, 1);
        this.formForDataField.get('tuNgay').patchValue(start);
      }
      if (this.quyDen && this.namDen) {
        const endDate = moment(new Date(this.namDen, (+this.quyDen) * 3, 1)).add(-1, 'day').toDate();
        this.formForDataField.get('denNgay').patchValue(endDate);
      }
    }
    if (this.theoKieu === 'theo-nam') {
      if (this.namTu) {
        const start = new Date(+this.namTu, 0, 1);
        this.formForDataField.get('tuNgay').patchValue(start);
      }
      if (this.namDen) {
        const namDen = +this.namDen;
        const endDate = moment(new Date(namDen + 1, 0, 1)).add(-1, 'day').toDate();
        this.formForDataField.get('denNgay').patchValue(endDate);
      }
    }
    this.close();

  }

  formatTuDenKyThoiGian() {
    if (this.theoKieu === 'theo-thang') {
      if (this.thangTu && this.namTu) {
        if (!(this.thangDen && this.namDen)) {
          this.thangDen = this.thangTu;
          this.namDen = this.namTu;
        }
      }
      if (this.thangDen && this.namDen) {
        if (!(this.thangTu && this.namTu)) {
          this.thangTu = this.thangDen;
          this.namTu = this.namDen;
        }
      }
    }
    if (this.theoKieu === 'theo-quy') {
      if (this.quyTu && this.namTu) {
        if (!(this.quyDen && this.namDen)) {
          this.quyDen = this.quyTu;
          this.namDen = this.namTu;
        }
      }
      if (this.quyDen && this.namDen) {
        if (!(this.quyTu && this.namTu)) {
          this.quyTu = this.quyDen;
          this.namTu = this.namDen;
        }
      }
    }
    if (this.theoKieu === 'theo-nam') {
      if (this.namTu) {
        if (!this.namDen) {
          this.namDen = this.namTu;
        }
      }
      if (this.namDen) {
        if (!this.namTu) {
          this.namTu = this.namDen;
        }
      }
    }
  }
}
