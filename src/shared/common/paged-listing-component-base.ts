import {Directive, Injector, OnInit} from '@angular/core';
import {PagedResultDto as AbpPagedResultDto} from '@node_modules/@abp/ng.core';
import {BehaviorSubject} from "rxjs";
import {AppComponentBase} from "./AppComponentBase";
import {NzModalService} from "@node_modules/ng-zorro-antd/modal";
import {
  CommonConfirmModalComponent
} from "@app-ordco/ord-shared/crud-page/common-confirm-modal/common-confirm-modal.component";

export class PagedResultDto<T = any> {
  items: T[];
  totalCount: number;
}

export class EntityDto {
  id: number | string;
}

export class PagedRequestDto {
  skipCount: number;
  maxResultCount: number;
  sorting: string;
}

export class OraTableConfig<EntityDto = any> {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  skipCount: number;
  totalItems: number;
  isTableLoading: boolean;
  dataList: EntityDto[];
}

@Directive()
// tslint:disable-next-line:directives-class-suffix
export abstract class PagedListingComponentBase<EntityDto> extends AppComponentBase implements OnInit {
  public pageSize = 10;
  public pageNumber = 1;
  public totalPages = 1;
  public skipCount: number; //
  public totalItems: number;
  public isTableLoading = true;
  public $isTableLoading = new BehaviorSubject(true);
  public allChecked = false;
  public allCheckboxDisabled = false;
  public checkboxIndeterminate = false;
  public selectedDataItems: any[] = [];
  public sorting: string = undefined;
  filterText = '';
  dataList: EntityDto[] = [];

  // public booleanFilterList: any[] = [
  //   {text: this.l('All'), value: 'All'},
  //   {text: this.l('Yes'), value: true},
  //   {text: this.l('No'), value: false},
  // ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh = () => {
    this.pageNumber = 1;
    this.restCheckStatus(this.dataList);
    this.getDataPage(this.pageNumber);
  }

  public getDataPage(page: number): void {
    const req = new PagedRequestDto();
    req.maxResultCount = this.pageSize;
    this.skipCount = (page - 1) * this.pageSize;
    req.skipCount = this.skipCount;
    req.sorting = this.sorting;
    this.isTableLoading = true;
    this.$isTableLoading.next(true);
    this.fetchDataList(req, page, () => {
      this.isTableLoading = false;
      this.$isTableLoading.next(false);
      // cập nhật trạng thái disable
      this.refreshAllCheckBoxDisabled();
    });
  }

  refreshAllCheckBoxDisabled(): void {
    this.allCheckboxDisabled = this.dataList.length <= 0;
  }

  public pageNumberChange(): void {
    if (this.pageNumber > 0) {
      this.restCheckStatus(this.dataList);
      this.getDataPage(this.pageNumber);
    }
  }

  checkAll(value: boolean): void {
    this.dataList.forEach((data) => ((<any>data).checked = this.allChecked));
    this.refreshCheckStatus(this.dataList);
  }

  refreshCheckStatus(entityList: any[]): void {
    // Chọn tất cả
    const allChecked = entityList.every((value) => value.checked === true);
    // bỏ chọn tất cả
    const allUnChecked = entityList.every((value) => !value.checked);
    this.allChecked = allChecked;
    // Kiểu hộp chọn
    this.checkboxIndeterminate = !allChecked && !allUnChecked;
    // Dữ liệu đã chọn
    this.selectedDataItems = entityList.filter((value) => value.checked);
  }

  restCheckStatus(entityList: any[]): void {
    this.allChecked = false;
    this.checkboxIndeterminate = false;
    // Dữ liệu đã chọn
    this.selectedDataItems = [];
    entityList.forEach((value) => (value.checked = false));
  }

  public showPaging(result: PagedResultDto | AbpPagedResultDto<any>): void {
    this.totalItems = result.totalCount;
  }

  gridSort(sort: { key: string; value: string }) {
    this.sorting = undefined;
    let ascOrDesc = sort.value; // 'ascend' or 'descend' or null
    const filedName = sort.key;
    if (ascOrDesc) {
      // ascOrDesc = abp.utils.replaceAll(ascOrDesc, 'end', '');
      // const args = ['{0} {1}', filedName, ascOrDesc];
      // const sortingStr = abp.utils.formatString.apply(this, args);
      this.sorting = `${filedName} ${ascOrDesc.replace('end', '')}`;
    }
    this.refresh();
  }

  isGrantedAny(...permissions: string[]): boolean {
    if (!permissions) {
      return false;
    }
    for (const permission of permissions) {
      if (this.isGranted(permission)) {
        return true;
      }
    }
    return false;
  }

  setTableEmpty() {
    this.totalItems = 0;
    this.dataList = [];
  }

  protected abstract fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: () => void): void;


}
