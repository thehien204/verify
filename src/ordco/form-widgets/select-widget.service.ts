import {Injectable, Injector} from '@angular/core';
import {
  IOfSelectOptionDto,
  OCoreUtilityService,
  OfFormWidgetsService,
  PagedResultDtoOfSelectOption
} from '@orendaco/of';
import {
  ComboBoxDataServiceProxy, ComboBoxDto,
  DoanhNghiepSearchInputDto,
  DoanhNghiepServiceProxy, LOAI_DANG_KY_GOI_DICH_VU,
  SanPhamSearchInputDto,
  SanPhamServiceProxy
} from '@service-proxies/verify-service-proxies';
import {of} from "@node_modules/rxjs";
import {OfSelectBaseModelConfig} from "@node_modules/@orendaco/of/lib/models/of-select-base.model";
import {
  ISelectSearchServerDto
} from "@node_modules/@orendaco/of/lib/components/of-select-search-server/of-select-search-server.model";
import {map} from "@node_modules/rxjs/internal/operators";
import {
  DoanhNghiepSelectComponent
} from "@app-ordco/form-widgets/custom-widget/doanh-nghiep-select/doanh-nghiep-select.component";
import {
  SanPhamCuaDoanhNghiepSelectComponent
} from "@app-ordco/form-widgets/custom-widget/san-pham-cua-doanh-nghiep-select/san-pham-cua-doanh-nghiep-select.component";

@Injectable({
  providedIn: 'root'
})
export class SelectWidgetService {

  constructor(private baseWidget: OfFormWidgetsService,
              private inject: Injector,
              private combodataProxy: ComboBoxDataServiceProxy) {
  }

