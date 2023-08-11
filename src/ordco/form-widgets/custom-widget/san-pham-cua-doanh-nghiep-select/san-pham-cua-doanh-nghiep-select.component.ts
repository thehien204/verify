import {Component, Injector, OnInit} from '@angular/core';
import {OfControlUIWidget} from "@node_modules/@orendaco/of";
import {SanPhamDto, SanPhamSearchInputDto, SanPhamServiceProxy} from "@service-proxies/verify-service-proxies";
import {BehaviorSubject, combineLatest} from "rxjs";
import {debounceTime, finalize, startWith, takeUntil, tap} from "rxjs/operators";

@Component({
  templateUrl: './san-pham-cua-doanh-nghiep-select.component.html'
})
export class SanPhamCuaDoanhNghiepSelectComponent extends OfControlUIWidget implements OnInit {
  optionItems: SanPhamDto[] = [];
  optionItemSelected: SanPhamDto;
  filter = '';
  search$ = new BehaviorSubject('');
  isLoading = false;
  isDoanhNghiepSelected = false;

  constructor(private _injector: Injector,
              private sanPhamSp: SanPhamServiceProxy) {
    super(_injector);
  }

  ngOnInit(): void {
    this.addFormControlIntoRootFormGroup(this.field);
  }

  afterViewInit(): void {
    const doanhNghiepCtrl = this.rootFormGroup.getControl('doanhNghiepId');
    if (doanhNghiepCtrl) {
      combineLatest([
        doanhNghiepCtrl.valueChanges.pipe(startWith(doanhNghiepCtrl.value)),
        this.search$.asObservable().pipe(debounceTime(250))])
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(100),
          tap(([doanhNghiepId, filter]) => {
            this.isLoading = true;
            const body = new SanPhamSearchInputDto();
            body.doanhNghiepId = doanhNghiepId;
            body.filter = filter;
            body.skipCount = 0;
            body.maxResultCount = 30;
            this.sanPhamSp.searchList(body).pipe(finalize(() => {
              this.isLoading = false;
            })).subscribe(lst => {
              this.optionItems = lst.items;
              this.cdr.markForCheck();
            })
          })).subscribe();
    }
    this.rootFormGroup.get(this.field.dataField).valueChanges.pipe(
      startWith(this.rootFormGroup.get(this.field.dataField).value),
      takeUntil(this.destroy$),
      debounceTime(100),
      tap((v) => {
        if (!v) {
          this.optionItemSelected = null;
          return;
        }
        if (this.optionItemSelected && this.optionItemSelected.id == v) {
          return;
        }
        this.optionItemSelected = this.optionItems.find(x => x.id == v);
        if (this.optionItemSelected) {
          return;
        }
        this.sanPhamSp.getById(v).subscribe(ret => {
          this.optionItemSelected = ret;
          this.optionItems.push(ret);
          this.cdr.markForCheck();
        })
      }))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }
}
