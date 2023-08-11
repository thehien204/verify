import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];


function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/dashboard',
        name: 'MENU.DASHBOARD',
        iconClass: 'dashboard.svg',
        order: 2,
        layout: eLayoutType.application,
        requiredPolicy: '',
      },
    ]);
    routes.add([
      {
        path: '',
        name: 'MENU.DOANH_NGHIEP_SAN_PHAM',
        iconClass: 'fa fa-building',
        order: 2,
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDoanhNghiep',
      },
      {
        path: '/doanh-nghiep/quan-ly-doanh-nghiep',
        name: 'MENU.DS_DOANH_NGHIEP',
        parentName: 'MENU.DOANH_NGHIEP_SAN_PHAM',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDoanhNghiep',
      },
      {
        path: '/doanh-nghiep/ds-doanh-nghiep-noi-bat',
        name: 'MENU.DS_DOANH_NGHIEP_NOI_BAT',
        parentName: 'MENU.DOANH_NGHIEP_SAN_PHAM',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDoanhNghiepNoiBat',
      },
      {
        path: '/doanh-nghiep/ds-san-pham',
        name: 'MENU.DS_SAN_PHAM',
        parentName: 'MENU.DOANH_NGHIEP_SAN_PHAM',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriSanPham',
      },
      {
        path: '/doanh-nghiep/ds-san-pham-noi-bat',
        name: 'MENU.DS_SAN_PHAM_NOI_BAT',
        parentName: 'MENU.DOANH_NGHIEP_SAN_PHAM',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriSanPhamNoiBat',
      },
      {

        path: '/doanh-nghiep/ds-danh-gia-san-pham',
        name: 'MENU.DS_DANH_GIA_SAN_PHAM',
        parentName: 'MENU.DOANH_NGHIEP_SAN_PHAM',
        layout: eLayoutType.application,

        requiredPolicy: 'Verify.QuanLyDanhGiaSanPham',
      }
    ]);

    routes.add([
      {
        path: '',
        name: 'MENU.DICH_VU',
        iconClass: 'dich-vu.svg',
        order: 3,
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDichVu',
      },
      {
        path: '/dich-vu/loai-dich-vu',
        name: 'MENU.LOAI_DICH_VU',
        parentName: 'MENU.DICH_VU',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDichVu',
      },
      {
        path: '/dich-vu/bang-gia-dich-vu',
        name: 'MENU.BANG_GIA_DICH_VU',
        parentName: 'MENU.DICH_VU',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDichVu',
      },
      {
        path: '/dich-vu/goi-dich-vu',
        name: 'MENU.GOI_DICH_VU',
        parentName: 'MENU.DICH_VU',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDichVu',
      },
      {
        path: '/dich-vu/quan-ly-dang-ky-goi',
        name: 'MENU.QUAN_LY_DANG_KY_GOI',
        parentName: 'MENU.DICH_VU',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.QuanTriDichVu',
      },

    ]);
    routes.add([
      {
        path: '/banner/list',
        name: 'MENU.BANNER',
        iconClass: 'banner.png',
        order: 4,
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.Banner',
      }
    ]);
    routes.add([
      {
        path: '/notifications/list',
        name: 'MENU.THONG_BAO',
        iconClass: 'dashboard.svg',
        order: 4,
        layout: eLayoutType.application,
        requiredPolicy: '',
      }
    ]);

    routes.add([
      {
        path: '',
        name: 'MENU.BAO_CAO',
        iconClass: 'bao-cao.svg',
        order: 5,
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.BaoCao'
      },
      {
        path: '/bao-cao/bao-cao-luot-view',
        name: 'MENU.BAO_CAO_LUOT_VIEW',
        parentName: 'MENU.BAO_CAO',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.BaoCao'
      },
      {
        path: '/bao-cao/bao-cao-luot-quet',
        name: 'MENU.BAO_CAO_LUOT_QUET',
        parentName: 'MENU.BAO_CAO',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.BaoCao'
      },
      {
        path: '/bao-cao/bao-cao-tai-khoan',
        name: 'MENU.BAO_CAO_TAI_KHOAN',
        parentName: 'MENU.BAO_CAO',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.BaoCao'
      },
      {
        path: '/bao-cao/bao-cao-hop-dong',
        name: 'MENU.BAO_CAO_HOP_DONG',
        parentName: 'MENU.BAO_CAO',
        layout: eLayoutType.application,
        requiredPolicy: 'Verify.BaoCao'
      }
    ])

    addQuanTriRoutes(routes);
  };
}


/// Start quản trị group
function addQuanTriRoutes(routes: RoutesService) {
  routes.add([
    {
      path: '',
      name: 'MENU.QUANTRI',
      iconClass: 'quan-tri.svg',
      order: 100,
      layout: eLayoutType.application,
      requiredPolicy: '',
    }
  ]);
  addQuanTriHeThongRoutes(routes);
  addDanhMucRoutes(routes);
}

function addQuanTriHeThongRoutes(routes: RoutesService) {
  routes.add([
    {
      path: '',
      name: 'MENU.QUANTRIHETHONG',
      parentName: 'MENU.QUANTRI',
      iconClass: 'he-thong.svg',
      order: 1,
      layout: eLayoutType.application,
      requiredPolicy: '',
    },
    {
      path: '/admin/users',
      name: 'MENU.NGUOIDUNG',
      parentName: 'MENU.QUANTRIHETHONG',
      iconClass: 'nguoi-dung.svg',
      order: 2,
      layout: eLayoutType.application,
      requiredPolicy: 'QuanTri.NguoiDung',
    },
    {
      path: '/admin/roles',
      name: 'MENU.VAITRO',
      parentName: 'MENU.QUANTRIHETHONG',
      iconClass: 'vai-tro.svg',
      order: 2,
      layout: eLayoutType.application,
      requiredPolicy: 'QuanTri.VaiTro',
    },
    {
      path: '/admin/audit-logs',
      name: 'MENU.AUDIT-LOGS',
      parentName: 'MENU.QUANTRIHETHONG',
      iconClass: 'fa fa-history',
      order: 3,
      layout: eLayoutType.application,
      requiredPolicy: 'QuanTri.AuditLog',
    },
    {
      path: '/admin/version',
      name: 'MENU.VERSION',
      parentName: 'MENU.QUANTRIHETHONG',
      iconClass: 'fa fa-version',
      order: 4,
      layout: eLayoutType.application,
      requiredPolicy: 'QuanTri.Version',
    },
  ]);
}

function addDanhMucRoutes(routes: RoutesService) {
  routes.add([
    {
      path: '/danh-muc/index',
      name: 'MENU.DANHMUC.INDEX',
      parentName: 'MENU.QUANTRI',
      iconClass: 'danh-muc.svg',
      order: 2,
      layout: eLayoutType.application,
      requiredPolicy: 'DanhMuc.Index',
    },
    {
      path: '',
      name: 'MENU.DANHMUC.GROUP',
      parentName: 'MENU.QUANTRI',
      requiredPolicy: '',
      invisible: true
    }]);
  const names = ['tinh', 'huyen', 'xa', 'quoc-gia', 'nhom-san-pham', 'nhom-doanh-nghiep', 'schedule'];
  names.forEach(it => {
    routes.add([
      {
        path: '/danh-muc/' + it,
        name: 'MENU.DANHMUC.' + it.toUpperCase(),
        parentName: 'MENU.DANHMUC.INDEX',
        layout: eLayoutType.application,
        requiredPolicy: 'DanhMuc.' + it
      },
    ])
  })

}

/// End quản trị group
