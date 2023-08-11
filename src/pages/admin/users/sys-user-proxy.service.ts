import {Injectable} from '@angular/core';
import {RestService} from '@abp/ng.core';
import {ICrudOfSchemaProxy} from '@app-ordco/ord-shared/crud-page/types';
import {Observable} from 'rxjs';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {IRoleDto} from '../roles/sys-role-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class SysUserProxyService implements ICrudOfSchemaProxy {
  constructor(private rest: RestService) {
  }

  getList(searchInput) {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-user/search-list',
      body: searchInput
    }, {
      skipHandleError: true
    });
  }

  getById = null;

  insert(dto: NzSafeAny): Observable<NzSafeAny> {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-user/them-moi',
      body: dto
    }, {
      skipHandleError: true
    });
  }

  removeById(id: string): Observable<NzSafeAny> {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-user/xoa?userId=' + id,
    }, {
      skipHandleError: true
    });
  }

  update(dto: NzSafeAny, id: string): Observable<NzSafeAny> {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-user/cap-nhat',
      body: dto
    }, {
      skipHandleError: true
    });
  }

  changePassword(userId: string, password: string) {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-user/doi-mat-khau',
      body: {
        userId,
        password
      }
    }, {
      skipHandleError: true
    });
  }

  getRoleCanGrant(userId: string): Observable<IRoleDto[]> {
    return this.rest.request({
      method: 'GET',
      url: '/api/app/sys-user/get-role-can-grant-for-user?userId=' + userId
    }, {
      skipHandleError: true
    });
  }

  getGrantedRoleId(userId: string): Observable<string[]> {
    return this.rest.request({
      method: 'GET',
      url: '/api/app/sys-user/get-granted-role-id?userId=' + userId
    }, {
      skipHandleError: true
    });
  }

  grantRoleUser(userId: string, roleIds: string[]) {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-user/gan-vai-tro',
      body: {
        userId,
        roleIds
      }
    }, {
      skipHandleError: true
    });
  }

  lock(userId: string, isLock: boolean) {
    return this.rest.request({
      method: 'POST',
      url: '/api/app/sys-user/lock-user',
      body: {
        userId,
        isLock
      }
    }, {
      skipHandleError: true
    });
  }
}
