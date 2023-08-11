import {ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {OfControlModel, OfSchemaModel} from '@node_modules/@orendaco/of';
import {FormControl, FormGroup} from '@ngneat/reactive-forms';
import {DestroyRxjsService, OfControlUIWidget} from '@orendaco/of';
import {differenceInCalendarDays} from 'date-fns';
import {takeUntil} from 'rxjs/operators';
import Inputmask from 'inputmask';

@Component({
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyRxjsService]
})
export class DateRangeComponent extends OfControlUIWidget {
  @ViewChild('refFromDate') private refFromDate!: ElementRef;
  @ViewChild('refToDate') private refToDate!: ElementRef;
  schemaModel: OfSchemaModel;
  field: OfControlModel;
  format = 'dd/MM/yyyy';
  formTuNgayDenNgay = new FormGroup({
    tuNgay: new FormControl(''),
    denNgay: new FormControl('')
  });

  get notGreaterThanCurrent(): boolean {
    return this.field?.extendOptions?.notGreaterThanCurrent || false;
  }

  today = new Date();
  denNgay: Date;
  tuNgay: Date;

  constructor(private inject: Injector) {
    super(inject);
  }

  afterViewInit(): void {
    if (this.schemaModel.form) {
      this.schemaModel.form.addControl(this.field.dataField, this.formTuNgayDenNgay);
    }
    this.formTuNgayDenNgay.get('tuNgay').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(d => {
        setTimeout(() => {
          this.tuNgay = d;
        });

      });
    this.formTuNgayDenNgay.get('denNgay').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(d => {
        setTimeout(() => {
          this.denNgay = d;
        });
      });
    this.setInputMaskDate();
  }

  setInputMaskDate() {
    setTimeout(() => {
      const im = new Inputmask({alias: 'datetime', inputFormat: 'dd/mm/yyyy', placeholder: '__/__/____'});
      const inputFromDate = this.refFromDate.nativeElement.getElementsByTagName('input');
      const inputToDate = this.refToDate.nativeElement.getElementsByTagName('input');
      im.mask(inputFromDate);
      im.mask(inputToDate);
      this.cdr.markForCheck();
    });
  }

  disabledTuNgay = (startValue: Date): boolean => {
    return this.disabledNotGreaterThanCurrent(startValue) || this.disabledStartDate(startValue);
  };
  disabledDenNgay = (endValue: Date): boolean => {
    return this.disabledNotGreaterThanCurrent(endValue) || this.disabledEndDate(endValue);
  };

  private disabledNotGreaterThanCurrent = (startValue: Date): boolean => {
    return this.notGreaterThanCurrent && differenceInCalendarDays(startValue, this.today) > 0;
  };

  private disabledStartDate = (startValue: Date): boolean => {
    if (!this.denNgay) {
      return false;
    }
    return differenceInCalendarDays(startValue, this.denNgay) > 0;
  };
  private disabledEndDate = (endValue: Date): boolean => {
    if (!this.tuNgay) {
      return false;
    }
    return differenceInCalendarDays(endValue, this.tuNgay) < 0;
  };

}
