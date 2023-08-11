import {Routes} from '@angular/router';
import {AuthGuard, PermissionGuard} from '@node_modules/@abp/ng.core';
import {PagesGuardService} from "./pages-guard.service";

const Routing: Routes = [
  {
    path: '',
    canActivate: [PagesGuardService],
    canLoad: [PagesGuardService],
    canActivateChild: [PagesGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'doanh-nghiep',
        loadChildren: () =>
          import('./verify/doanh-nghiep/doanh-nghiep.module').then((m) => m.DoanhNghiepModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'banner',
        loadChildren: () =>
          import('./verify/banner/banner.module').then((m) => m.BannerModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'dich-vu',
        loadChildren: () =>
          import('./verify/dich-vu/dich-vu.module').then((m) => m.DichVuModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then((m) => m.NotificationsModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'danh-muc',
        loadChildren: () =>
          import('./danh-muc/danh-muc.module').then((m) => m.DanhMucModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'bao-cao',
        loadChildren: () =>
        import('./verify/bao-cao/bao-cao.module').then((m) => m.BaoCaoModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export {Routing};
