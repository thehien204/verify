import {Component, Injector, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  DoanhNghiepMaToanCauInputPagingDto,
  DoanhNghiep_MaToanCauDto,
  DoanhNghiep_MaToanCauServiceProxy, DoanhNghiepDto
} from "@service-proxies/verify-service-proxies";
import {NzModalService} from "ng-zorro-antd/modal";
import {PagedListingComponentBase, PagedRequestDto} from "src/shared/common/paged-listing-component-base";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateOrEditDoanhNghiepMaToanCauComponent} from "./create-or-edit.component";
import {delay, finalize} from "rxjs/operators";
import {of} from "@node_modules/rxjs";
import {BehaviorSubject} from "rxjs";
import {ReuseTabService} from "@node_modules/@delon/abc/reuse-tab";
import {ISelectOption} from "@app-ordco/ora-select/model";
import {
  CommonConfirmModalComponent
} from "@app-ordco/ord-shared/crud-page/common-confirm-modal/common-confirm-modal.component";


@Component({
  selector: 'doanh-nghiep-ma-dia-diem',
  templateUrl: './doanh-nghiep-ma-dia-diem.component.html',
})
export class DoanhNghiepMaDiaDiemComponent extends PagedListingComponentBase<DoanhNghiep_MaToanCauDto> implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;
  rfFormGroup: FormGroup;
  $loading = new BehaviorSubject(true);
  sourceTrangThai: ISelectOption[] = [
    {value: true, displayText: "Hoạt động"},
    {value: false, displayText: "Huỷ"},
  ]

  constructor(private injector: Injector, private _dataService: DoanhNghiep_MaToanCauServiceProxy,
              private reuseService: ReuseTabService,
              private nzModalService: NzModalService,
              private fb: FormBuilder) {
    super(injector);
    this.rfFormGroup = this.fb.group({
      filter: '',
      isActive: true
    });

  }

  ngOnInit() {
    this.refresh();
  }


  clear() {
    this.rfFormGroup.reset({
      isActive: true
    });
    this.refresh();
  }

  showCreateOrEditModal(dataItem?: DoanhNghiep_MaToanCauDto): void {
    this.nzModalService.create<CreateOrEditDoanhNghiepMaToanCauComponent>({
      nzTitle: dataItem ? 'Sửa : ' + dataItem.ma : 'Thêm mới',
      nzContent: CreateOrEditDoanhNghiepMaToanCauComponent,
      nzWidth: '50%',
      nzComponentParams: {
        dataItem: dataItem,
        doanhNghiepId: this.doanhNghiepModeDto.id
      },
      nzFooter: null,
    }).afterClose.subscribe(result => {
      if (result) {
        this.refresh();
      }
    })
  }

  delete(dataItem: DoanhNghiep_MaToanCauDto): void {
    this.openConfirm("", 'Bạn có chắc chắn muốn xóa ' + dataItem.ma + ' ?', () => {
      this._dataService.remove(dataItem.id).subscribe(() => {
        this.refresh();
        abp.notify.success("Xử lý thành công");
      });
    })
  }

  openConfirm(message: string, title: string, afterConfirmedFn: () => void) {
    const modal = this.injector.get(NzModalService).create<CommonConfirmModalComponent>({
      nzTitle: null,
      nzContent: CommonConfirmModalComponent,
      nzWrapClassName: 'wrap-ora-message',
      nzComponentParams: {
        message,
        title
      },
      nzWidth: 667,
      nzFooter: null
    });
    modal.afterClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        afterConfirmedFn();
      }
    });
  }

  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: () => void): void {
    const formValue = this.rfFormGroup.value;
    const input: DoanhNghiepMaToanCauInputPagingDto = new DoanhNghiepMaToanCauInputPagingDto(formValue);
    input.maxResultCount = request.maxResultCount;
    input.skipCount = request.skipCount;
    input.sorting = request.sorting;
    input.doanhNghiepId = this.doanhNghiepModeDto.id;
    this._dataService
      .searchList(input)
      .pipe(finalize(finishedCallback))
      .subscribe((result) => {
        this.dataList = result.items;
        this.showPaging(result);
      });
  }


}
