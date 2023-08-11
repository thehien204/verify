import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from '@node_modules/@angular/router';
import {LayoutMenuRouterService} from '@app-ordco/ord-layout/services/layout-menu-router.service';
import {TreeNode} from '@node_modules/@abp/ng.core/lib/utils/tree-utils';
import {ABP} from '@node_modules/@abp/ng.core';

@Component({
  selector: 'app-ord-header-menu',
  templateUrl: './ord-header-menu.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdHeaderMenuComponent implements OnInit {
  @Input() tree: TreeNode<ABP.Route>[] = [];
  @Input() allMenu = false;

  constructor(private router: Router,
              public readonly menuRouterService: LayoutMenuRouterService) {
  }

  ngOnInit(): void {
    if (this.allMenu) {
      this.tree = this.menuRouterService.tree;
    }

  }

  calculateMenuItemCssClass(name: string): string {
    const url = this.router.url;
    const f = this.menuRouterService.getTreeNodeByPath(url);
    if (!f) {
      return '';
    }
    if (f.name === name) {
      return 'active';
    }
    return this.checkActiveParent(f.parent, name);
  }

  private checkActiveParent(parent: TreeNode<ABP.Route>, name: string): string {
    if (!parent) {
      return '';
    }
    if (parent.name === name) {
      return 'active';
    }
    return this.checkActiveParent(parent?.parent, name);
  }

}
