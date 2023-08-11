import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {OCoreUtilityService, OfSchemaModel} from '@node_modules/@orendaco/of';

import {finalize} from '@node_modules/rxjs/operators';
import {NzDrawerRef} from '@node_modules/ng-zorro-antd/drawer';
import {ICrudOfSchemaCreateOrUpdateOptions, ICrudOfSchemaProxy} from '@app-ordco/ord-shared/crud-page/types';

@Component({
  selector: 'app-common-create-update-drawer',
  templateUrl: './common-create-update-drawer.component.html',
  styles: [`.common-create-update-drawer {
    position: relative;
  }`, `.btn-group {
    position: absolute;
    bottom: 10px;
    left: calc(50% - 50px);
  }`]
})
export class CommonCreateUpdateDrawerComponent implements OnInit, AfterViewInit {
  id = null;
  editDto = null;
  entitySchema: OfSchemaModel;
  btnBusy = false;
  editView = false;
  proxyServices: ICrudOfSchemaProxy;
  options: ICrudOfSchemaCreateOrUpdateOptions;
  isReadOnly = false;
  handlerBeforeOpenEdit: (entitySchema: OfSchemaModel) => void;
  private _drawerRef: NzDrawerRef;

  constructor(private injector: Injector) {
  }

  get drawerRef() {
    if (!this._drawerRef) {
      this._drawerRef = this.injector.get(NzDrawerRef);
    }
    return this._drawerRef;
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
    if (this.isReadOnly) {
      setTimeout(() => {
        this.entitySchema.form.disable();
      })

    }
    this.entitySchema.focusFirstControl();
  }

  close(): void {
    this.drawerRef.close();
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
    this.drawerRef.close(dto);
  }

  openEdit() {
    this.entitySchema.form.enable({onlySelf: true});
    if (this.handlerBeforeOpenEdit) {
      this.handlerBeforeOpenEdit(this.entitySchema);
    }
    this.isReadOnly = false;
  }
}
