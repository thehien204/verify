import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-save-button-group',
  templateUrl: './common-save-button-group.component.html',
  styles: []
})
export class CommonSaveButtonGroupComponent implements OnInit {
  @Input() btnBusy = false;
  @Input() saveTitle = 'Lưu';
  @Input() closeTitle = 'Đóng'
  @Output() onSave = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
