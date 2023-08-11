import {Pipe, PipeTransform} from '@angular/core';
import {TreeNode} from '@node_modules/@abp/ng.core/lib/utils/tree-utils';
import {ABP} from '@node_modules/@abp/ng.core';
import {CheckShowMenuService} from '@app-ordco/ord-layout/services/check-show-menu.service';

@Pipe({
  name: 'showMenuItem'
})
export class ShowMenuItemPipe implements PipeTransform {
  constructor(
    private checkShowMenuService: CheckShowMenuService
  ) {
  }

  transform(item: TreeNode<ABP.Route>, ignoreCheckVisible = false): boolean {
    return this.checkShowMenuService.isShow(item, ignoreCheckVisible);
  }
}
