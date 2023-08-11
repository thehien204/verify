import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@node_modules/@angular/router";
import {switchMap} from "@node_modules/rxjs/internal/operators";
import {
  ChiTietSanPhamMobileDto, DanhGiaSanPhamDto, DanhGiaSanPhamManagerServiceProxy, DanhGiaSanPhamSearchListInputDto,
  ProductMobileServiceProxy
} from "@service-proxies/verify-service-proxies";
import {RestService} from "@node_modules/@abp/ng.core";
import {Injector} from "@node_modules/@angular/core";
import {Subject} from "@node_modules/rxjs";
import {getDefaultUrl} from "@service-proxies/api-url.service";
import { MillionPipe } from '../million.pipe';
import {formatNumber} from '@angular/common';


@Component({
  templateUrl: './xem-san-pham-by-gtin.component.html',
  styleUrls: ['./xem-san-pham-by-gtin.component.scss'],
})
export class XemSanPhamByGtinComponent implements OnInit {
  imgLinkDefault = "assets/images/noImg.png"
  ttSanPham$ = new Subject<ChiTietSanPhamMobileDto>();
  lstSpCungLoai$ = new Subject<ChiTietSanPhamMobileDto[]>();
  loading = true;
  anhSp = this.imgLinkDefault;
  dataDanhGia: DanhGiaSanPhamDto[] = [];

  constructor(private route: ActivatedRoute,
              private  _injector: Injector,
              private  productMbService: ProductMobileServiceProxy,
              private _restService: RestService,
              private danhGiaSpProxy: DanhGiaSanPhamManagerServiceProxy
  ) {

  }
  barCodeLink(ma: string) {
    return ma ? getDefaultUrl() + `/api/code/barcode?gtin=${ma}&width=300&height=100&dpi=300` : ""
  }
  QRCodeLink(ma: string) {
    return ma ? `https://verify.gs1.gov.vn/xem/san-pham-gtin/${ma}` : ""
  }  
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(pram => this.productMbService.getByGtin(pram.gtin))
    ).subscribe(res => {
      this.loading = false;
      if (res.isSuccessful) {
        this.ttSanPham$.next(res.dataResult);
        this.anhSp = res.dataResult.pictureUrls[0] ? res.dataResult.pictureUrls[0] : this.imgLinkDefault;

        this.productMbService.danhSachSanPhamCungLoai(res.dataResult.id)
          .subscribe(res => {
            this.lstSpCungLoai$.next(res.dataResult);
          })

        const input = new DanhGiaSanPhamSearchListInputDto();
        input.sanPhamId = res.dataResult.id;
        this.danhGiaSpProxy.searchList(input)
          .subscribe(res => {
            this.dataDanhGia = res.items;
          })
      } else {

      }
    });



    //   this.route.params.pipe(
    //     switchMap(pram => this.restService.request<void, CommonResultDtoOfChiTietSanPhamMobileDto>(
    //       {
    //         method: 'GET',
    //         url: `/api/app/product-mobile/get-by-gtin?gtin=${pram.gtin}`,
    //       }, {
    //         apiName: "default",
    //         skipHandleError: true
    //       }))
    //   ).subscribe(res => {
    //     this.loading = false;
    //     if (res.isSuccessful) {
    //       this.ttSanPham = res.dataResult;
    //       this.anhSp = this.ttSanPham.pictureUrls[0] ? this.ttSanPham.pictureUrls[0] : imgLinkDefault;
    //       console.log(this.ttSanPham);
    //     } else {
    //
    //     }
    //   })
    // }
  }

}
