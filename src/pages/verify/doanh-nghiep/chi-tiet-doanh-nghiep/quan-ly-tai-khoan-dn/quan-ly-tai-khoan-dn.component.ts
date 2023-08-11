import {Component, Injector, Input, OnInit} from "@angular/core";
import {
  DoanhNghiepDto, SanPhamDto,
  SysUserDto,
  SysUserSearchInputDto,
  SysUserServiceProxy
} from "@service-proxies/verify-service-proxies";
import {NzModalService} from "ng-zorro-antd/modal";
import {PagedListingComponentBase, PagedRequestDto} from "src/shared/common/paged-listing-component-base";
import {FormBuilder, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {ReuseTabService} from "@node_modules/@delon/abc/reuse-tab";
import {ISelectOption} from "@app-ordco/ora-select/model";
import {
  CommonConfirmModalComponent
} from "@app-ordco/ord-shared/crud-page/common-confirm-modal/common-confirm-modal.component";
import {SysUserProxyService} from "../../../../admin/users/sys-user-proxy.service";
import {forkJoin} from "@node_modules/rxjs";
import {NzSafeAny} from "@node_modules/ng-zorro-antd/core/types";
import {NzDrawerService} from "@node_modules/ng-zorro-antd/drawer";
import {GrantRoleUserComponent} from "../../../../admin/grant-role-user/grant-role-user.component";
import {FbUserService} from "../../../../admin/users/fb-user.service";
import {CommonCrudService} from "@app-ordco/ord-shared/crud-page/common-crud.service";
import {OCoreUtilityService, OfSchemaModel} from "@node_modules/@orendaco/of";
import {debounceTime, distinctUntilChanged, map, takeUntil} from "@node_modules/rxjs/internal/operators";


@Component({
  selector: 'quan-ly-tai-khoan-dn',
  templateUrl: './quan-ly-tai-khoan-dn.component.html',
})
export class QuanLyTaiKhoanDnComponent extends PagedListingComponentBase<SysUserDto> implements OnInit {
  @Input() doanhNghiepModeDto: DoanhNghiepDto;
  rfFormGroup: FormGroup;
  $loading = new BehaviorSubject(true);
  sourceTrangThai: ISelectOption[] = [
    {value: true, displayText: "Kích hoạt"},
    {value: false, displayText: "Khoá"},
  ]
  searchSchema = this.fbUser.builderSearch();
  private _crudService: CommonCrudService;

  constructor(private injector: Injector, private _dataService: SysUserServiceProxy,
              private _sysUserService: SysUserProxyService,
              private reuseService: ReuseTabService,
              private nzModalService: NzModalService,
              private fbUser: FbUserService,
              private fb: FormBuilder) {
    super(injector);
    this.rfFormGroup = this.fb.group({
      filter: '',
      isActive: undefined
    });

  }

  ngOnInit() {
    this.refresh();
  }


  clear() {
    this.rfFormGroup.reset({
      isActive: undefined
    });
    this.refresh();
  }

  showCreateOrEditModal(dataItem?: SysUserDto): void {
    // this.nzModalService.create<CreateOrEditDoanhNghiepMaToanCauComponent>({
    //   nzTitle: dataItem ? 'Sửa : ' + dataItem.ma : 'Thêm mới',
    //   nzContent: CreateOrEditDoanhNghiepMaToanCauComponent,
    //   nzWidth: '50%',
    //   nzComponentParams: {
    //     dataItem: dataItem,
    //     doanhNghiepId: this.doanhNghiepModeDto.id
    //   },
    //   nzFooter: null,
    // }).afterClose.subscribe(result => {
    //   if (result) {
    //     this.refresh();
    //   }
    // })
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
    const input: SysUserSearchInputDto = new SysUserSearchInputDto(formValue);
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


  get crudService(): CommonCrudService {
    if (!this._crudService) {
      this._crudService = new CommonCrudService(this.injector);
    }
    return this._crudService;
  }

  openChangePassword(user) {
    this.crudService.openEditModal({
      schemaModel: this.fbUser.builderChangePassword(),
      nzModalOptions: {
        nzTitle: 'Đổi mật khẩu'
      },
      afterViewInitFunc: entitySchema => {
        entitySchema.patchValue(user);
      },
      saveProxy: dto => {
        return this._sysUserService.changePassword(user.id, dto.password);
      },
      messageSuccess: 'Đổi mật khẩu thành công cho tài khoản: ' + user.userName
    });

  }

  delete(user: any) {
    this.crudService.removeById({
      name: `Người dùng "${user.name}"`,
      proxyServices: this._sysUserService,
      id: user.id,
      callBack: () => {
        this.refresh();
      }
    });
  }

  onGrantRole(user: any) {
    abp.ui.setBusy();
    forkJoin([
      this._sysUserService.getRoleCanGrant(user.id),
      this._sysUserService.getGrantedRoleId(user.id)
    ])
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(([roles, grantedId]) => {
        let roleGranted = [];
        if (roles?.length > 0 && grantedId?.length > 0) {
          roleGranted = roles.filter((it: NzSafeAny) => {
            return grantedId.indexOf(it.id) > -1;
          });
        }

        const drawerRef = this.injector.get(NzDrawerService).create({
          nzTitle: 'Gán vai trò cho người dùng',
          nzWidth: '100vw',
          nzWrapClassName: 'grant-role-users',
          nzContent: GrantRoleUserComponent,
          nzContentParams: {
            userInformation: user,
            roleGranted: roleGranted,
            roles
          }
        });

      });

  }


  onLockUser(user: SysUserDto, lock: boolean) {

    this._sysUserService.lock(user.id, lock).subscribe(d => {
      abp.notify.success(lock ? 'Khóa tài khoản thành công' : 'Mở khóa thành công');
      this.refresh();
    });
  }

  openEdit(user?: SysUserDto) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Tài khoản người dùng',
      id: user?.id,
      editDto: user,
      nzModalOptions: {
        nzWidth: '500px'
      },
      callBackSavedSuccess: value => {
        this.refresh();
      },
      afterViewInitFunc: (entitySchema, id, editDto) => {
        setTimeout(() => {
          if (user?.extraProperties?.DoanhNghiepId) {
            entitySchema.form.get('doanhNghiepId').patchValue('' + user.extraProperties.DoanhNghiepId);
          } else {
            entitySchema.form.get('doanhNghiepId').patchValue('' + this.doanhNghiepModeDto.id);
          }

        })
      },
      type: 'modal',
      entitySchema: user ? this.fbUser.builderEditEntity() : this.fbUser.builderCreateEntity(),
      proxyServices: this._sysUserService
    });
  }

  handlerForm(entitySchema: OfSchemaModel<SysUserDto>, isEdit: boolean) {
    console.log("entitySchema", entitySchema.form.value)
    if (isEdit) {
      // entitySchema.form.getControl('ma').disable({onlySelf: true});
      entitySchema.form.get('doanhNghiepId').patchValue('' + entitySchema.form.value.extraProperties.DoanhNghiepId);
      return;
    } else {
    }
  }
}
