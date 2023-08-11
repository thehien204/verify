import {Observable} from '@node_modules/rxjs';

export default class AppUtilityService {
  private static instance: AppUtilityService;

  private constructor() {
  }

  public static getInstance(): AppUtilityService {
    if (!AppUtilityService.instance) {
      AppUtilityService.instance = new AppUtilityService();
    }
    return AppUtilityService.instance;
  }

  flattenDeep(array) {
    return array.reduce((acc, val) =>
        Array.isArray(val) ?
          acc.concat(this.flattenDeep(val)) :
          acc.concat(val),
      []);
  }

  removeDau(str: string): string {
    if (this.isNullOrEmpty(str)) {
      return str;
    }
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    return str;
  }

  isNullOrEmpty(input: any): boolean {
    return !(typeof input !== 'undefined' && input && input !== '');
  }

  blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next('');
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = event => {
          observer.next((event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
