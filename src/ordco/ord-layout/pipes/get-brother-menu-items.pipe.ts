import {Pipe, PipeTransform} from '@angular/core';
import {TreeNode} from '@node_modules/@abp/ng.core/lib/utils/tree-utils';
import {ABP} from '@node_modules/@abp/ng.core';
import {LayoutMenuRouterService} from '@app-ordco/ord-layout/services/layout-menu-router.service';
import * as _ from 'lodash';

@Pipe({
  name: 'getBrotherMenuItems'
})
export class GetBrotherMenuItemsPipe implements PipeTransform {
  constructor(private readonly menuRouterService: LayoutMenuRouterService) {
  }

  transform(name: string): TreeNode<ABP.Route>[] {
    let menuItem = _.cloneDeep(this.menuRouterService.getTreeNodeByName(name));
    const parent = menuItem.parent;
    return parent.children;
    if (parent && parent.children?.length > 0) {
      return parent.children.filter(x => x.name !== name);
    }
    return []
  }

}
