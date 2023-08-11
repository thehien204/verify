import {Injectable} from '@angular/core';
import {combineLatest, Observable, of, ReplaySubject} from 'rxjs';
import {HinhAnhSanPhamDto} from "@service-proxies/verify-service-proxies";
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileHelperService {

  constructor() {
  }

  getHinhAnhDto(fileList: NzUploadFile[]): Observable<HinhAnhSanPhamDto[]> {
    if (fileList?.length > 0) {
      const listGetItem$: Observable<HinhAnhSanPhamDto>[] = [];
      fileList.forEach(f => {
        const item = new HinhAnhSanPhamDto();
        item.uid = f.uid;
        item.url = f.url;
        item.name = f.name;
        if (f.originFileObj) {
          listGetItem$.push(this.convertFile(f.originFileObj).pipe(map((fileBase64) => {
            item.imageBase64 = fileBase64;
            return item;
          })));

        } else {
          listGetItem$.push(of(item));
        }
      });
      return combineLatest(listGetItem$).pipe(map((d) => {
        return d;
      }), take(1));

    } else {
      return of(null).pipe(take(1));
    }
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

}
