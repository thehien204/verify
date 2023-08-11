import {NgModule} from '@angular/core';
import {CoreModule} from '@abp/ng.core';
import {ThemeSharedModule} from '@abp/ng.theme.shared';
import {registerLocale} from '@abp/ng.core/locale';
import {Error404Component} from '@app/modules/errors/error404/error404.component';
import {environment} from '../environments/environment';
import {APP_ROUTE_PROVIDER} from './route.provider';
import {ServiceProxyModule} from '@service-proxies/service-proxy.module';
import {APP_ORD_CO_EXTENSION_PROVIDER} from '@app-ordco/utils/app-ordco-provider';
import {ErrorIntercept} from '@app-ordco/utils/error-intercept';
import {HTTP_INTERCEPTORS} from '@node_modules/@angular/common/http';

@NgModule({
  imports: [
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
      skipGetAppConfiguration: true
    }),
    ThemeSharedModule.forRoot({
      httpErrorConfig: {
        errorScreen: {
          component: Error404Component,
          forWhichErrors: [401, 403, 404, 500],
          hideCloseIcon: true,
        },
      },
    }),
    ServiceProxyModule
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    ServiceProxyModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    APP_ROUTE_PROVIDER,
    ...APP_ORD_CO_EXTENSION_PROVIDER
  ],
})
export class AbpModule {
}
