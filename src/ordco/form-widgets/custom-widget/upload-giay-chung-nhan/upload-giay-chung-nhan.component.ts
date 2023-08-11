import {Component, Injector} from '@angular/core';
import {DestroyRxjsService, OCoreUtilityService, OfControlUIWidget} from "@node_modules/@orendaco/of";
import {FormControl} from "@node_modules/@ngneat/reactive-forms";
import {take} from "@node_modules/rxjs/internal/operators";
import {NzUploadFile} from "@node_modules/ng-zorro-antd/upload";
import {Observable, Observer} from "@node_modules/rxjs";
import {HinhAnhSanPhamDto} from "@service-proxies/verify-service-proxies";
import {UploadFileHelperService} from "@app-ordco/form-widgets/custom-widget/services/upload-file-helper.service";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-upload-giay-chung-nhan',
  templateUrl: './upload-giay-chung-nhan.component.html',
  styles: [],
  providers: [DestroyRxjsService]
})
export class UploadGiayChungNhanComponent extends OfControlUIWidget {
  linkImagesAdd = '';

  constructor(private _injetor: Injector,
              private uploadFileHelperService: UploadFileHelperService) {
    super(_injetor);
  }

  afterViewInit(): void {
    this.addFormControlIntoRootFormGroup(this.field);
    this.rootFormGroup.addControl('hasChangeImages', new FormControl(false));
    const ctrl = this.rootFormGroup.getControl(this.field.dataField);
    ctrl.valueChanges
      .pipe(take(1))
      .subscribe(images => {
        this.getValueFromForm(images);
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
    this.fileList.push({
      uid: '' + Number(new Date()),
      name: 'image.png',
      status: 'done',
      url: this.linkImagesAdd
    });
    this.linkImagesAdd = '';
    setTimeout(() => {
      this.patchValueInForm();
      this.cdr.detectChanges();
    }, 10);

  }

  patchValueInForm() {
    setTimeout(() => {
      this.rootFormGroup.patchValue({
        hasChangeImages: true
      });
      this.uploadFileHelperService.getHinhAnhDto(this.fileList).subscribe(images => {
        this.rootFormGroup.get(this.field.dataField).patchValue(images);
      });
    }, 500);
  }

  getValueFromForm(images: HinhAnhSanPhamDto[]) {
    this.fileList = [];
    if (!OCoreUtilityService.isNotAnyItem(images)) {
      images.forEach(d => {
        this.fileList.push({
          uid: d.uid,
          name: d.name,
          status: 'done',
          url: d.url
        });
      })
    }
  }
}

