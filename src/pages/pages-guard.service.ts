import {Injectable} from '@angular/core';
import {AuthService, PermissionService} from '@abp/ng.core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@node_modules/@angular/router';
import {OAuthService} from '@node_modules/angular-oauth2-oidc';
import {Observable, of} from '@node_modules/rxjs';

@Injectable()
export class PagesGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private permission: PermissionService,
    private _router: Router,
    private authService: AuthService,
    private oAuthService: OAuthService,
  ) {}

  private canActivateInternal(data: any, state: RouterStateSnapshot): Observable<boolean> {
    if (this.oAuthService.hasValidAccessToken() === false) {
      this.authService.init().then((res) => {
        this._router.navigateByUrl('/auth/login').then();
      });
    }

    if (!data || !data['permission']) {
      return of(true);
    }

    if (this.permission.getGrantedPolicy(data['permission'])) {
      return of(true);
    }
    return of(false);
    // this._router.navigate([this.selectBestRoute()]);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivateInternal(route.data, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivateInternal(route.data, null);
  }

}
