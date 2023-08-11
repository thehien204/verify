import {Injectable, Injector} from '@angular/core';
import {Observable} from '@node_modules/rxjs';
import {catchError, tap} from 'rxjs/operators';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {ConfigStateService, RestService} from '@abp/ng.core';
import {BaseStateService} from '@app-ordco/services/base-state.service';
import {environment} from '../../environments/environment';
import {UserSessionDto} from '@service-proxies/verify-service-proxies';
import {OAuthService} from "@node_modules/angular-oauth2-oidc";


interface State {
  userSession: UserSessionDto;
}

const initialState: State = {
  userSession: null
};

@Injectable({
  providedIn: 'root'
})
export class UserSessionStateService extends BaseStateService<State> {
  private _user: UserSessionDto = null;
  user$: Observable<UserSessionDto> = this.select(state => state.userSession);

  get user(): UserSessionDto {
    return this._user;
  }

  constructor(private rest: RestService,
              private inject: Injector) {
    super(initialState);
  }

  getUserSession(): Observable<NzSafeAny> {
    const proxy$ = this.rest.request<void, UserSessionDto>({
      method: 'GET',
      url: '/api/app/user-profile/get-user-session'
    }, {
      apiName: 'danhMuc'
    });
    return proxy$
      .pipe(tap(user => {
        this.setState({userSession: user});
        this._user = user;
        if (!environment.production) {
          console.log('UserSession', this._user);
        }
        if (user) {
          this.setAppConfiguration(user)
        } else {
          const oAuthService = this.inject.get(OAuthService);
          if (oAuthService.hasValidAccessToken()) {
            localStorage.clear();
            sessionStorage.clear();
            location.href = '/auth/login';
          }
        }
      })).pipe(catchError((err, caught) => {
        localStorage.clear();
        sessionStorage.clear();
        return err;
      }));
  }

  setAppConfiguration(user: UserSessionDto) {
    const config: ConfigStateService = this.inject.get(ConfigStateService);
    const grantedPolicies = {};
    if (user?.grantedPermissions?.length > 0) {
      user.grantedPermissions.forEach(permissionName => {
        grantedPolicies[permissionName] = true;
      })
    }

    config.setState({
      localization: null,
      auth: {
        grantedPolicies: grantedPolicies,
        policies: grantedPolicies
      },
      setting: null,
      currentUser: user as NzSafeAny,
      features: null,
      multiTenancy: null,
      currentTenant: null,
      timing: null,
      clock: null,
      objectExtensions: null
    });
    //config.setState(config);
  }

}


