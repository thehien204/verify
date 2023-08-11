import {environment} from '../../environments/environment';


export function getDefaultUrl() {
  return environment.apis.default.url;
}

export function getDanhMucServiceUrl(): string {
  return environment.apis.danhMuc.url ?? getDefaultUrl();
}
