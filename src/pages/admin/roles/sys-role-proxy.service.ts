import {Injectable} from '@angular/core';
import {RestService} from '@abp/ng.core';
import {ICrudOfSchemaProxy} from '@app-ordco/ord-shared/crud-page/types';
import {Observable} from 'rxjs';
import {NzSafeAny} from 'ng-zorro-antd/core/types';

export interface IRoleDto {
  id: string;
  name: string;
  description: string;
  isGranted?: boolean;
}

export interface IPermissionDto {
  name: string;
  displayName: string;
  parentName: string;
  isGranted: boolean;
}

export interface IGroupPermissionListDto {
  name: string;
  displayName: string;
  permissions: IPermissionDto[];
}

@Injectable({
  providedIn: 'root'
})
export class SysRoleProxyService implements ICrudOfSchemaProxy {
  constructor(private rest: RestService) {
  }

  getList(searchInput) {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-role/search-list',
      body: searchInput
    }, {
      skipHandleError: true
    });
  }

  getById = null;

  insert(dto: NzSafeAny): Observable<NzSafeAny> {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-role/them-moi',
      body: dto
    }, {
      skipHandleError: true
    });
  }

  removeById(id: string): Observable<NzSafeAny> {
    return this.rest.request({
      method: 'POST',
      url: `/api/app/sys-role/xoa?roleId=${id}`
    }, {
      skipHandleError: true
    });
  }

  update(dto: NzSafeAny, id: string): Observable<NzSafeAny> {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-role/cap-nhat',
      body: dto
    }, {
      skipHandleError: true
    });
  }

  getPermissions(): Observable<IGroupPermissionListDto[]> {
    return this.rest.request({
      method: 'GET',
      url: '/api/app/sys-role/get-permissions',
    }, {
      skipHandleError: true
    });
  }

  getGrantedPermissions(roleId: string): Observable<string[]> {
    return this.rest.request({
      method: 'GET',
      url: '/api/app/sys-role/get-granted-permissions?roleId=' + roleId,
    }, {
      skipHandleError: true
    });
  }

  setGrantPermission(roleId: string, permissions: string[]) {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-role/set-grant-permission',
      body: {
        roleId,
        permissions
      }
    }, {
      skipHandleError: true
    });
  }
}
