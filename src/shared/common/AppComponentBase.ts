import { Injector } from '@angular/core';
import { PermissionService, SessionStateService } from '@node_modules/@abp/ng.core';
import { TranslateService } from '@node_modules/@ngx-translate/core';
import { OAuthService } from '@node_modules/angular-oauth2-oidc';

export abstract class AppComponentBase {
  isLogin = false;
  curTenant = '';

  private permissionService: PermissionService;
  private tranSrv: TranslateService;
  private sessionService: SessionStateService;

  protected constructor(injector: Injector) {
    this.permissionService = injector.get(PermissionService);
    this.tranSrv = injector.get(TranslateService);
    this.sessionService = injector.get(SessionStateService);

    const oAuthen = injector.get(OAuthService);
    this.isLogin = oAuthen.hasValidAccessToken();
    this.curTenant = this.sessionService.getTenant()?.name;
  }

  l(value: string, params?: any) {
    return this.tranSrv.instant(value, params);
  }

  isGranted(permissionName: string): boolean {
    return this.permissionService.getGrantedPolicy(permissionName);
    // return true; //this.permission.isGranted(permissionName);
  }
}
