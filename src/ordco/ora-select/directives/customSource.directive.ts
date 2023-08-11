import {Directive, Input } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {ISelectOption, ISelectOptions, SelectOptions} from "@app-ordco/ora-select/model";


@Directive({
    selector: '[dirCustomSource]',
    providers: [
        {
            provide: SelectOptions,
            useExisting: CustomSourceDirective
        }
    ]
})
export class CustomSourceDirective implements ISelectOptions {

    @Input() set dirCustomSource(v: ISelectOption[]) {
        this.options$.next(v);
    }

    options$: BehaviorSubject<ISelectOption[]> = new BehaviorSubject<ISelectOption[]>([]);

    constructor() {
    }


}
