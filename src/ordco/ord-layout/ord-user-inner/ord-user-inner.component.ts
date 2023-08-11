import {Component, OnInit} from '@angular/core';
import {AuthService} from '@node_modules/@abp/ng.core';
import {Router} from '@node_modules/@angular/router';
import {UserProfileServiceProxy} from '@service-proxies/verify-service-proxies';
import {switchMap} from 'rxjs/operators';
import {UserSessionStateService} from '@app-ordco/services/user-session-state.service';
import {LocalforageService} from '@app-ordco/services/localforage.service';

@Component({
  selector: 'app-ord-user-inner',
  templateUrl: './ord-user-inner.component.html',
  styles: []
})
export class OrdUserInnerComponent implements OnInit {
  user$ = this.userState.user$;

  constructor(private authService: AuthService,
              private userProfileProxy: UserProfileServiceProxy,
              private userState: UserSessionStateService,
              private localforageService: LocalforageService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.userProfileProxy.clearCacheUser().pipe(switchMap(() => {
      return this.authService.logout();
    })).subscribe(() => {
      sessionStorage.clear();
      localStorage.clear();
      location.href = '/auth/login';
      // this.router.navigateByUrl('/auth/login').then();
    });
  }

  refreshUserSession() {
    this.userProfileProxy.clearCacheUser().subscribe(d => {
      sessionStorage.clear();
      this.localforageService.DELETE_ALL();
      location.href = '/';
    })
  }
}
