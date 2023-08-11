import {Component, OnInit} from '@angular/core';
import {DoanhNghiepDto, DoanhNghiepServiceProxy} from "@service-proxies/verify-service-proxies";
import {ActivatedRoute, Router} from "@node_modules/@angular/router";
import {filter, switchMap} from "@node_modules/rxjs/internal/operators";
import {MenuService} from "@node_modules/@delon/theme";
import {ReuseTabService} from "@node_modules/@delon/abc/reuse-tab";
import {PermissionService} from "@node_modules/@abp/ng.core";

@Component({
  selector: 'app-chi-tiet-doanh-nghiep',
  templateUrl: './chi-tiet-doanh-nghiep.component.html',
  styles: []
})
export class ChiTietDoanhNghiepComponent implements OnInit {
  doanhNghiepModeDto: DoanhNghiepDto;
  currentTab = 'san-pham';

  constructor(private doanhNghiepServiceProxy: DoanhNghiepServiceProxy,
              private route: ActivatedRoute,
              private router: Router,
              private ngAlainMenuService: MenuService,
              private reuseTabService: ReuseTabService,
              private permissionService: PermissionService) {
  }

  ngOnInit(): void {
    const hasPermission = this.permissionService.getGrantedPolicy('Verify.QuanTriDoanhNghiep');
    if (!hasPermission) {
      this.router.navigateByUrl('/');
    }
    this.getDoanhNghiepDetail();
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }

  getDoanhNghiepDetail() {
    this.route.params.pipe(
      filter((params) => params.id),
      switchMap((params) => {
        return this.doanhNghiepServiceProxy.getById(params?.id)
      })
    ).subscribe(dto => {
      this.doanhNghiepModeDto = dto;
      this.addReuseTabService();

    }, error => {
      this.router.navigateByUrl('/doanh-nghiep/quan-ly-doanh-nghiep').then();
    });
  }

  private addReuseTabService() {
    const title = 'Doanh nghiệp: ' + this.doanhNghiepModeDto.maDoanhNghiep;
    this.ngAlainMenuService.add([...this.ngAlainMenuService.menus, {
      text: title,
      reuse: true,
      link: '/doanh-nghiep/chi-tiet/' + this.doanhNghiepModeDto.id
    }]);
    this.reuseTabService.title = title;
  }
}
