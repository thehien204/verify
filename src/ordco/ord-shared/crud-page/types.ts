import {OfSchemaModel} from '@orendaco/of';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {ModalOptions} from '@node_modules/ng-zorro-antd/modal/modal-types';
import {Observable} from 'rxjs';
import {NzDrawerOptions} from '@node_modules/ng-zorro-antd/drawer/drawer-options';

export interface ICrudOfSchemaCreateOrUpdateOptions<T = NzSafeAny> {
  entityName?: string;
  id: string;
  editDto: NzSafeAny;
  type?: 'modal' | 'drawer';
  entitySchema: OfSchemaModel;
  isReadOnly?: boolean;
  handlerBeforeOpenEdit?: (entitySchema: OfSchemaModel) => void;
  callBackSavedSuccess: (value: NzSafeAny) => void;
  nzModalOptions?: ModalOptions;
  nzDrawerOptions?: NzDrawerOptions;
  proxyServices: ICrudOfSchemaProxy;
  afterViewInitFunc?: (entitySchema: OfSchemaModel<T>, id: NzSafeAny, editDto: NzSafeAny) => void;
}

export interface ICrudOfSchemaProxy {
  getList: (dto: NzSafeAny) => Observable<NzSafeAny>;
  getById: (id: string) => Observable<NzSafeAny>;
  insert: (dto: NzSafeAny) => Observable<NzSafeAny>;
  update: (dto: NzSafeAny, id: string) => Observable<NzSafeAny>;
  removeById: (id: string) => Observable<NzSafeAny>;
}

export interface IRemoveByIdOptions {
  name: string;
  id: string;
  callBack: () => void;
  proxyServices: ICrudOfSchemaProxy;
}
