import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {tap} from '@node_modules/rxjs/operators';
import {OCoreUtilityService} from '@node_modules/@orendaco/of';
import {DestroyRxjsService} from '@orendaco/of';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormatDataControlService {

  constructor() {
  }

  /**
   * Xóa multi khoảng trắng
   * Convert text capitalize
   * @param ctrl
   * @param destroy$
   */
  hoTen(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/ {2}/g, ' ').trimStart();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
            return;
          }
          let txtCapitalize = this.toCapitalizeText(v);
          if (txtCapitalize !== v) {
            ctrl.patchValue(txtCapitalize);
            return;
          }
        }
      })).subscribe();
  }

  /**
   * Xóa multi khoảng trắng
   * @param ctrl
   * @param destroy$
   */
  removeMultiSpace(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/ {2}/g, ' ').trimStart();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  /**
   * Không cho nhập khoảng trắng
   * @param ctrl
   * @param destroy$
   */
  khongCoKhoangTrang(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/ /g, '').trimStart();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  nhapSoVaKyTu(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/[^a-zA-Z0-9]/g, '').trimStart();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  nhapSoVaKyTuCoKhoangTrang(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/[^a-zA-Z0-9 ]/g, '').trimStart();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  nhapSoVaKyTuUpperCase(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/[^a-zA-Z0-9]/g, '').trimStart().toUpperCase();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  nhapSoVaKyTuCoKhoangTrangUpperCase(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/[^a-zA-Z0-9 ]/g, '').trimStart().toUpperCase();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  chiNhapSo(ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(/\D+/g, '').trimStart();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  regex(regex: RegExp, ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(regex, '').trimStart();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }

  regexAndUpperCase(regex: RegExp, ctrl: AbstractControl, destroy$: DestroyRxjsService): void {
    ctrl.valueChanges.pipe(takeUntil(destroy$),
      tap(v => {
        if (!OCoreUtilityService.isNullOrEmpty(v)) {
          const removeV = v.replace(regex, '').trimStart().toUpperCase();
          if (removeV !== v) {
            ctrl.patchValue(removeV);
          }
        }
      })).subscribe();
  }


  private toCapitalizeText(txt: string): string {
    if (OCoreUtilityService.isNullOrEmpty(txt)) {
      return txt;
    }
    const capitalizes = txt.split(' ').map(it => {
      if (OCoreUtilityService.isNullOrEmpty(it)) {
        return it;
      }
      return it.charAt(0).toUpperCase() + it.slice(1);
    });
    return capitalizes.join(' ');
  }
}
