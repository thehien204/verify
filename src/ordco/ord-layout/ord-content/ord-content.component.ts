import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, Router} from '@angular/router';
import {DrawerComponent} from '@app/_metronic/kt/components';
import {DestroyRxjsService} from '@orendaco/of';
import {takeUntil} from 'rxjs/operators';
import {ReuseTabMenuService} from '@app-ordco/services/reuse-tab-menu.service';

@Component({
  selector: 'app-ord-content',
  template: `
    <reuse-tab #reuseTab></reuse-tab>
    <app-ord-breadcrumb></app-ord-breadcrumb>
    <router-outlet (activate)='reuseTab.activate($event)'></router-outlet>
    <nz-back-top nzVisibilityHeight='250'></nz-back-top>
  `,
  providers: [DestroyRxjsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdContentComponent implements OnInit {

  constructor(private router: Router,
              private reuseTabMenuService: ReuseTabMenuService,
              private destroy$: DestroyRxjsService) {

  }

  ngOnInit(): void {
    this.reuseTabMenuService.addAllMenu();
    this.routingChanges();
  }

  routingChanges() {
    this.router.events.pipe(takeUntil(this.destroy$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
          DrawerComponent.hideAll();
        }
      });
  }
}
