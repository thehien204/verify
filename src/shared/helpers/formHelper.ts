import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

export default class FormHelper {
  private static instance: FormHelper;

  private constructor() {
  }

  public static getInstance(): FormHelper {
    if (!FormHelper.instance) {
      FormHelper.instance = new FormHelper();
    }
    return FormHelper.instance;
  }

  public updateValidators(formControl: FormControl, validators: ValidatorFn[]) {
    if (validators.length === 0) {
      formControl.clearValidators();
      formControl.markAsPristine();
    } else {
      formControl.setValidators(validators);
      formControl.markAsDirty();
    }
    if (formControl.value) {
      formControl.updateValueAndValidity();
    } else {
      formControl.reset();
    }
  }

  public updateValidatorsAbstractControl(formControl: AbstractControl, validators: ValidatorFn[]) {
    if (validators.length === 0) {
      formControl.clearValidators();
      formControl.markAsPristine();
    } else {
      formControl.setValidators(validators);
      formControl.markAsDirty();
    }
    if (formControl.value) {
      formControl.updateValueAndValidity();
    } else {
      formControl.reset();
    }
  }

  // tslint:disable-next-line:ban-types.ts ban-types
  public checkValid(form: FormGroup | FormArray, callBackValid?: Function, callbackInvalid?: Function) {
    if (form.invalid) {
      const checkFormControl = (fControl: FormControl) => {
        fControl.markAsDirty();
        fControl.markAsPristine();
        fControl.markAsTouched();
        fControl.updateValueAndValidity({emitEvent: true, onlySelf: true});
      };
      const checkGroup = (fGroup: FormGroup) => {
        // tslint:disable-next-line:forin
        for (const i in fGroup.controls) {
          checkFormControl(fGroup.controls[i] as FormControl);
          if (fGroup.controls[i] instanceof FormGroup) {
            checkGroup(fGroup.controls[i] as FormGroup);
          } else if (fGroup.controls[i] instanceof FormArray) {
            checkFormArray(fGroup.controls[i] as FormArray);
          }
        }
      };
      const checkFormArray = (arr: FormArray) => {
        arr.controls.forEach((item) => {
          if (item instanceof FormControl) {
            checkFormControl(item as FormControl);
          } else if (item instanceof FormGroup) {
            checkGroup(item as FormGroup);
          }
        });
      };
      if (form instanceof FormGroup) {
        checkGroup(form);
      } else {
        checkFormArray(form);
      }
      if (callbackInvalid) {
        return callbackInvalid();
      } else {
        abp.notify.error('Vui lòng xem lại thông tin đã nhập');
      }
    } else {
      if (callBackValid) {
        return callBackValid(form.getRawValue());
      }
    }
  }


  public resetFormAndValid(form: FormGroup | FormArray, clearArray = false) {

    const checkFormControl = (fControl: FormControl) => {
      fControl.markAsPristine();
      fControl.markAsUntouched();
      fControl.updateValueAndValidity()
    };
    const checkGroup = (fGroup: FormGroup) => {
      fGroup.reset();
      // tslint:disable-next-line:forin
      for (const i in fGroup.controls) {
        checkFormControl(fGroup.controls[i] as FormControl);
        if (fGroup.controls[i] instanceof FormGroup) {
          checkGroup(fGroup.controls[i] as FormGroup);
        } else if (fGroup.controls[i] instanceof FormArray) {
          checkFormArray(fGroup.controls[i] as FormArray);
        }
      }
    };
    const checkFormArray = (arr: FormArray) => {
      if (clearArray) {
        arr.clear();
      }
      arr.controls.forEach((item) => {
        if (item instanceof FormControl) {
          checkFormControl(item as FormControl);
        } else if (item instanceof FormGroup) {
          checkGroup(item as FormGroup);
        }
      });
    };
    if (form instanceof FormGroup) {
      checkGroup(form);
    } else {
      checkFormArray(form);
    }
  }

