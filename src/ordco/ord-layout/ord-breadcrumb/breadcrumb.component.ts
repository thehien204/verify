import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ABP, RoutesService} from '@abp/ng.core';
import {TreeNode} from '@abp/ng.core/lib/utils/tree-utils';
import {DestroyRxjsService} from '@orendaco/of';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-ord-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyRxjsService],
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements AfterViewInit {
  breadcrumb: TreeNode<ABP.Route>[] = [];

  constructor(
    private _router: Router,
    private routesService: RoutesService,
    private cdr: ChangeDetectorRef,
    private destroy$: DestroyRxjsService
  ) {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getRouterItemMenu();
    });
    this._router.events.pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        setTimeout(() => {
          this.getRouterItemMenu();
        });
      });
  }

  getRouterItemMenu() {
    this.breadcrumb = [];
    const currentNode = this.routesService.find(x => {
      return x.path === this._router.url;
    });
    if (currentNode) {
      this.breadcrumb.push(currentNode);
      this.getParentBreadcrumb(currentNode);
    }
    this.cdr.markForCheck();
  }

  private getParentBreadcrumb(treeNode: TreeNode<ABP.Route>): void {
    if (treeNode.parent) {
      this.breadcrumb = [treeNode.parent, ...this.breadcrumb];
      this.getParentBreadcrumb(treeNode.parent);
    }
  }
}

