import {NZ_DATE_LOCALE, NZ_I18N} from 'ng-zorro-antd/i18n';
import {vi_VN} from '@node_modules/ng-zorro-antd/i18n';
import {NZ_DATE_LOCALE as dateOf, NZ_I18N as i18Of} from '@orendaco/of';
import {vi as viDate} from 'date-fns/locale';
import {APP_INITIALIZER, Injector, LOCALE_ID} from '@angular/core';
import {LOCATION_INITIALIZED, PlatformLocation} from '@node_modules/@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin} from '@node_modules/rxjs';
import {UserSessionStateService} from '@app-ordco/services/user-session-state.service';
import {OAuthService} from '@node_modules/angular-oauth2-oidc';

export const APP_ORD_CO_EXTENSION_PROVIDER = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [Injector, PlatformLocation, TranslateService],
    multi: true
  },
  {
    provide: NZ_I18N, useValue: getNzI18nViVn()
  },
  {
    provide: NZ_DATE_LOCALE, useValue: viDate
  },
  {
    provide: i18Of, useValue: getNzI18nViVn()
  },
  {
    provide: dateOf, useValue: viDate
  },
  {provide: LOCALE_ID, useValue: "vi_VN"},
];


export function getNzI18nViVn() {
  const v = vi_VN;
  v.Pagination.jump_to = 'Đến trang: ';
  v.Pagination.items_per_page = 'bản ghi/ trang';
  return v;
}

function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation,
                               translate: TranslateService) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    const defaultLang = 'vn';
    translate.addLangs(['vn']);
    translate.setDefaultLang(defaultLang);
    try {
      const loader$ = [
        translate.use(defaultLang)
      ];
      const oAuthService = injector.get(OAuthService);
      if (oAuthService.hasValidAccessToken()) {
        const userSessionStateService = injector.get(UserSessionStateService);

        loader$.push(userSessionStateService.getUserSession());
      }
      await forkJoin(loader$).toPromise();
    } catch (err) {
      console.log(err);
    }
    console.log(`Successfully initialized ${defaultLang} language.`);
  };
}
