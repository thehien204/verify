import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';
import {RouterModule, Routes} from '@angular/router';
import {NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule,} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationModule} from '@app/modules/i18n';
import {LayoutComponent} from './layout.component';
import {ExtrasModule} from '@app/_metronic/partials';
import {AsideComponent} from './components/aside/aside.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {FooterComponent} from './components/footer/footer.component';
import {ScriptsInitComponent} from './components/scripts-init/scripts-init.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {AsideMenuComponent} from './components/aside/aside-menu/aside-menu.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {PageTitleComponent} from './components/header/page-title/page-title.component';
import {HeaderMenuComponent} from './components/header/header-menu/header-menu.component';
import {OrdLayoutModule} from '@app-ordco/ord-layout/ord-layout.module';
import {LayoutNotAsideComponent} from './layout-not-aside/layout-not-aside.component';
import {Routing} from '../../../pages/routing';
import {PagesGuardService} from "../../../pages/pages-guard.service";

const routes: Routes = [

  {
    path: '',
    component: LayoutNotAsideComponent,
    children: Routing
  },

];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    AsideMenuComponent,
    TopbarComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    LayoutNotAsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    NgbTooltipModule,
    TranslateModule,
    OrdLayoutModule
  ],
  providers: [
    PagesGuardService
  ],
  exports: [RouterModule],
})
export class LayoutModule {
}