  loaiTaiKhoan(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Loại tài khoản',
      functionService: this.combodataProxy.loaiTaiKhoan(),
      ...config
    });
  }

  hourSelect(config: OfSelectBaseModelConfig = null) {
    const hourOptions: IOfSelectOptionDto[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m++) {
        hourOptions.push({
          displayText: (h < 10 ? '0' + h : '' + h) + ':' + (m < 10 ? '0' + m : '' + m),
          value: (h * 100 + m) + ''
        });
      }
    }
    return this.baseWidget.select({
      label: 'Giờ',
      options: hourOptions,
      ...config
    });
  }

  bannerSchedule(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Khung giờ',
      functionService: this.combodataProxy.bannerSchedule(),
      ...config
    });
  }

  nhomDoanhNghiep(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Nhóm doanh nghiệp',
      functionService: this.combodataProxy.nhomDoanhNghiep(),
      ...config,
      keyCache: 'nhomDoanhNghiep'
    });
  }

  nhomDoanhNghiepMulti(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Nhóm doanh nghiệp',
      allowSelectAllMultiple: true,
      nzMode: "multiple",
      functionService: this.combodataProxy.nhomDoanhNghiep().pipe(map((data) => {
        return data.map(x => {
          x.value = parseInt(x.value) as any;
          return x;
        })
      })),
      ...config,
      keyCache: 'nhomDoanhNghiepInt'
    });
  }

  quocGia(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Quốc gia',
      functionService: this.combodataProxy.quocGia(),
      ...config,
      keyCache: 'quocGia'
    });
  }


  chietKhauTheo() {
    return this.baseWidget.selectApi({
      label: 'Chiết khấu theo',
      functionService: this.combodataProxy.chietKhauTheo()
    });
  }

  loaiDichVu() {
    return this.baseWidget.selectApi({
      label: 'Loại dịch vụ',
      functionService: this.combodataProxy.loaiDichVu()
    });
  }

  donViTinhByLoaiDichVu(cascadeField: string) {
    return this.baseWidget.selectCascade({
      cascadeField: cascadeField,
      label: 'Đơn vị tính',
      functionService: cascade => {
        return this.combodataProxy.donViTinhByLoaiDichVu(cascade);
      },
      nzCascadeValueIsNull: 'Chọn loại dịch vụ'
    });
  }

  donViTinhGia() {
    return this.baseWidget.selectApi({
      label: 'Đơn vị tính',
      functionService: this.combodataProxy.donViTinhBangGia(),
      allowClearIcon: false
    });
  }

  loaiVersion() {
    return this.baseWidget.selectApi({
      label: 'Nền tảng',
      functionService: this.combodataProxy.loaiVersion(),
      allowClearIcon: false
    });
  }

  loaiDonViTinhDichVu() {
    return this.baseWidget.selectApi({
      label: 'Loại đơn vị tính',
      functionService: this.combodataProxy.loaiDonViTinh(),
      keyCache: 'loaiDonViTinhDichVu'
    });
  }

  tinh() {
    return this.baseWidget.selectApi({
      label: 'Tỉnh/ Thành phố',
      functionService: this.combodataProxy.tinh(),
      keyCache: 'tinh'
    });
  }

  tinhMulti() {
    return this.baseWidget.selectApi({
      label: 'Tỉnh/ Thành phố',
      functionService: this.combodataProxy.tinh(),
      keyCache: 'tinh',
      nzMode: 'multiple',
      allowCheckBoxOption: true,
      allowSelectAllMultiple: true,
      nzMaxMultipleCount: 300,
      nzMaxTagCount: 3,
      renderMaxTagPlaceholderFunc: length => {
        return `và ${length} tỉnh khác (chi tiết)`;
      }
    });
  }

  huyen(cascadeField: string) {
    return this.baseWidget.selectCascade({
      cascadeField: cascadeField,
      label: 'Quận huyện',
      functionService: cascade => {
        return this.combodataProxy.huyen(cascade);
      },
      nzCascadeValueIsNull: 'Chọn tỉnh thành phố',
      keyCache: 'huyen'
    });
  }

  xa(cascadeField: string) {
    return this.baseWidget.selectCascade({
      cascadeField: cascadeField,
      label: 'Xã phường',
      functionService: cascade => {
        return this.combodataProxy.xa(cascade);
      },
      nzCascadeValueIsNull: 'Chọn quận huyện',
      keyCache: 'xa'
    });
  }

  gcpDoanhNghiep(cascadeField: string) {
    return this.baseWidget.selectCascade({
      cascadeField: cascadeField,
      label: 'GCP',
      functionService: cascade => {
        return this.combodataProxy.gcpDoanhNghiep(cascade);
      },
      nzCascadeValueIsNull: 'Chọn mã GCP',
      keyCache: 'gcpDoanhNghiep'
    });
  }

  trangThaiDoanhNghiep(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      ...config,
      label: 'Trạng thái',
      functionService: this.combodataProxy.trangThaiDoanhNghiep(),
      keyCache: 'trangThaiDoanhNghiep'
    });
  }

  nhomDichVu(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      ...config,
      label: 'Nhóm dịch vụ',
      functionService: this.combodataProxy.nhomDichVu(),
      keyCache: 'nhomDichVu'
    });
  }

  nhomSanPham(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      ...config,
      label: 'Nhóm sản phẩm',
      functionService: this.combodataProxy.nhomSanPham(),
      keyCache: 'nhomSanPham'
    });
  }


  suDung() {
    return this.baseWidget.select({
      label: 'Sử dụng',
      options: [{
        value: 'true',
        displayText: 'Có'
      }, {
        value: 'false',
        displayText: 'Không'
      }]
    });
  }

  xacThuc() {
    return this.baseWidget.select({
      label: 'Đã xác thực',
      options: [{
        value: 'true',
        displayText: 'Đã xác thực'
      }, {
        value: 'false',
        displayText: 'Chưa xác thực'
      }]
    });
  }

  trangThaiXacThuc() {
    return this.baseWidget.select({
      label: 'Đã xác thực',
      options: [{
        value: "1",
        displayText: 'Đã xác thực'
      }, {
        value: '0',
        displayText: 'Chưa xác thực'
      },
        {
          value: '2',
          displayText: 'Yêu cầu xác thực'
        }
      ]
    });
  }

  trangThaiSanPhamNoiBat(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Trạng thái',
      functionService: this.combodataProxy.trangThaiSanPhamNoiBat(),
      ...config,
    });
  }

  trangThaiDoanhNghiepNoiBat(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Trạng thái',
      functionService: this.combodataProxy.trangThaiDoanhNghiepNoiBat(),
      ...config,
    });
  }

  trangThaiBanner(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Trạng thái',
      functionService: this.combodataProxy.trangThaiBanner(),
      ...config,
    });
  }

  loaiLinkBanner(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Link đến',
      functionService: this.combodataProxy.loaiLinkBanner(),
      ...config,
    });
  }

  listNotificationName(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Tên thông báo',
      functionService: this.combodataProxy.listNotificationName(),
      ...config,
    });
  }

  danhSachVaiTro(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Đối tượng nhận TB',
      functionService: this.combodataProxy.danhSachVaiTro(),
      ...config,
    });
  }

  trangThaiDangKyGoiDvDn(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Trạng thái',
      functionService: this.combodataProxy.trangThaiDangKyGoiDvDn(),
      ...config,
    });
  }

  loaiThongBao(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.selectApi({
      label: 'Loại thông báo',
      functionService: this.combodataProxy.loaiThongBao(),
      ...config,
    });
  }

  trangThaiMoKhoa() {
    return this.baseWidget.select({
      label: 'Trạng thái',
      options: [{
        value: 'true',
        displayText: 'Đang mở'
      }, {
        value: 'false',
        displayText: 'Đang khóa'
      }],
    });
  }
  loaiDangKy() {
    return this.baseWidget.select({
      label: 'Loại đăng ký',
      options: [{
        value:  LOAI_DANG_KY_GOI_DICH_VU.DangKyMoi.toString(),
        displayText: 'Đăng ký mới'
      }, {
        value:  LOAI_DANG_KY_GOI_DICH_VU.NangCap.toString(),
        displayText: 'Nâng cấp'
      },
        {
          value:  LOAI_DANG_KY_GOI_DICH_VU.GiaHan.toString(),
          displayText: 'Gia hạn'
        }
      ],
    });
  }
  hinhThucTruyCap() {
    return this.baseWidget.select({
      label: 'Hình thức truy cập',
      options: [{
        value: 'true',
        displayText: 'Trên Mobile'
      }, {
        value: 'false',
        displayText: 'Trên Web'
      }]
    });
  }

  doanhNghiepSearchServer(config: OfSelectBaseModelConfig = null) {
    const doanhNghiepSp = this.inject.get(DoanhNghiepServiceProxy);
    return this.baseWidget.selectSearchServer({
      label: 'Doanh nghiệp',
      ...config,
      // nzNotFoundContent: 'Nhập ít nhất 3 ký tự để tìm kiếm',
      functionService: (dto: ISelectSearchServerDto) => {
        // if (this.isFilterTextLengthLessThan3SelectSearchServer(dto)) {
        //   return of({
        //     totalCount: 0,
        //     items: []
        //   } as PagedResultDtoOfSelectOption);
        // }
        const body = new DoanhNghiepSearchInputDto();
        body.filter = dto.filter;
        body.maxResultCount = 30;
        if (!OCoreUtilityService.isNullOrEmpty(dto.value)) {
          body.id = +dto.value;
        }
        return doanhNghiepSp.searchList(body).pipe(map(result => {
          return {
            totalCount: result.totalCount,
            items: result?.items ? result.items.map(it => {
              return {
                value: it.id + '',
                displayText: `(${it.maDoanhNghiep}) ${it.ten}`,
                data: it
              } as IOfSelectOptionDto
            }) : []
          } as PagedResultDtoOfSelectOption;
        }));
      },

    });
  }

  doanhNghiepSelectCustom(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.componentRef({
      ...config,
      componentRef: DoanhNghiepSelectComponent
    })
  }

  sanPhamSearchServer(config: OfSelectBaseModelConfig = null) {
    const proxyService = this.inject.get(SanPhamServiceProxy);
    return this.baseWidget.selectSearchServer({
      label: 'Sản phẩm',
      nzNotFoundContent: 'Nhập ít nhất 3 ký tự để tìm kiếm',
      functionService: (dto: ISelectSearchServerDto) => {
        if (this.isFilterTextLengthLessThan3SelectSearchServer(dto)) {
          return of({
            totalCount: 0,
            items: []
          } as PagedResultDtoOfSelectOption);
        }
        const body = new SanPhamSearchInputDto();
        body.filter = dto.filter;
        body.maxResultCount = 30;
        if (!OCoreUtilityService.isNullOrEmpty(dto.value)) {
          body.id = +dto.value;
        }
        return proxyService.searchList(body).pipe(map(result => {
          return {
            totalCount: result.totalCount,
            items: result?.items ? result.items.map(it => {
              return {
                value: it.id + '',
                displayText: `(${it.ma}) ${it.ten}`,
                data: it
              } as IOfSelectOptionDto
            }) : []
          } as PagedResultDtoOfSelectOption;
        }));
      },
      ...config
    });
  }

  sanPhamCuaDoanhNghiepSelectCustom(config: OfSelectBaseModelConfig = null) {
    return this.baseWidget.componentRef({
      ...config,
      componentRef: SanPhamCuaDoanhNghiepSelectComponent
    })
  }

  protected isFilterTextLengthLessThan3SelectSearchServer(dto: ISelectSearchServerDto) {
    return OCoreUtilityService.isNullOrEmpty(dto.value) && (OCoreUtilityService.isNullOrEmpty(dto.filter) || dto.filter.length < 3);
  }
}
