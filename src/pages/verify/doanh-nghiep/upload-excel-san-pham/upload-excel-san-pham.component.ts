import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {
  DoanhNghiepDto,
  KiemTraDuLieuSanPhamExcelInput,
  KiemTraDuLieuSanPhamExcelOutput,
  SanPhamExcelDto,
  SanPhamServiceProxy
} from "@service-proxies/verify-service-proxies";
import {NzUploadFile} from "@node_modules/ng-zorro-antd/upload";
import {Observable, Observer} from "@node_modules/rxjs";
import {XlsxService} from '@delon/abc/xlsx';
import {NzSafeAny} from "@node_modules/ng-zorro-antd/core/types";
import {OCoreUtilityService} from "@node_modules/@orendaco/of";

@Component({
  selector: 'app-upload-excel-san-pham',
  templateUrl: './upload-excel-san-pham.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadExcelSanPhamComponent implements OnInit {
  @Input() doanhNghiepDto: DoanhNghiepDto;
  isVisible = false;
  fileList: NzUploadFile[] = [];
  width = '500px';
  kiemTraResult: KiemTraDuLieuSanPhamExcelOutput = null;

  constructor(private xlsx: XlsxService,
              private cdr: ChangeDetectorRef,
              private sanPhamProxy: SanPhamServiceProxy) {
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;
    this.selectFileOther();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  beforeUpload = (file: NzSafeAny, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      console.log('file.type', file.type);
      const isFileType = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isFileType) {
        abp.notify.error('Vui lòng chọn file excel', "File không hợp lệ!");
        observer.complete();
        return;
      }
      const isSizeFile = file.size! / 1024 / 1024 < 15;
      if (!isSizeFile) {
        abp.notify.error('File excel dung lượng dưới 15MB!', "File có kích thước quá lớn!");
        observer.complete();
        return;
      }
      this.xlsx.import(file).then(res => {
        this.handlerReadExcel(res);
      });
      observer.next(isFileType && isSizeFile);
      observer.complete();
    });


  selectFileOther() {
    this.kiemTraResult = null;
    this.width = '500px';
    this.fileList = [];
    this.cdr.detectChanges();
  }

  handlerReadExcel(data: NzSafeAny) {
    if (!data) {
      abp.notify.error('Sai file mẫu');
      this.selectFileOther();
      return;
    }
    let sheet1 = data[Object.keys(data)[0]] as any[][];
    if (OCoreUtilityService.isNotAnyItem(sheet1)) {
      abp.notify.error('Sai file mẫu');
      this.selectFileOther();
      return;
    }
    const checkGTIN = sheet1.find(x => x[0] && x[0] === 'GTIN');
    if (!checkGTIN) {
      abp.notify.error('Sai file mẫu');
      this.selectFileOther();
      return;
    }
    const dataExcel: SanPhamExcelDto[] = [];
    sheet1.forEach((row: any[]) => {
      if (!OCoreUtilityService.isNotAnyItem(row)) {
        if (row[0] === 'GTIN' || OCoreUtilityService.isNullOrEmpty(row[0])) {
          return;
        }
        const sanPhamDto = new SanPhamExcelDto();
        sanPhamDto.imageLinks = [];
        row.forEach((cell, idx) => {
          if (!OCoreUtilityService.isNullOrEmpty(cell)) {
            if (idx === 0) {
              sanPhamDto.ma = OCoreUtilityService.getFullTextSearch(cell);
            }
            if (idx === 1) {
              sanPhamDto.ten = cell;
            }
            if (idx === 2) {
              sanPhamDto.moTa = cell;
            }
            if (idx === 3) {
              sanPhamDto.maNhomSanPham = cell;
            }
            if (idx === 4) {
              sanPhamDto.thiTruongMucTieu = cell;
            }
            if (idx > 5) {
              sanPhamDto.imageLinks.push(cell);
            }
          }
        });
        dataExcel.push(sanPhamDto);
      }
    });
    const body = new KiemTraDuLieuSanPhamExcelInput();
    body.doanhNghiepDto = this.doanhNghiepDto;
    body.listSanPham = dataExcel;
    this.sanPhamProxy.kiemTraDuLieuExcel(body).subscribe(result => {
      this.kiemTraResult = null;
      if (result.isSuccessful) {
        this.kiemTraResult = result.dataResult;
        this.width = '90vw';
        this.cdr.detectChanges();
      } else {
        abp.notify.error(result.errorMessage);
        this.selectFileOther();
        return;
      }

    });

  }

  saveExcel() {
    if (this.kiemTraResult.listHopLe.length > 0) {
      const body = new KiemTraDuLieuSanPhamExcelInput();
      body.doanhNghiepDto = this.doanhNghiepDto;
      body.listSanPham = this.kiemTraResult.listHopLe;
      this.sanPhamProxy.luuDuLieuExcel(body).subscribe(d => {
        if (d.isSuccessful) {
          abp.notify.info('Lưu thành công ' + d.dataResult + ' sản phẩm');
          this.selectFileOther();
          return;
        }
        abp.notify.error(d.errorMessage);
      });
    }

  }
}
