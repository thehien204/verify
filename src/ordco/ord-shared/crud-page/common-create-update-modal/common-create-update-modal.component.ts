import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {OfSchemaModel} from '@orendaco/of';
import {OCoreUtilityService} from '@node_modules/@orendaco/of';
import {finalize} from '@node_modules/rxjs/operators';
import {ICrudOfSchemaCreateOrUpdateOptions, ICrudOfSchemaProxy} from '../types';
import {NzModalRef} from '@node_modules/ng-zorro-antd/modal';

@Component({
  templateUrl: './common-create-update-modal.component.html',
  styles: []
})
export class CommonCreateUpdateModalComponent implements OnInit, AfterViewInit {
  id = null;
  editDto = null;
  entitySchema: OfSchemaModel;
  btnBusy = false;
  editView = false;
  proxyServices: ICrudOfSchemaProxy;
  options: ICrudOfSchemaCreateOrUpdateOptions;
  private _modal: NzModalRef;

  constructor(private injector: Injector) {
  }

  get modal() {
    if (!this._modal) {
      this._modal = this.injector.get(NzModalRef);
    }
    return this._modal;
  }


  ngOnInit(): void {
    this.editView = !OCoreUtilityService.isNullOrEmpty(this.id);
  }

  ngAfterViewInit(): void {
    if (this.editView) {
      for (var name in this.editDto) {
        if (this.editDto.hasOwnProperty(name) && typeof (this.editDto[name]) === 'number') {
          this.editDto[name] = '' + this.editDto[name];
        }
      }
      this.entitySchema.patchValue(this.editDto);
    }
    if (this.options?.afterViewInitFunc) {
      this.options.afterViewInitFunc(this.entitySchema, this.id, this.editDto);
    }
    this.entitySchema.focusFirstControl();
  }

  close(): void {
    this.modal.destroy();
  }

  save() {
    if (this.btnBusy) {
      return;
    }
    this.btnBusy = true;
    const data = this.entitySchema.onSubmit();
    if (data === null) {
      abp.notify.error('invalid');
      setTimeout(() => {
        this.btnBusy = false;
      }, 1000);
      return;
    }
    abp.ui.setBusy();
    if (this.editView) {
      this.proxyServices.update({...this.editDto, ...data}, this.id).pipe(finalize(() => {
        this.btnBusy = false;
        abp.ui.clearBusy();
      })).subscribe((d) => {
        if (d?.errorMessage) {
          abp.notify.error(d.errorMessage);
          return;
        }
        this.onSaveSuccess(data);
      });

    } else {
      this.proxyServices.insert(data).pipe(finalize(() => {
        this.btnBusy = false;
        abp.ui.clearBusy();
      })).subscribe((d) => {
        if (d?.errorMessage) {
          abp.notify.error(d.errorMessage);
          return;
        }
        this.onSaveSuccess(data);
      });
    }
  }

  onSaveSuccess(dto) {
    abp.notify.success('Lưu dữ liệu thành công', 'Thao tác thành công');
    this.modal.close(dto);
  }
}
