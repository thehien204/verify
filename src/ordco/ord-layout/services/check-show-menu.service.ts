import {Injectable} from '@angular/core';
import {TreeNode} from '@abp/ng.core/lib/utils/tree-utils';
import {ABP, PermissionService} from '@abp/ng.core';
import {OCoreUtilityService} from '@node_modules/@orendaco/of';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CheckShowMenuService {
  constructor(
    private permissionService: PermissionService
  ) {
  }

  public isShow(item: TreeNode<ABP.Route>, ignoreCheckVisible = false): boolean {
    return this.checkNode(item, ignoreCheckVisible);
  }

  private checkNode(item: TreeNode<ABP.Route>, ignoreCheckVisible: boolean): boolean {
    const check = (ignoreCheckVisible || !!!item.invisible) && this.checkRequiredPolicy(item);
    if (!check) {
      return false;
    }
    if (!item.isLeaf) {
      return this.checkChildren(item.children, ignoreCheckVisible);
    }
    return true;
  }

  private checkRequiredPolicy(item: TreeNode<ABP.Route>): boolean {
    return OCoreUtilityService.isNullOrEmpty(item.requiredPolicy) ||
      this.permissionService.getGrantedPolicy(item.requiredPolicy);
  }

  private checkChildren(children: TreeNode<ABP.Route>[], ignoreCheckVisible: boolean): boolean {
    let f = false;
    _.forEach(children, (child) => {
      const check = this.checkNode(child, ignoreCheckVisible);
      if (check) {
        f = true;
        return false;
      }
    });
    return f;
  }


}
