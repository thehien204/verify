import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Provider,
  TemplateRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, pairwise, takeUntil } from '@node_modules/rxjs/internal/operators';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption, ISelectOptions, SelectOptions } from './model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import AppUtilityService from "@app-ordco/services/app-utility.service";

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OraSelectMultiComponent),
  multi: true
};

@Component({
  selector: 'ora-select-multi',
  template: `
    <nz-select
      style=" width: 100%;"
      [nzAllowClear]="allowClear"
      [nzPlaceHolder]="placeHolder"
      nzMode="multiple"
      [formControl]="control"
      (nzFocus)="onFocus($event)"
      nzShowSearch
      nzServerSearch
      [nzDropdownRender]="renderTemplate"
      [nzNotFoundContent]="refNotFound"
      (nzOnSearch)="search($event)"
      [nzMaxTagCount]="usingModeTag?  maxTagCount: options.length"
      [nzMaxTagPlaceholder]="usingModeTag? tagPlaceHolder: null">
      <ng-template #renderTemplate>
        <nz-divider style="margin-top: 1%; margin-bottom: 1%;"></nz-divider>
        <label style="margin-left: 11px" nz-checkbox [(ngModel)]="selectdAll"
               (ngModelChange)="selectAllChange($event)">Chọn tất cả</label>
      </ng-template>
      <nz-option
        nzCustomContent
        *ngFor="let option of options" [nzLabel]="option.displayText" [nzValue]="option.value">
        <label nz-checkbox [ngModel]="option.value|isOption:value" (ngModelChange)="modalCheckOptionChange($event, option.value)"></label>
        {{option.displayText}}
      </nz-option>
      <ng-template #tagPlaceHolder let-selectedList>và {{ selectedList.length }} lựa chọn khác</ng-template>
    </nz-select>

  `,
  providers: [VALUE_ACCESSOR]
})
export class OraSelectMultiComponent implements OnInit, ControlValueAccessor, OnDestroy {
  options: ISelectOption[] = [];
  optionsSource: ISelectOption[] = [];
  @Input() refNotFound: TemplateRef<any> | string = 'Không tìm thấy...';
  @Input() placeHolder = 'Chọn...';
  @Input() control = new FormControl(null);
  @Input() allowClear = true;
  $destroy = new Subject<boolean>();
  _isDisabled = false;
  selectdAll = false;
  resetValue$ = new Subject<boolean>();

  @Input()
  get resetValueIfValueNotInOptions() {
    return this._resetValueIfValueNotInOptions;
  }

  set resetValueIfValueNotInOptions(value: any) {
    // reset giá trị value hiện tại nếu giá trị value đó không có trong List option
    this._resetValueIfValueNotInOptions = coerceBooleanProperty(value);
  }

  private _resetValueIfValueNotInOptions = false;

  @Input()
  get usingModeTag() {
    return this._usingModeTag;
  }

  set usingModeTag(value: boolean) {
    this._usingModeTag = coerceBooleanProperty(value);
  }

  private _usingModeTag = false;
  @Input() maxTagCount = 3;

  @Input()
  get value(): any[] {
    return this.control.value;
  }

  set value(v: any[]) {
    this.control.reset(v);
  }

  @Input()
  get isDisabled() {
    return this._isDisabled;
  }

  set isDisabled(v: boolean) {
    this._isDisabled = v;
    if (v) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }


  private onChange = (v: any) => {
  };
  private onTouched = () => {
  };

  onFocus(event: any): void {
    setTimeout(() => {
      this.onTouched();
    });
  }

  search(value: string): void {
    value = AppUtilityService.getInstance().removeDau(value);
    this.options = this.optionsSource.filter(
      (s) => {
        return AppUtilityService.getInstance().removeDau(s.displayText.toLowerCase()).indexOf(value) !== -1;
      }
    );
  }

  checkAll() {
    const val = this.optionsSource.map(x => x.value);
    this.control.setValue(val);
    this.onChange(val);
  }

  removeAll() {
    this.control.reset([]);
    this.onChange([]);
  }

  compareFn = (o1: ISelectOption, o2: ISelectOption) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  constructor(@Optional() @Inject(SelectOptions) private directive: ISelectOptions) {
    this.control.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.onChangeData(res);
    });
    this.resetValue$.pipe(takeUntil(this.$destroy), debounceTime(500))
      .subscribe(res => {
        if (res) {
          this.control.reset();
        }
      });
    if (this.directive) {
      this.directive.options$.pipe(takeUntil(this.$destroy), debounceTime(500)).subscribe((ressult) => {
        this.options = ressult;
        this.optionsSource = ressult;
        if (this.resetValueIfValueNotInOptions && this.value && this.value.length > 0) {
          const itemFromSource = [];
          this.optionsSource.forEach(item => {
            // tslint:disable-next-line:triple-equals
            const idx = this.value.findIndex(x => x == item);
            if (idx > -1) {
              itemFromSource.push(item.value);
            }
          });
          this.control.reset(itemFromSource);
        }
        this.checkSelectAll();
      });
    }
  }


  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {
  }


  private equalEmpty = (val1, val2) => {
    if (val1 === {} && val2 === {}) {
      return true;
    }
    if ((val1 === null || val1 === undefined || val1 === '') && (val2 === null || val2 === undefined || val2 === '')) {
      return true;
    }
    return false;
  };

  private shallowEqual = (object1, object2) => {
    const keys1 = object1 ? Object.keys(object1) : [];
    const keys2 = object2 ? Object.keys(object2) : [];
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  };

  //#region base ControlValueAccessor
  writeValue(value: any[]): void {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  //#endregion
  onChangeData($event: any) {
    this.onChange($event);
    setTimeout(() => {
      this.checkSelectAll();
    });
  }

  private checkSelectAll() {
    this.selectdAll = this.optionsSource.length === this.value?.length;
  }

  selectAllChange($event: boolean) {
    if ($event) {
      this.checkAll();
    } else {
      this.removeAll();
    }
  }

  modalCheckOptionChange($event: boolean, val: any) {
    if ($event) {
      const data = [...(this.value ? this.value : []), val];
      this.control.setValue(data);
    } else {
      const data = this.value ? (this.value as any[]).filter(x => x !== val) : [];
      this.control.setValue(data);
    }
  }

  containOption(value: any) {
    return this.value ? this.value?.findIndex(x => x === value) > -1 : false;
  }


}
