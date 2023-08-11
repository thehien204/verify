import {ReuseTabModule, ReuseTabService, ReuseTabStrategy} from '@node_modules/@delon/abc/reuse-tab';
import {NgModule} from '@angular/core';
import {RouteReuseStrategy} from '@node_modules/@angular/router';
import {DELON_LOCALE, en_US as delonLang} from '@node_modules/@delon/theme';

@NgModule({
  imports: [ReuseTabModule],
  exports: [ReuseTabModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: ReuseTabStrategy,
      deps: [ReuseTabService]
    },
    { provide: DELON_LOCALE, useValue: delonLangVn() }
  ]
})
export class ReuseTabModuleConfigModule {
}

export function delonLangVn() {
  const v = delonLang;
  v.reuseTab.close = 'Đóng';
  v.reuseTab.closeOther = 'Đóng tab khác';
  v.reuseTab.closeRight = 'Đóng tab bên phải';
  v.reuseTab.refresh = 'Tải lại';
  return v;
}