  public setDisable(form: FormGroup | FormArray | FormControl, isDisable = true) {
    const setDisControl = (fCtr: FormControl) => {
      if (isDisable) {
        fCtr.disable();
      } else {
        fCtr.enable();
      }
    };
    const setDisArr = (arr: FormArray) => {
      arr.controls.forEach((item) => {
        if (item instanceof FormControl) {
          setDisControl(item as FormControl);
        } else if (item instanceof FormGroup) {
          setDisGr(item as FormGroup);
        }
      });
    };
    const setDisGr = (fGroup: FormGroup) => {
      // tslint:disable-next-line:forin
      for (const i in fGroup.controls) {
        setDisControl(fGroup.controls[i] as FormControl);
        if (fGroup.controls[i] instanceof FormGroup) {
          setDisGr(fGroup.controls[i] as FormGroup);
        } else if (fGroup.controls[i] instanceof FormArray) {
          setDisArr(fGroup.controls[i] as FormArray);
        }
      }
    };
    if (form instanceof FormGroup) {
      setDisGr(form);
    } else if (form instanceof FormArray) {
      setDisArr(form);
    } else {
      setDisControl(form);
    }
  }

  // tslint:disable-next-line:ban-types.ts ban-types
  public resetStatus(form: FormGroup | FormArray, callBackValid?: Function) {
    const checkFormControl = (fControl: FormControl) => {
      fControl.markAsUntouched();
      // fControl.markAsDirty({ onlySelf: false });
    };
    const checkGroup = (fGroup: FormGroup) => {
      // tslint:disable-next-line:forin
      for (const i in fGroup.controls) {
        checkFormControl(fGroup.controls[i] as FormControl);
        if (fGroup.controls[i] instanceof FormGroup) {
          checkGroup(fGroup.controls[i] as FormGroup);
        } else if (fGroup.controls[i] instanceof FormArray) {
          checkFormArray(fGroup.controls[i] as FormArray);
        }
      }
    };
    const checkFormArray = (arr: FormArray) => {
      arr.controls.forEach((item) => {
        if (item instanceof FormControl) {
          checkFormControl(item as FormControl);
        } else if (item instanceof FormGroup) {
          checkGroup(item as FormGroup);
        }
      });
    };
    if (form instanceof FormGroup) {
      checkGroup(form);
    } else {
      checkFormArray(form);
    }
  }

  // private static markDirty(tab-thong-tin-ca-nhan: FormGroup | FormArray, option: boolean) {
  //   if (tab-thong-tin-ca-nhan instanceof FormGroup) {
  //     this.markGroupDirty(tab-thong-tin-ca-nhan);
  //   } else {
  //     this.markArrayDirty(tab-thong-tin-ca-nhan);
  //   }
  //   tab-thong-tin-ca-nhan.updateValueAndValidity();
  //   // console.log('FORM:', tab-thong-tin-ca-nhan);
  // }
  //
  // private static markGroupDirty(fGroup: FormGroup) {
  //   for (const i in fGroup.controls) {
  //     this.markControlDirty(fGroup.controls[i] as FormControl);
  //     if (fGroup.controls[i] instanceof FormGroup) {
  //       this.markGroupDirty(fGroup.controls[i] as FormGroup);
  //     } else if (fGroup.controls[i] instanceof FormArray) {
  //       this.markArrayDirty(fGroup.controls[i] as FormArray);
  //     }
  //   }
  // }
  //
  // private static markArrayDirty(arr: FormArray) {
  //   arr.controls.forEach((item) => {
  //     if (item instanceof FormControl) {
  //       this.markControlDirty(item as FormControl);
  //     } else if (item instanceof FormGroup) {
  //       this.markGroupDirty(item as FormGroup);
  //     }
  //   });
  // }
  //
  // private static markControlDirty(formControl: FormControl) {
  //   formControl.markAsDirty();
  //   formControl.updateValueAndValidity();
  // }
}
