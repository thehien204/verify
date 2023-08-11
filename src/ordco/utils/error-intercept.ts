import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export class ErrorIntercept implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf('application-configuration') > -1) {
      request = request.clone({
        setHeaders: {IgnoreGetAppConfiguration: '1'}
      });
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error?.error?.error?.message) {
            abp.notify.error(error.error.error.message);
            return throwError(error);
          }
          return throwError(error);
        })
      );
  }
}

