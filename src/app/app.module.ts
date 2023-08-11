import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AbpModule} from '@app/../abp/abp.module';
import {NZ_I18N, vi_VN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from '@node_modules/ngx-spinner';
import {translateConfig} from '@app-ordco/utils/translate-init-fatory';
import {NgxsModule} from '@node_modules/@ngxs/store';
import {environment} from '../environments/environment';
import {ReuseTabModuleConfigModule} from '@app-ordco/utils/reuse-tab-config.module';
// import {AngularFireModule} from "@node_modules/@angular/fire/compat";
// import {AngularFireMessagingModule} from "@node_modules/@angular/fire/compat/messaging";

registerLocaleData(vi);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AbpModule,
    TranslateModule.forRoot(translateConfig),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    ReuseTabModuleConfigModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireMessagingModule,
  ],
  providers: [

    {provide: NZ_I18N, useValue: vi_VN}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
