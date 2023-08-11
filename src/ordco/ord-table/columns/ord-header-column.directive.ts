import {Directive, TemplateRef} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[ord-header]'
})
export class OrdHeaderColumnDirective {
  constructor(public template: TemplateRef<NzSafeAny>) {
  }
}
