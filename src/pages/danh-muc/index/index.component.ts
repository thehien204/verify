import {Component, OnInit} from '@angular/core';
import {TreeNode} from '@abp/ng.core/lib/utils/tree-utils';
import {ABP, RoutesService} from '@node_modules/@abp/ng.core';
import {CheckShowMenuService} from '@app-ordco/ord-layout/services/check-show-menu.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: []
})
export class IndexComponent implements OnInit {
  danhMucNode: TreeNode<ABP.Route>;
  donViHanhChinhGroup: TreeNode<ABP.Route>[];
  sanPhamGroup: TreeNode<ABP.Route>[];

  constructor(private routesService: RoutesService,
              private checkShowMenuService: CheckShowMenuService) {
  }

  ngOnInit(): void {
    this.danhMucNode = this.routesService.find(x => x.name === 'MENU.DANHMUC.GROUP');
    this.getDonViHanhChinhMenu();
    this.getSanPhamMenu();
  }

  getDonViHanhChinhMenu() {
    const names = ['tinh', 'huyen', 'xa'];
    this.donViHanhChinhGroup = this.danhMucNode.children.filter((x) => {
      return names.indexOf(x.name.replace('MENU.DANHMUC.', '').toLowerCase()) > -1
        && this.checkShowMenuService.isShow(x, true);
    });
  }
  getSanPhamMenu() {
    const names = ['nhom-san-pham'];
    this.sanPhamGroup = this.danhMucNode.children.filter((x) => {
      return names.indexOf(x.name.replace('MENU.DANHMUC.', '').toLowerCase()) > -1
        && this.checkShowMenuService.isShow(x, true);
    });
  }
}
