import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {IPermissionDto} from '../roles/sys-role-proxy.service';
import {ArrayService} from '@delon/util';
import {NzTreeNode} from '@node_modules/ng-zorro-antd/core/tree';
import {OCoreUtilityService} from "@node_modules/@orendaco/of";
import {TranslatePipe} from "@node_modules/@ngx-translate/core";


@Component({
  selector: 'app-permission-tree',
  templateUrl: './permission-tree.component.html',
  styles: [],
  providers: [TranslatePipe]
})
export class PermissionTreeComponent implements AfterViewInit {
  @Input() set flatPermissions(permissions: IPermissionDto[]) {
    this._flatPermissions = permissions;
    if (!OCoreUtilityService.isNotAnyItem(this._flatPermissions)) {
      this._flatPermissions.forEach(it => {
        it.displayName = this.translatePipe.transform(it.displayName);
      })
    }
    this.builderTree();
  }

  @Input() grantedPermissions: string[] = [];
  @Output() countGranted = new EventEmitter();
  treePermission = [];
  private _flatPermissions: IPermissionDto[] = [];
  checkedAll = false;

  expandAll = false;

  constructor(private arrayService: ArrayService,
              private translatePipe: TranslatePipe) {
  }

  ngAfterViewInit(): void {
    this.onCheckboxChange();
  }

  builderTree() {
    this.treePermission = this.arrayService.arrToTreeNode(this._flatPermissions, {
      idMapName: 'name',
      parentIdMapName: 'parentName',
      titleMapName: 'displayName',
      cb: item => {
        item.expanded = false;
      }
    });
  }

  getGrantedPermissions(): string[] {
    const permissions = [];
    this.arrayService.treeToArr(this.treePermission).forEach(item => {
      if (item.isChecked || item.isHalfChecked) {
        permissions.push(item.key);
      }
    });
    return permissions;
  }

  onExpandAll() {
    this.expandAll = !this.expandAll;
    setTimeout(() => {
      this.expandAll = true;
    })
  }

  onCheckAll() {
    this.setCheckAll(this.treePermission, this.checkedAll);
  }

  private setCheckAll(tree: NzTreeNode[], checked: boolean) {
    tree.forEach(item => {
      item.setChecked(checked);
      this.setCheckAll(item.children, checked);
    });
    setTimeout(() => {
      this.emitCountGranted();
    });
  }

  onCheckboxChange() {
    const granted = this.getGrantedPermissions();
    this.checkedAll = granted?.length === this._flatPermissions.length;
    this.emitCountGranted();
  }

  private emitCountGranted() {
    const count = this.getGrantedPermissions().length || 0;
    this.countGranted.emit(count);

  }
}
