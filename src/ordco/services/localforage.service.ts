import {Injectable} from '@angular/core';
import * as localforage from 'localforage';
import {from, Observable} from 'rxjs';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {retry, take} from 'rxjs/operators';
import {switchMap, tap} from '@node_modules/rxjs/operators';
import {of} from '@node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalforageService {

  constructor() {
    localforage.config({
      name: 'WebApp'
    });
  }

  get localforage() {
    return localforage;
  }

  get(key: string) {
    return localforage.getItem(key);
  }

  getOrAdd(key: string, getValue$: Observable<NzSafeAny>): Observable<NzSafeAny> {
    return from(this.get(key)).pipe(take(1),
      retry(2),
      switchMap((cache) => {
        if (cache) {
          return of(cache);
        } else {
          return getValue$.pipe(tap(v => {
            if (v) {
              this.set(key, v).then();
            }
          }));
        }
      })
    );
  }

  set(key: string, value: any) {
    return localforage.setItem(key, value);
  }

  remove(key: string) {
    return localforage.removeItem(key);
  }

  DELETE_ALL(): void {
    localforage.clear().then();
  }

  listKeys() {
    return localforage.keys();
  }

}
