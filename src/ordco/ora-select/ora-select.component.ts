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
import {Subject} from 'rxjs';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ISelectOption, ISelectOptions, SelectOptions} from './model';
import {debounceTime, pairwise, takeUntil} from 'rxjs/operators';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import AppUtilityService from "@app-ordco/services/app-utility.service";

const VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OraSelectComponent),
    multi: true
};

@Component({
    selector: 'ora-select',
    templateUrl: './ora-select.component.html',
    styleUrls: ['./ora-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class OraSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {
    options: ISelectOption[] = [];
    optionsSource: ISelectOption[] = [];
    @Input() loading = false;
    @Output() loadingChange = new EventEmitter<boolean>();
    @Input() refNotFound: TemplateRef<any> | string = 'Không tìm thấy...';
    @Input() placeHolder = 'Chọn...';
    @Input() closeOnSelect = false;
    @Input() control = new FormControl(null);
    @Input() allowClear = true;
    @Input() takeFirstValue = false;
    resetValue$ = new Subject<ISelectOption>();

    @Input()
    get disableIfOptionsNull() {
        return this._disableIfOptionsNull;
    }

    set disableIfOptionsNull(value: any) {
        // reset giá trị value hiện tại nếu giá trị value đó không có trong List option
        this._disableIfOptionsNull = coerceBooleanProperty(value);
    }

    private _disableIfOptionsNull = false;

    @Input()
    get resetValueIfValueNotInOptions() {
        return this._resetValueIfValueNotInOptions;
    }

    set resetValueIfValueNotInOptions(value: any) {
        // reset giá trị value hiện tại nếu giá trị value đó không có trong List option
        this._resetValueIfValueNotInOptions = coerceBooleanProperty(value);
    }

    private _resetValueIfValueNotInOptions = false;
    @Input() debounceTimeResetValue = 500;

    @Input()
    get selectFirstItemIfNull() {
        return this._selectFirstItemIfNull;
    }

    set selectFirstItemIfNull(value: any) {
        this._selectFirstItemIfNull = coerceBooleanProperty(value);
    }

    private _selectFirstItemIfNull = false;
    $destroy = new Subject<boolean>();

    @Input()
    selectMode?: 'default' | 'multiple' | 'tags' = 'default';

    _isDisabled = false;

    _value: ISelectOption;
    @Input()
    get value(): ISelectOption {
        return this._value;
    }

    set value(v: ISelectOption) {
        this._value = v;
        if (!this.equalEmpty(v, this.control.value)) {
            // this.control.reset(v);
            this.resetValue$.next(v);
            // console.log('setValue', v);
        }
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

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onItemSelected = new EventEmitter<ISelectOption>();

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
            (s) => AppUtilityService.getInstance().removeDau(s.displayText.toLowerCase()).indexOf(value.toLowerCase()) !== -1
        );
    }

    // tslint:disable-next-line:triple-equals
    compareFn = (o1: ISelectOption, o2: ISelectOption) => (o1 && o2 ? o1.value == o2.value : o1 == o2);

    constructor(@Optional() @Inject(SelectOptions) private directive: ISelectOptions) {
        this.control.valueChanges.pipe(takeUntil(this.$destroy), pairwise()).subscribe(([prev, next]) => {
            if (!this.shallowEqual(prev, next)) {
                if (!this.equalEmpty(prev?.value, next?.value)) {
                    this.onChange(next?.value);
                    this._value = next;
                    this.onItemSelected.emit(next);
                }
            }
        });
        this.resetValue$.pipe(takeUntil(this.$destroy), debounceTime(this.debounceTimeResetValue))
            .subscribe(res => {
                this.control.reset(res);
            });
        if (this.directive) {
            this.directive.options$.pipe(takeUntil(this.$destroy), debounceTime(500)).subscribe((ressult) => {
                ressult = ressult ? ressult : [];
                if ((ressult.length === 0 && this.disableIfOptionsNull) || this.isDisabled) {
                    this.control.disable();
                } else {
                    this.control.enable();
                }
                this.options = ressult;
                this.optionsSource = ressult;
                // tslint:disable-next-line:triple-equals
                const itemFind = this.optionsSource.find((x) => x.value == this.value?.value);
                if (!itemFind) {
                    if (this.selectFirstItemIfNull && ressult.length > 0 && !this.value?.value) {
                        this.control.reset(ressult[0].value);
                    } else if (this.equalEmpty(undefined, this.value?.value)) {
                        // this.control.reset();
                        this.resetValue$.next();
                    } else if (this.resetValueIfValueNotInOptions) {
                        // this.control.reset();

                        this.resetValue$.next();
                    }
                } else {
                    // this.resetValue$.next(false);
                }
                if (this.takeFirstValue) {
                    this.value = this.optionsSource[0];
                }
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
    writeValue(value: any): void {
        console.log('wireteValue', value);
        if (value !== this.value?.value) {
            this.value = {value, displayText: ''};
        }
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
}
