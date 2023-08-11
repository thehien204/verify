import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {getDefaultUrl} from "@service-proxies/api-url.service";
import {
  DisplayTextModel
} from "@node_modules/@syncfusion/ej2-barcode-generator/src/barcode/primitives/displaytext-model";

@Component({
  selector: 'app-product-barcode',
  templateUrl: './product-barcode.component.html',
  styles: []
})
export class ProductBarcodeComponent implements OnInit {
  productDto;
  type: 'barcode' | 'qrcode' = 'barcode';
  get displeyText():DisplayTextModel{
    return  {
      text: this.productDto?.ma
    }
  };

  get QRCodeLink() {
    return this.productDto ? `https://verify.gs1.gov.vn/xem/san-pham-gtin/${this.productDto?.ma}` : ""
  }
  get barCodeLink() {
     return this.productDto ? getDefaultUrl() + `/api/code/barcode?gtin=${this.productDto?.ma}&width=300&height=100&dpi=100` : ""    
  }

  constructor(private modalRef: NzModalRef) {
  }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.close();
  }

}
