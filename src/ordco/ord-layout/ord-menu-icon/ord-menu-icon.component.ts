import {Component, Input, OnInit} from '@angular/core';
import {TreeNode} from '@abp/ng.core/lib/utils/tree-utils';
import {ABP} from '@abp/ng.core';

@Component({
  selector: 'app-ord-menu-icon',
  template: `
    <span class="menu-icon">
       <i [ngClass]="menuItem?.iconClass"></i>
      <span *ngIf="svg"
            [inlineSVG]="svg"
            class="svg-icon svg-icon-2"
      ></span>
      <ng-container *ngIf="img">
        <img src="{{img}}" class="menu-icon-img" style="height: 22px" alt=""/>
      </ng-container>
    </span>
    <span class="menu-bullet" *ngIf="!menuItem.iconClass">
      <span class="bullet bullet-dot">
      </span>
    </span>
  `,
  styles: []
})
export class OrdMenuIconComponent implements OnInit {
  @Input() menuItem: TreeNode<ABP.Route>;
  svg = '';
  img = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.menuItem?.iconClass?.indexOf('.svg') > 0) {
      this.svg = './assets/menu-icons/' + this.menuItem.iconClass
    }
    if (this.menuItem?.iconClass?.indexOf('.png') > 0) {
      this.img = './assets/menu-icons/' + this.menuItem.iconClass
    }
    if (this.menuItem?.iconClass?.indexOf('.jpg') > 0) {
      this.img = './assets/menu-icons/' + this.menuItem.iconClass
    }
  }

}
