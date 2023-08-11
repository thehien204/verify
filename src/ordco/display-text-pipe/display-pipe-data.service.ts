import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {LocalforageService} from '@app-ordco/services/localforage.service';
import {ComboBoxDto} from '@service-proxies/verify-service-proxies';

export interface PipeOptionsDto {
  [prop: string]: BehaviorSubject<ComboBoxDto[]>;
}

@Injectable({
  providedIn: 'root'
})
export class DisplayPipeDataService {
  lock = {};
  option$: PipeOptionsDto = {};

  data$(type: string, cascadeValue: string | null = null) {
    const keyName = type + (cascadeValue ? ('_' + cascadeValue) : '');
    return this.option$[keyName];
  }

  constructor(private localforageService: LocalforageService) {
  }

  getDataOptions(proxyService: Observable<ComboBoxDto[]>, type: string, cascadeValue: string | null = null): void {
    const keyName = type + (cascadeValue ? ('_' + cascadeValue) : '');
    const lock = this.lock[keyName];
    if (lock) {
      return;
    }
    this.lock[keyName] = true;
    if (!this.option$[keyName]) {
      this.option$[keyName] = new BehaviorSubject<ComboBoxDto[]>([]);
    }
    this.localforageService.getOrAdd(keyName, proxyService).subscribe(d => {
      this.option$[keyName].next(d);
    });

  }

  getDataOptionsNotCache(proxyService: Observable<ComboBoxDto[]>, type: string, cascadeValue: string | null = null): void {
    const keyName = type + (cascadeValue ? ('_' + cascadeValue) : '');
    const lock = this.lock[keyName];
    if (lock) {
      return;
    }
    this.lock[keyName] = true;
    if (!this.option$[keyName]) {
      this.option$[keyName] = new BehaviorSubject<ComboBoxDto[]>([]);
    }
    proxyService.subscribe(d => {
      this.option$[keyName].next(d);
    });

  }

  getDisplayTextForPipe(option$: Observable<ComboBoxDto[]>, value): Observable<string> {
    return option$.pipe(
      filter(s => {
        return s && s?.length > 0;
      }),
      map(lst => {
        const f = lst.find(x => '' + x.value === '' + value);
        return f?.displayText;
      })
    );
  }
}
