import {NgModule} from '@angular/core';
import {getDefaultUrl} from './api-url.service';
import {
  ComboBoxDataServiceProxy,
  VERIFY_API_URL,
  SysRoleServiceProxy,
  SysUserServiceProxy,
  UserProfileServiceProxy,
  DoanhNghiepServiceProxy,
  TokenAuthServiceProxy,
  SanPhamServiceProxy,
  BangGiaDichVuServiceProxy,
  GoiDichVuServiceProxy,
  NotificationsServiceProxy,
  UserFireBaseTokensServiceProxy,
  DanhGiaSanPhamManagerServiceProxy, QuanLyGoiDichVuDnDangKyServiceProxy,
  ProductMobileServiceProxy,
  DoanhNghiep_MaToanCauServiceProxy, HopDongGoiDvDoanhNghiepServiceProxy, PictureServiceProxy,
  SysAuditLogServiceProxy,
  BaoCaoServiceProxy
} from '@service-proxies/verify-service-proxies';
import {OrdUploadDownloadServiceProxies} from "@service-proxies/ord-upload-download.service";


@NgModule({
  providers: [
    {provide: VERIFY_API_URL, useFactory: getDefaultUrl},
    OrdUploadDownloadServiceProxies,
    PictureServiceProxy,
    ComboBoxDataServiceProxy,
    SysRoleServiceProxy,
    SysUserServiceProxy,
    UserProfileServiceProxy,
    DoanhNghiepServiceProxy,
    TokenAuthServiceProxy,
    SanPhamServiceProxy,
    BangGiaDichVuServiceProxy,
    GoiDichVuServiceProxy,
    NotificationsServiceProxy,
    UserFireBaseTokensServiceProxy,
    DanhGiaSanPhamManagerServiceProxy,
    QuanLyGoiDichVuDnDangKyServiceProxy,
    ProductMobileServiceProxy,
    DoanhNghiep_MaToanCauServiceProxy,
    HopDongGoiDvDoanhNghiepServiceProxy,
    SysAuditLogServiceProxy,
    BaoCaoServiceProxy
  ]
})
export class ServiceProxyModule {
}
