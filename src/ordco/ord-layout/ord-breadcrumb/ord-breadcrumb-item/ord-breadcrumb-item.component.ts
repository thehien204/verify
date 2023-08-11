import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TreeNode} from '@node_modules/@abp/ng.core/lib/utils/tree-utils';
import {ABP} from '@node_modules/@abp/ng.core';

@Component({
  selector: 'app-ord-breadcrumb-item',
  templateUrl: './ord-breadcrumb-item.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdBreadcrumbItemComponent implements OnInit {
  @Input() breadItem: TreeNode<ABP.Route>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
