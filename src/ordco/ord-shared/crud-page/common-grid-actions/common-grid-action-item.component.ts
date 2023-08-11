import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  template: ``,
  selector: 'app-common-grid-action-item'
})
export class CommonGridActionItemComponent implements OnInit {
  @Input() actionType: 'edit' | 'delete' | string = '';
  @Input() actionName = '';
  @Input() nzIcon: string;
  @Input() classIcon: string;
  @Input() nzTypeButton = 'link';
  @Input() isDanger = false;
  @Output() onclickEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    if (this.actionType === 'edit') {
      this.nzIcon = 'edit';
      this.actionName = 'Sửa';
    }
    if (this.actionType === 'delete') {
      this.nzIcon = 'delete';
      this.actionName = 'Xóa';
      this.isDanger = true;
    }
  }

}
