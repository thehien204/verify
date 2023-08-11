import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {CommonGridActionItemComponent} from './common-grid-action-item.component';

@Component({
  selector: 'app-common-grid-actions',
  templateUrl: './common-grid-actions.component.html',
  styles: [`.common-action-btn:hover {
    background-color: #afadad;
    color: white;
  }`]
})
export class CommonGridActionsComponent {
  @ContentChildren(CommonGridActionItemComponent, {descendants: true}) actionItems: QueryList<CommonGridActionItemComponent>;
  busyBtn = false;
  @Input() isGroupAction = true;

  constructor() {
  }

  onClickActionItem(actionItem: CommonGridActionItemComponent) {
    if (this.busyBtn) {
      return;
    }
    this.busyBtn = true;
    actionItem.onclickEvent.emit();
    setTimeout(() => {
      this.busyBtn = false;
    }, 500);
  }

  getGroupAction(group: 1 | 2): CommonGridActionItemComponent[] {
    const acts: CommonGridActionItemComponent[] = [];
    this.actionItems.forEach((it, idx) => {
      if (group === 1 && idx < 2) {
        acts.push(it);
      }
      if (group === 2 && idx >= 2) {
        acts.push(it);
      }
    });
    return acts;
  }
}
