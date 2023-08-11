import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {
  DoanhNghiepDto,
  DoanhNghiepServiceProxy,
  UploadAnhLogoDoanhNghiep
} from "@service-proxies/verify-service-proxies";
import {NzUploadFile} from "@node_modules/ng-zorro-antd/upload";
import {BehaviorSubject, Observable, Observer} from "@node_modules/rxjs";
import {DestroyRxjsService} from "@node_modules/@orendaco/of";
import {debounceTime, filter, switchMap, takeUntil} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-logo-doanh-nghiep',
  templateUrl: './logo-doanh-nghiep.component.html',
  providers: [DestroyRxjsService]
})
export class LogoDoanhNghiepComponent implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;
  base64Img$ = new BehaviorSubject("");
  localImg64 = "";

  constructor(private doanhNghiepServiceProxy: DoanhNghiepServiceProxy,
              private destroy$: DestroyRxjsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.base64Img$.pipe(filter(s => s !== ""),
      debounceTime(300),
      switchMap((base64Img) => {
        const body = new UploadAnhLogoDoanhNghiep({
          doanhNghiepId: this.doanhNghiepModeDto.id,
          base64Img
        });
        return this.doanhNghiepServiceProxy.uploadLogo(body).pipe(switchMap(() => {
          return this.doanhNghiepServiceProxy.getById(this.doanhNghiepModeDto.id);
        }));
      }),
      takeUntil(this.destroy$))
      .subscribe(dto => {
        this.doanhNghiepModeDto = dto;
        abp.notify.success("Upload logo thành công");
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      })
  }

  loading = false;
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
        abp.notify.error('Ảnh logo phải có dung lượng dưới 5MB!', "Ảnh có kích thước quá lớn!");
        observer.complete();
        return;
      }

      observer.next(isJpgOrPng && isLt5M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.loading = true;
    this.getBase64(info.file!.originFileObj!, (img: string) => {
      const spl = img.split('base64,');
      this.localImg64 = img;
      this.base64Img$.next(spl[1]);
    });
  }

  urlImg(value: string): string {
    return value;
  }
}
