import {Injectable} from '@angular/core';
import {TreeNode} from '@abp/ng.core/lib/utils/tree-utils';
import {ABP, RoutesService} from '@abp/ng.core';

@Injectable({
  providedIn: 'root'
})
export class LayoutMenuRouterService {
  private _tree: TreeNode<ABP.Route>[];
  private _flat: ABP.Route[];

  constructor(
    private routesService: RoutesService
  ) {
  }

  get tree(): TreeNode<ABP.Route>[] {
    if (this._tree) {
      return this._tree;
    }
    this._tree = this.routesService.tree.filter(x => x.name.indexOf('Abp') < 0);
    return this._tree;
  }

  get flat(): ABP.Route[] {
    if (this._flat) {
      return this._flat;
    }
    this._flat = this.routesService.flat;
    return this._tree;
  }

  getTreeNodeByName(name: string): TreeNode<ABP.Route> {
    const f = this.flat.find(x => x.name === name);
    if (!f) {
      return null;
    }
    return this.routesService.search(f, this.tree);
  }

  getTreeNodeByPath(path: string): TreeNode<ABP.Route> {
    const f = this.flat.find(x => x.path === path);
    if (!f) {
      return null;
    }
    return this.routesService.search(f, this.tree);
  }
}
