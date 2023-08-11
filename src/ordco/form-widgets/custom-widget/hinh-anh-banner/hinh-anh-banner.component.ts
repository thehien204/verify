import {Component} from '@angular/core';
import {DestroyRxjsService, OCoreUtilityService, OfControlUIWidget} from "@node_modules/@orendaco/of";
import {take} from "@node_modules/rxjs/internal/operators";
import {NzUploadFile} from "@node_modules/ng-zorro-antd/upload";
import {Observable, Observer} from "@node_modules/rxjs";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


@Component({
  selector: 'app-hinh-anh-banner',
  templateUrl: './hinh-anh-banner.component.html',
  providers: [DestroyRxjsService]
})
export class HinhAnhBannerComponent extends OfControlUIWidget {
  linkImagesAdd = '';

  afterViewInit(): void {
    this.field.errorEmpty = 'Vui lòng Upload banner hoặc thêm 1 link ảnh banner';
    this.addFormControlIntoRootFormGroup(this.field);
    this.rootFormGroup.getControl(this.field.dataField).valueChanges
      .pipe(take(1))
      .subscribe(url => {
        this.getValueFromForm(url);
      });
  }

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        abp.notify.error('Vui lòng chọn ảnh (jpeg/png)!', "File không hợp lệ!");
        observer.complete();
        return;
      }
      const isLt5M = file.size! / 1024 / 1024 < 5;
      if (!isLt5M) {
        abp.notify.error('Ảnh phải có dung lượng dưới 5MB!', "Ảnh có kích thước quá lớn!");
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt5M);
      observer.complete();
    });

  handleChange(info: { file: NzUploadFile }): void {
    this.patchValueInForm();
  }

  onClickAddLink() {
    if (OCoreUtilityService.isNullOrEmpty(this.linkImagesAdd)) {
      return;
    }
    if (this.linkImagesAdd.indexOf('http') === -1) {
      abp.notify.error('Link ảnh không hợp lệ');
      return;
    }
    this.fileList = [{
      uid: '' + Number(new Date()),
      name: 'banner-image.png',
      status: 'done',
      url: this.linkImagesAdd
    }];
    this.linkImagesAdd = '';
    setTimeout(() => {
      this.patchValueInForm();
      this.cdr.detectChanges();
    }, 10);

  }

  patchValueInForm() {
    setTimeout(() => {
      let urlImg = '';
      const imgFormControl = this.rootFormGroup.get(this.field.dataField);
      if (this.fileList?.length > 0) {
        const f = this.fileList[0];
        if (f.originFileObj) {
          getBase64(f.originFileObj).then((d: string) => {
            urlImg = d;
            imgFormControl.patchValue(urlImg);
          });
        } else {
          imgFormControl.patchValue(f.url);
        }
      } else {
        imgFormControl.patchValue(null);
      }
    }, 500);
  }

  getValueFromForm(url: string) {
    this.fileList = [];
    if (!OCoreUtilityService.isNullOrEmpty(url)) {
      this.fileList.push({
        uid: 'url',
        name: 'banner-image.png',
        status: 'done',
        url: url
      });
    }
  }
}
