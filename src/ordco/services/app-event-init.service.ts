import {Injectable} from '@angular/core';
import {NgxSpinnerService} from '@node_modules/ngx-spinner';
import {Toaster, ToasterService} from '@node_modules/@abp/ng.theme.shared';
import {OCoreUtilityService} from '@orendaco/of';
import {RestService} from '@abp/ng.core';
import {TranslateService} from '@node_modules/@ngx-translate/core';
import {OAuthService} from '@node_modules/angular-oauth2-oidc';
import {Router} from '@node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppEventInitService {

  constructor(private spinnerService: NgxSpinnerService,
              private toaster: ToasterService,
              private restService: RestService,
              private router: Router,
              private translate: TranslateService,
              private oAuthService: OAuthService
  ) {
    this.translate.setDefaultLang('vn');
    this.translate.use('vn');
    // if (!this.oAuthService.hasValidAccessToken()) {
    //   this.router.navigateByUrl('/auth/login').then();
    // }
  }

  init() {
    this.initUi();
    sessionStorage.setItem('CONFIG_ERR_MESS', 'nullOrWhiteSpace');
  }

  private initUi() {
    const options: Partial<Toaster.ToastOptions> = {
      life: 5000,
      sticky: false,
      closable: true,
      tapToDismiss: true
    };
    abp.event.on('event@abp.ui.setBusy', () => {
      this.spinnerService.show('main-page');
    });
    abp.event.on('event@abp.ui.clearBusy', () => {
      this.spinnerService.hide('main-page');
    });


    abp.event.on('event@abp.notify.error', (d) => {
      this.toaster.clear();
      if (OCoreUtilityService.isNullOrEmpty(d.title)) {
        d.title = 'Lỗi';
      }
      if (d.message === 'invalid') {
        d.message = 'Thông tin chưa đầy đủ hoặc không hợp lệ!';
        d.title = 'KIỂM TRA LẠI THÔNG TIN';
      }
      this.toaster.error(d.message, d.title, options);
    });
    abp.event.on('event@abp.notify.info', (d) => {
      this.toaster.clear();
      this.toaster.info(d.message, d.title, options);
    });
    abp.event.on('event@abp.notify.success', (d) => {
      this.toaster.clear();
      if (OCoreUtilityService.isNullOrEmpty(d.title)) {
        d.title = 'THAO TÁC THÀNH CÔNG';
      }
      this.toaster.success(d.message, d.title, options);
    });
  }
}
