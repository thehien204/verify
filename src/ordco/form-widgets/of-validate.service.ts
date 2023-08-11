import {Injectable, Injector} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {OCoreUtilityService} from '@orendaco/of';

@Injectable({
  providedIn: 'root'
})
export class OfValidateService {

  constructor(private inject: Injector) {
  }

  /**
   * Chỉ validate khi có nhập sdt, nếu null thì không check
   */
  soDienThoai = (abs: AbstractControl): ValidationErrors | null => {
    const v = abs.value;
    if (OCoreUtilityService.isNullOrEmpty(v)) {
      return null;
    }
    const regExpSoDienThoai = new RegExp('^(0)(2[0-9][0-9]|3[2-9]|5[2|6|8|9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$');
    const check = regExpSoDienThoai.test(v);
    if (!check) {
      return {notPhone: true};
    }
    return null;
  };

  /**
   * Validate bắt buộc nhập sdt
   */
  soDienThoaiNotNull = (abs: AbstractControl): ValidationErrors | null => {
    const v = abs.value;
    if (OCoreUtilityService.isEmptyOrWhiteSpace(v)) {
      return {nullOrWhiteSpace: true};
    }
    return this.soDienThoai(abs);
  };

  notNull = (abs: AbstractControl): ValidationErrors | null => {
    const v = abs.value;
    if (OCoreUtilityService.isEmptyOrWhiteSpace(v)) {
      return {nullOrWhiteSpace: true};
    }
    return null;
  }
  userName = (abs: AbstractControl): ValidationErrors | null => {
    const v = abs.value;
    if (!OCoreUtilityService.isNullOrEmpty(v)) {
      const regUser = /^[A-Za-z][A-Za-z0-9_]{4,29}$/;
      if (!regUser.test(abs.value)) {
        return {notUserName: true};
      }
      return null;
    }
  }
  password = (abs: AbstractControl): ValidationErrors | null => {
    const value = abs.value;
    if (!OCoreUtilityService.isNullOrEmpty(value)) {
      if (value.length < 8) {
        return {'Mật khẩu chứa ít nhất 8 ký tự': true};
      }
      if (!/[A-Z]/.test(value)) {
        return {'Mật khẩu chứa ít nhất 1 ký tự in hoa': true};
      }
      if (!/[a-z]/.test(value)) {
        return {'Mật khẩu chứa ít nhất 1 ký tự thường': true};
      }
      if (!/[0-9]/.test(value)) {
        return {'Mật khẩu chứa ít nhất 1 ký tự số': true};
      }
      if (!/[0-9]/.test(value)) {
        return {'Mật khẩu chứa ít nhất 1 ký tự số': true};
      }
      if (!/[^a-zA-Z0-9]/.test(value)) {
        return {'Mật khẩu chứa ít nhất 1 ký đặc biệt': true};
      }
      return null;
    }
  }
}
