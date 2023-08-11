import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {InputNumber} from '@node_modules/ng-zorro-antd/core/util';
import {OrdHeaderColumnDirective} from '@app-ordco/ord-table/columns/ord-header-column.directive';
import {OrdContentColumnDirective} from '@app-ordco/ord-table/columns/ord-content-column.directive';

@Component({
  selector: 'ord-column',
  template: ''
})
export class OrdColumnComponent implements OnInit {
  id: number;
  @Input() field: string;
  @Input() headerText: string;
  @Input() @InputNumber() width: number;
  @Input() @InputNumber() minWidth: number;
  @Input() textAlign: 'Center' | 'Right';
  @ContentChild(OrdHeaderColumnDirective) headerTemplate: OrdHeaderColumnDirective;
  @ContentChild(OrdContentColumnDirective) contentTemplate: OrdContentColumnDirective;
  cellAlign: string;

  ngOnInit(): void {
    this.id = Math.floor(Math.random() * 9999);
    if (this.textAlign) {
      this.cellAlign = this.textAlign.toLowerCase();
    }
  }
}
