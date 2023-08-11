import {Injectable, Injector} from '@angular/core';
import {RoutesService} from '@node_modules/@abp/ng.core';
import {Menu, MenuService} from '@node_modules/@delon/theme';
import {TranslateService} from '@node_modules/@ngx-translate/core';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReuseTabMenuService {

  constructor(private injector: Injector,
              private translate: TranslateService,
              private ngAlainMenuService: MenuService,
              private routesService: RoutesService) {
  }

  addAllMenu() {
    const allMenuFlat = this.routesService.flat;
    const arr$ = allMenuFlat.map(m => {
      return this.translate.get(m.name).pipe(map(name => {
        return {
          link: m.path,
          text: name,
          reuse: true
        };
      }));
    });
    forkJoin(arr$).subscribe(menus => {
      this.ngAlainMenuService.add(menus);
    });
  }

  addOneMenu(item: Menu) {
    this.ngAlainMenuService.add([...this.ngAlainMenuService.menus, item]);
  }
}
