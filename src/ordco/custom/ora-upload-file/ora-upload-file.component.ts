import {Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider, ViewEncapsulation} from '@angular/core';
import {NzUploadFile} from "@node_modules/ng-zorro-antd/upload";
import {NzUploadChangeParam, NzUploadXHRArgs} from "@node_modules/ng-zorro-antd/upload/interface";
import {NG_VALUE_ACCESSOR} from "@node_modules/@angular/forms";
import {ControlValueAccessor} from "@angular/forms";
import {FileParameter, PictureServiceProxy} from "@service-proxies/verify-service-proxies";
import {OrdUploadDownloadServiceProxies} from "@service-proxies/ord-upload-download.service";
import {environment} from "../../../environments/environment";
import {OCoreUtilityService} from "@node_modules/@orendaco/of";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OraUploadFileComponent),
  multi: true
};

@Component({
  selector: 'ora-upload-file',
  templateUrl: './ora-upload-file.component.html',
  styleUrls: ['./ora-upload-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [VALUE_ACCESSOR]
})
export class OraUploadFileComponent implements OnInit, ControlValueAccessor {
  fileList: NzUploadFile[] = [];
  @Input() uploadText = "Tải lên";
  @Input() downloadText = "Tải xuống";
  @Input() selectedMulti = false;
  @Input() singleOutput = false;
  @Input() alowUpload = true;
  @Input() downloadName: string;

  _isDisabled = false;

  // @Input()
  // get value(): string[] {
  //   return this.control.value;
  // }

  set value(v: string[]) {
    if (v) {
      this.fileList = v.map((docId, index) => {
        const url = environment.oAuthConfig.issuer + '/api/app/picture/get-file/' + docId
        return {
          uid: (index * -1).toString(),
          status: 'success',
          thumbUrl: url,
          url: url,
          response: docId
        } as NzUploadFile
      })
    }
  }

  @Input()
  get isDisabled() {
    return this._isDisabled;
  }

  set isDisabled(v: boolean) {

  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onOneItemUploadSuccess = new EventEmitter<string>();

  private onChange = (v: any) => {
  };
  private onTouched = () => {
  };

  onFocus(event: any): void {
    setTimeout(() => {
      this.onTouched();
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.singleOutput)
      this.fileList = [file];
    return true;
  };

  constructor(private documentService: PictureServiceProxy,
              private downloadService: OrdUploadDownloadServiceProxies,

  ) {
  }

  ngOnInit(): void {
  }

  customReq = (item: NzUploadXHRArgs) => {
    const img = {
      data: item.file,
      fileName: item.name,
    } as FileParameter;
    return this.documentService.uploadToCache([img])
      .subscribe(res => {
        item.onSuccess(res[0], item.file, "");
        this.onOneItemUploadSuccess.emit(res[0]);
      })
  };
  handleDownload = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.download = file.name;
      a.href = await getBase64(file.originFileObj) + "";
      a.target = '_self';
      a.click();
      document.body.removeChild(a);
    } else {
      this.downloadService.getDownloadFileByLink(file.url || file.preview)
        .subscribe(res => {
          const fileName =this.downloadName? OCoreUtilityService.removeDauVaKyTuDacBiet(this.downloadName): "document";
          this.downloadService.handlerSubscribedDownloadFile(res, fileName);
        })
    }
    // this.previewImage = file.url || file.preview;
    // this.previewVisible = true;
  };

  onSave() {

  }

  onFileListChange($event: NzUploadFile[]) {
    console.log("$event", $event)
    if (this.singleOutput) {
      $event.splice(0, $event.length - 1)
    }

  }

  onChangeImg($event: NzUploadChangeParam) {
    if ($event.type === "success") {
      const data = $event.fileList.map(x => x.response).filter(x => x)
      this.onChange(data);
    } else if ($event.type == 'removed') {
      const data = $event.fileList.map(x => x.response).filter(x => x);
      this.onChange(data);
    }
  }


  //#region base ControlValueAccessor
  writeValue(obj: string[]): void {
    this.value = obj;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  }

  //#endregion
  async onClickDownLoadSingleFile() {
    await this.handleDownload(this.fileList[0]);
  }
}
