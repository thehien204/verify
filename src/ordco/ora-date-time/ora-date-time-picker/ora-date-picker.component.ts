import {Component, forwardRef, Input, OnDestroy, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from "@node_modules/moment";
import {Subject} from 'rxjs';
import {takeUntil} from "@node_modules/rxjs/operators";

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OraDatePickerComponent),
  multi: true,
};

@Component({
  selector: 'ora-date-picker',
  templateUrl: './ora-date-picker.component.html',
  providers: [VALUE_ACCESSOR],
  styles: []
})
export class OraDatePickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
  get value() {
    return this.control.value;
  }

  @Input() set value(v: moment.Moment) {
    if (v && v.isValid) {
      this.control.setValue(v.toDate());
    } else {
      this.control.reset();
    }
  }

  $destroy: Subject<boolean> = new Subject<boolean>();
  _isDisabled = false;

  @Input()
  get disabled() {
    return this._isDisabled;
  }

  set disabled(v: boolean) {
    this._isDisabled = v;
    if (v) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  @Input() control = new FormControl({value: undefined, disabled: false});

  private onChange = (v: any) => {
  };
  private onTouched = () => {
  };

  constructor() {
    this.control.valueChanges.pipe(takeUntil(this.$destroy))
      .subscribe(res => {
        this.onChange(moment(res));
      })
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {
  }

  onFocus(event: any): void {
    this.onTouched();
  }


  //#region base ControlValueAccessor
  writeValue(obj: moment.Moment): void {
    this.value = obj;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  //#endregion
}
