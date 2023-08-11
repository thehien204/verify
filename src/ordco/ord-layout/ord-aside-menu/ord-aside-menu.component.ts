import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ABP} from '@abp/ng.core';
import {TreeNode} from '@abp/ng.core/lib/utils/tree-utils';
import {LayoutMenuRouterService} from '@app-ordco/ord-layout/services/layout-menu-router.service';

@Component({
  selector: 'app-ord-aside-menu',
  templateUrl: './ord-aside-menu.component.html',
  styleUrls: ['./ord-aside-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdAsideMenuComponent implements OnInit {
  @Input() tree: TreeNode<ABP.Route>[] = [];
  @Input() allMenu = false;

  constructor(public readonly menuRouterService: LayoutMenuRouterService) {
  }

  ngOnInit(): void {
    if (this.allMenu) {
      this.tree = this.menuRouterService.tree;
    }
  }

}
