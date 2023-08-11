import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {OfControlUIWidget} from "@node_modules/@orendaco/of";
import {Injector} from "@node_modules/@angular/core";
import {
  DoanhNghiepDto,
  DoanhNghiepSearchInputDto,
  DoanhNghiepServiceProxy
} from "@service-proxies/verify-service-proxies";
import {BehaviorSubject} from "rxjs";
import {filter} from 'rxjs/internal/operators/filter';
import {debounceTime, takeUntil, tap} from "rxjs/operators";
import {finalize, startWith} from "@node_modules/rxjs/operators";

@Component({
  templateUrl: './doanh-nghiep-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoanhNghiepSelectComponent extends OfControlUIWidget implements OnInit {
  listDoanhNghiep: DoanhNghiepDto[] = [];
  doanhNghiepSelected: DoanhNghiepDto;
  filter = '';
  search$ = new BehaviorSubject('');
  isLoading = false;

  constructor(private _injector: Injector,
              private doanhNghiepSP: DoanhNghiepServiceProxy) {
    super(_injector);
  }

  ngOnInit(): void {
    this.addFormControlIntoRootFormGroup(this.field);
  }

  afterViewInit(): void {
    this.search$.asObservable().pipe(
      filter(f => f.length >= 3),
      takeUntil(this.destroy$),
      debounceTime(250),
      tap((filter) => {
        this.isLoading = true;
        const body = new DoanhNghiepSearchInputDto();
        body.filter = filter;
        body.skipCount = 0;
        body.maxResultCount = 10;
        this.doanhNghiepSP.searchList(body).pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(lst => {
          this.listDoanhNghiep = lst.items;
          this.cdr.markForCheck();
        })
      })
    )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
    this.rootFormGroup.get(this.field.dataField).valueChanges.pipe(
      startWith(this.rootFormGroup.get(this.field.dataField).value),
      takeUntil(this.destroy$),
      debounceTime(100),
      tap((v) => {
        if (!v) {
          this.doanhNghiepSelected = null;
          return;
        }
        if (this.doanhNghiepSelected && this.doanhNghiepSelected.id == v) {
          return;
        }
        this.doanhNghiepSelected = this.listDoanhNghiep.find(x => x.id == v);
        if (this.doanhNghiepSelected) {
          return;
        }
        this.doanhNghiepSP.getById(v).subscribe(ret => {
          this.doanhNghiepSelected = ret;
          this.listDoanhNghiep.push(ret);
          this.cdr.markForCheck();
        })
      }))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  onSearch($event: string) {
    this.filter = $event;
    this.search$.next($event);

  }
}
