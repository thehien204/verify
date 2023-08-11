import {Injectable} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {Observable} from '@node_modules/rxjs';
import {debounceTime} from 'rxjs/operators';
import {takeUntil, tap} from '@node_modules/rxjs/operators';
import {DestroyRxjsService} from '@node_modules/@orendaco/of';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  MINUTES_UNITL_AUTO_LOGOUT = 15; // in mins
  CHECK_INTERVAL = 30000; // in ms
  timeStamp = Date.now();
  reset$ = new Subject<number>();

  constructor() {
  }

  initListener(destroy$: DestroyRxjsService): Observable<boolean> {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
    this.reset$.pipe(debounceTime(10000),
      takeUntil(destroy$),
      tap((v: number) => {
        this.timeStamp = v;
      })).subscribe();
    return interval(this.CHECK_INTERVAL).pipe(takeUntil(destroy$),
      map(() => {
        const now = Date.now();
        const timeleft = this.timeStamp + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        return diff < 0;
      }));
  }

  reset() {
    this.reset$.next(Date.now());
  }
}
