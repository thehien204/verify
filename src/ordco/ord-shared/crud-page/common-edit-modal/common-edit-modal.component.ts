import {AfterViewInit, ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {OfSchemaModel} from '@node_modules/@orendaco/of';
import {NzSafeAny} from '@node_modules/ng-zorro-antd/core/types';
import {Observable} from '@node_modules/rxjs';
import {NzModalRef} from '@node_modules/ng-zorro-antd/modal';
import {finalize} from '@node_modules/rxjs/operators';

@Component({
  selector: 'app-common-edit-modal',
  templateUrl: './common-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class CommonEditModalComponent implements OnInit, AfterViewInit {
  schemaModel: OfSchemaModel;
  saveProxy: (dto: NzSafeAny) => Observable<NzSafeAny>;
  afterViewInitFunc: (entitySchema: OfSchemaModel) => void;
  btnBusy = false;
  messageSuccess: string;
  titleSuccess: string;
  saveBtnTitle: string;
  private _modal: NzModalRef;
  get modal() {
    if (!this._modal) {
      this._modal = this.injector.get(NzModalRef);
    }
    return this._modal;
  }

  constructor(private injector: Injector) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.afterViewInitFunc) {
      this.afterViewInitFunc(this.schemaModel);
    }
  }

  close(): void {
    this.modal.destroy();
  }

  save() {
    if (this.btnBusy) {
      return;
    }
    this.btnBusy = true;
    const data = this.schemaModel.onSubmit();
    if (data === null) {
      abp.notify.error('invalid');
      setTimeout(() => {
        this.btnBusy = false;
      }, 1000);
      return;
    }
    abp.ui.setBusy();
    this.saveProxy(data)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe((d) => {
        if (d?.errorMessage) {
          abp.notify.error(d.errorMessage);
          return;
        }
        abp.notify.success(this.messageSuccess || 'Lưu dữ liệu thành công', this.titleSuccess || 'Thao tác thành công');
        this.modal.close(data);
      });
  }

}
