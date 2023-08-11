import {Injectable, Injector} from '@angular/core';
import * as _ from 'lodash';
import {NzSafeAny} from '@node_modules/ng-zorro-antd/core/types';
import {NzModalService} from '@node_modules/ng-zorro-antd/modal';
import {ICrudOfSchemaCreateOrUpdateOptions, IRemoveByIdOptions} from './types';
import {finalize} from '@node_modules/rxjs/operators';
import {CommonConfirmModalComponent} from './common-confirm-modal/common-confirm-modal.component';
import {NzDrawerService} from '@node_modules/ng-zorro-antd/drawer';
import {of} from '@node_modules/rxjs';
import {ModalOptions} from '@node_modules/ng-zorro-antd/modal/modal-types';
import {Observable} from 'rxjs';
import {OfSchemaModel} from '@node_modules/@orendaco/of';

@Injectable({
  providedIn: 'root'
})
export class CommonCrudService {
  private _injector: Injector;

  constructor(injector: Injector) {
    this._injector = injector;
  }

  openCreateOrUpdate<T = NzSafeAny>(options: ICrudOfSchemaCreateOrUpdateOptions<T>) {
    options = this.getTitle(options);
    let getById$ = of(options.editDto);
    if (options.proxyServices?.getById && options?.id) {
      abp.ui.setBusy();
      getById$ = options.proxyServices.getById(options?.id).pipe(finalize(abp.ui.clearBusy));
    }
    getById$.subscribe(editDto => {
      options.editDto = editDto;
      if (options.type === 'drawer') {
        this.openDrawer(options);
      } else {
        this.openModal(options);
      }
    });
  }

  private getTitle<T = NzSafeAny>(options: ICrudOfSchemaCreateOrUpdateOptions<T>) {
    if (options?.entityName) {
      options.nzModalOptions = options?.nzModalOptions || {};
      options.nzDrawerOptions = options?.nzDrawerOptions || {};
      options.nzModalOptions.nzTitle = options?.id ? 'Sửa thông tin ' : 'Thêm mới ';
      options.nzModalOptions.nzTitle = options.nzModalOptions.nzTitle + options.entityName.toLowerCase();
      options.nzDrawerOptions.nzTitle = options.nzModalOptions.nzTitle;
      return options;
    }
  }

  private openModal(options: ICrudOfSchemaCreateOrUpdateOptions) {
    import('./common-create-update-modal/common-create-update-modal.component')
      .then(({CommonCreateUpdateModalComponent}) => {
        const modal = this._injector.get(NzModalService).create({
          ...options?.nzModalOptions,
          nzContent: CommonCreateUpdateModalComponent,
          nzWrapClassName: 'ord-of-create-update',
          nzComponentParams: {
            id: options.id,
            editDto: options.editDto,
            entitySchema: _.cloneDeep(options.entitySchema),
            proxyServices: options.proxyServices,
            options
          },
          nzFooter: null,
          nzMaskClosable: false,
          nzClosable: true,
          nzWidth: options?.nzModalOptions?.nzWidth || '600px'
        });
        modal.afterClose.subscribe(result => {
          if (result) {
            options.callBackSavedSuccess(result);
          }
        });
      });
  }

  private openDrawer(options: ICrudOfSchemaCreateOrUpdateOptions) {
    import('./common-create-update-drawer/common-create-update-drawer.component')
      .then(({CommonCreateUpdateDrawerComponent}) => {
        const drawer = this._injector.get(NzDrawerService).create({
          nzPlacement: 'bottom',
          nzWrapClassName: 'ord-of-create-update',
          nzContent: CommonCreateUpdateDrawerComponent,
          nzContentParams: {
            id: options.id,
            editDto: options.editDto,
            entitySchema: _.cloneDeep(options.entitySchema),
            proxyServices: options.proxyServices,
            isReadOnly: options.isReadOnly,
            handlerBeforeOpenEdit: options?.handlerBeforeOpenEdit,
            options
          },
          nzFooter: null,
          nzMaskClosable: false,
          nzClosable: true,
          nzHeight: '80vh',
          ...options?.nzDrawerOptions
        });
        drawer.afterClose.subscribe(result => {
          if (result) {
            options.callBackSavedSuccess(result);
          }
        });
      });
  }


  removeById(option: IRemoveByIdOptions) {
    this.openConfirm(`${_.escape(option.name)} sẽ bị xóa khỏi hệ thống. Bạn có muốn tiếp tục?`
      , 'Xác nhận trước khi xóa',
      () => {
        abp.ui.setBusy();
        option.proxyServices.removeById(option.id)
          .pipe(finalize(() => {
            abp.ui.clearBusy();
          }))
          .subscribe(d => {
            abp.notify.info(`Xóa thành công: ${_.escape(option.name)}`, 'Xóa thành công');
            option.callBack();
          });
      });
  }

  openConfirm(message: string, title: string, afterConfirmedFn: () => void) {
    const modal = this._injector.get(NzModalService).create<CommonConfirmModalComponent>({
      nzTitle: null,
      nzContent: CommonConfirmModalComponent,
      nzWrapClassName: 'wrap-ora-message',
      nzComponentParams: {
        message,
        title
      },
      nzWidth: 667,
      nzFooter: null
    });
    modal.afterClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        afterConfirmedFn();
      }
    });
  }

  openEditModal(options: {
    nzModalOptions: ModalOptions,
    schemaModel: OfSchemaModel,
    saveProxy: (dto: NzSafeAny) => Observable<NzSafeAny>,
    callBackSavedSuccess?: (dto: NzSafeAny) => void,
    afterViewInitFunc?: (entitySchema: OfSchemaModel) => void,
    messageSuccess?: string,
    titleSuccess?: string,
    saveBtnTitle?: string
  }) {
    import('./common-edit-modal/common-edit-modal.component')
      .then(({CommonEditModalComponent}) => {
        const modal = this._injector.get(NzModalService).create({
          ...options?.nzModalOptions,
          nzContent: CommonEditModalComponent,
          nzWrapClassName: 'ord-of-edit',
          nzComponentParams: {
            ...options,
            schemaModel: _.cloneDeep(options.schemaModel)
          },
          nzFooter: null,
          nzMaskClosable: false,
          nzClosable: true,
          nzWidth: options?.nzModalOptions?.nzWidth || '600px'
        });
        modal.afterClose.subscribe(result => {
          if (result && options?.callBackSavedSuccess) {
            options.callBackSavedSuccess(result);
          }
        });
      });
  }

}
