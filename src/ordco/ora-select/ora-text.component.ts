import {Component, forwardRef, Inject, Input, OnDestroy, OnInit, Optional, Provider} from '@angular/core';
import {combineLatest, Subject} from 'rxjs';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ISelectOptions, SelectOptions} from './model';
import {takeUntil} from 'rxjs/operators';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OraTextComponent),
  multi: true
};

@Component({
  selector: 'ora-text',
  template: '{{displayText}}',
  providers: [VALUE_ACCESSOR]
})
export class OraTextComponent implements OnInit, ControlValueAccessor, OnDestroy {
  displayText: string;
  formValue = new FormControl();
  $destroy = new Subject<boolean>();

  @Input() get value() {
    return this.formValue.value;
  }

  set value(v: any) {
    this.formValue.patchValue(v);
  }

  private onChange = (v: any) => {
  };
  private onTouched = () => {
  };

  onChangeValue(event: any): void {
    this.onChange(event);
  }

  onFocus(event: any): void {
    this.onTouched();
  }


  constructor(
    @Optional() @Inject(SelectOptions) private directive: ISelectOptions
  ) {
    if (directive) {
      combineLatest([
        directive.options$,
        this.formValue.valueChanges
      ]).pipe(takeUntil(this.$destroy)).subscribe(res => {
        const itemFind = res[0].find(x => x.value === res[1]);
        this.displayText = itemFind?.displayText;
      });
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {

  }

  //#region base ControlValueAccessor
  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  //#endregion


}
