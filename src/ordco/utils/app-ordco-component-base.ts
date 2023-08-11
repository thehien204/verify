import {Injector} from '@angular/core';
import {NzSafeAny} from '@node_modules/ng-zorro-antd/core/types';
import {RestService} from '@abp/ng.core';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {CommonCrudService} from '@app-ordco/ord-shared/crud-page/common-crud.service';
import AppUtilityService from '@app-ordco/services/app-utility.service';
import {ICrudOfSchemaProxy} from '@app-ordco/ord-shared/crud-page/types';
import {Rest} from '@node_modules/@abp/ng.core/lib/models/rest';
import {OpConfigModel} from '@node_modules/@orendaco/of';
import {finalize} from '@node_modules/rxjs/operators';
import {Observable} from '@node_modules/rxjs';
import {PagedResultDto} from '@node_modules/@orendaco/of/op/models/paged-result-dto';
import {IOpConfig} from '@node_modules/@orendaco/of/op/models/op-config';


export abstract class AppOrdCoComponentBase {
  loading = false;
  private readonly _injector: Injector;
  private _formWidgetFacadeService: FormWidgetFacadeService;
  private _restService: RestService;
  private _crudService: CommonCrudService;

  // private _userSessionStateService: UserSessionStateService;

  protected constructor(injector: Injector) {
    this._injector = injector;
  }

  get restService(): RestService {
    if (!this._restService) {
      this._restService = this._injector.get(RestService);
    }
    return this._restService;
  }

  get fw(): FormWidgetFacadeService {
    if (!this._formWidgetFacadeService) {
      this._formWidgetFacadeService = this._injector.get(FormWidgetFacadeService);
    }
    return this._formWidgetFacadeService;
  }

  get utilityServices(): AppUtilityService {
    return AppUtilityService.getInstance();
  }

  get crudService(): CommonCrudService {
    if (!this._crudService) {
      this._crudService = new CommonCrudService(this._injector);
    }
    return this._crudService;
  }

  // get userStateService(): UserSessionStateService {
  //   if (!this._userSessionStateService) {
  //     this._userSessionStateService = this._injector.get(UserSessionStateService);
  //   }
  //   return this._userSessionStateService;
  // }

  openConfirm(message: string, title: string, afterConfirmedFn: () => void) {
    this._crudService.openConfirm(message, title, afterConfirmedFn);
  }

  builderCommonCrudProxyService(baseUrl: string, apiName: string = 'default', ignoreGetById = false): ICrudOfSchemaProxy {

    const config: Rest.Config = {
      apiName,
      skipHandleError: true
    };
    const ret: ICrudOfSchemaProxy = {
      getList: dto => {
        this.loading = true;
        return this.restService.request<NzSafeAny, NzSafeAny>({
          method: 'POST',
          url: `/api/${baseUrl}/search-list`,
          body: dto
        }, config).pipe(finalize(() => {
          this.loading = false;
        }));
      },
      getById: id => {
        const url = `/api/${baseUrl}/get-by-id/${id}`;
        return this.restService.request<void, any>(
          {
            method: 'GET',
            url
          }, config);
      },
      insert: createInput => {
        return this.restService.request<any, any>(
          {
            method: 'POST',
            url: `/api/${baseUrl}/create`,
            body: createInput
          }, config);
      },
      update: (updateInput, id) => {
        return this.restService.request<any, any>(
          {
            method: 'POST',
            url: `/api/${baseUrl}/update`,
            body: updateInput
          }, config);
      },
      removeById: id => {
        return this.restService.request<any, any>(
          {
            method: 'POST',
            url: `/api/${baseUrl}/remove/${id}`
          }, config);
      }
    };
    if (ignoreGetById) {
      ret.getById = null;
    }
    return ret;
  }

  builderPagination(getList: (searchDto: any) => Observable<PagedResultDto<any>>, option: IOpConfig = null) {
    return new OpConfigModel({
      type: 'ord-not-total-record',
      dataSourceFunc: searchDto => {
        this.loading = true;
        return getList(searchDto).pipe(finalize(() => {
          this.loading = false;
        }))
      },
      allowSelectPageSize: true,
      pageSizeOptions: [10, 20, 50],
      ...option
    });
  }
}
