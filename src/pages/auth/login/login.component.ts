import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@node_modules/@abp/ng.core';
import {UserSessionStateService} from '@app-ordco/services/user-session-state.service';
import {finalize} from '@node_modules/rxjs/operators';
import {OAuthService} from 'angular-oauth2-oidc';
import {ExternalLoginProvider, LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl: string;
  isLoading$ = new BehaviorSubject(false);
  externalLoginProviders: ExternalLoginProvider[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private oAuthService: OAuthService,
    private userSessionService: UserSessionStateService,
    public loginService: LoginService,
  ) {
    if (this.oAuthService.hasValidAccessToken()) {
      this.loginSuccess();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.loginService.init(() => {
      this.externalLoginProviders = this.loginService.externalLoginProviders;
    });
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.isLoading$.next(true);
      abp.ui.setBusy();
      this.authService.login({
        username: this.loginForm.value.userName,
        password: this.loginForm.value.password,
        rememberMe: true,
        redirectUrl: ''
      }).pipe(finalize(() => {
        this.isLoading$.next(false);
        abp.ui.clearBusy();
      })).subscribe(() => {
        this.userSessionService.getUserSession().subscribe(d => {
          this.loginSuccess();
        });
      }, () => {
        abp.notify.error('Tên đăng nhập hoặc mật khẩu không đúng', 'Đăng nhập thất bại');
      });
      return;
    }
    abp.notify.error('Nhập đầy đủ thông tin tên đăng nhập, mật khẩu', 'Thông tin không hợp lệ');
  }

  loginSuccess() {

    this.router.navigateByUrl(this.returnUrl).then();
  }

  externalLogin(provider: ExternalLoginProvider) {
    this.loginService.externalAuthenticate(provider);
  }
}
