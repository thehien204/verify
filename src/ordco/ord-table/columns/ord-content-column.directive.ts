import {Directive, TemplateRef} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[ord-content]'
})
export class OrdContentColumnDirective {
  constructor(public template: TemplateRef<NzSafeAny>) {
  }
}
