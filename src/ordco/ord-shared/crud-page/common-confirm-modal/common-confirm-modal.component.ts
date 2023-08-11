import {Component, Injector, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NzModalRef} from '@node_modules/ng-zorro-antd/modal';

interface OptionsOraMessage {
  imageLink?: string,
  imgStyles: { [klass: string]: any; } | null;
  confirmType?: 'confirmDelete' | 'question' | 'lock' | 'unlock';
  okText?: string,
  okButtonType?: 'primary' | 'default' | 'dashed' | 'danger' | 'link' | null;
  cancelText?: string,
  cancelButtonType?: 'primary' | 'default' | 'dashed' | 'danger' | 'link' | null;
}

const optionsDefault: OptionsOraMessage = {
  imageLink: 'assets/images/icon/delete.png',
  imgStyles: null,
  confirmType: 'confirmDelete',
  okText: 'Có',
  cancelText: 'Không',
  cancelButtonType: 'default',
  okButtonType: 'danger'
};

@Component({
  templateUrl: './common-confirm-modal.component.html',
  styleUrls: ['./common-confirm-modal.component.scss']
})
export class CommonConfirmModalComponent {
  nzModalRef: NzModalRef;
  @Input() title: string;
  @Input() message: string;
  // tslint:disable-next-line:ban-types.ts.ts
  _options: OptionsOraMessage = optionsDefault;
  @Input() set options(v: OptionsOraMessage) {
    if (v) {
      this._options = {
        ...optionsDefault,
        ...v
      };
      if (!v.imageLink) {
        switch (v.confirmType) {
          case 'confirmDelete':
            this._options.imageLink = 'assets/images/icon/delete.png';
            break;
          case 'question':
            this._options.imageLink = 'assets/images/icon/question.png';
            break;
          case 'lock':
            this._options.imageLink = 'assets/images/icon/lock.png';
            break;
          case 'unlock':
            this._options.imageLink = 'assets/images/icon/unlock.png';
            break;
        }
      }
    } else {
      this._options = optionsDefault;
    }
  }

  get options() {
    return this._options;
  }

  constructor(private injector: Injector,
              private sanitizer: DomSanitizer
  ) {
    this.nzModalRef = injector.get(NzModalRef);
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  okClick(ok: boolean) {
    if (ok) {
      this.nzModalRef.close(ok);
    } else {
      this.nzModalRef.close(null);
    }
  }
}
