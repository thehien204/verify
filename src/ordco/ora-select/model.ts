import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface ISelectOption {
    value: any;
    displayText: string;
    data?: any;
}

export interface ISelectOptions {
    options$: Observable<ISelectOption[]>;
}

export const SelectOptions = new InjectionToken<ISelectOptions>('SelectOptions');
