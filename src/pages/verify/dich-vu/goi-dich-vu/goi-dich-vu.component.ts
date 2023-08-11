import {Component, OnInit} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {CHIET_KHAU_THEO, GoiDichVuDto, GoiDichVuServiceProxy, SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG} from "@service-proxies/verify-service-proxies";
import {finalize, tap} from "@node_modules/rxjs/internal/operators";
import {FbGoiDichVuService} from "./fb-goi-dich-vu.service";
import {combineLatest} from "@node_modules/rxjs";
import {OfSchemaModel} from "@node_modules/@orendaco/of";

@Component({
  selector: 'app-goi-dich-vu',
  templateUrl: './goi-dich-vu.component.html',
  styles: []
})
export class GoiDichVuComponent extends AppOrdCoComponentBase implements OnInit {
  proxyServices = this.builderCommonCrudProxyService('app/goi-dich-vu');
  searchSchema = this.fbService.builderSearch();

  constructor(private injector: Injector,
              private fbService: FbGoiDichVuService,
              private goiDvSP: GoiDichVuServiceProxy,
              private sysAuditLogService: SysAuditLogServiceProxy) {
    super(injector);
  }
  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.GoiDichVu).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.GoiDichVu);
    })
  }

  openCreateOrUpdate(record = null) {
    this.crudService.openCreateOrUpdate({
      entityName: 'Gói dịch vụ',
      id: record?.id,
      editDto: record,
      nzDrawerOptions: {
        nzHeight: '100vh'
      },
      callBackSavedSuccess: () => {
        this.searchSchema.reloadDataTable();
      },
      type: 'drawer',
      entitySchema: this.fbService.builderEntity(),
      proxyServices: this.proxyServices,
      afterViewInitFunc: (entitySchema: OfSchemaModel<GoiDichVuDto>, id: number, editDto) => {
        this.addValidateChietKhau(entitySchema);
        this.addListChiTietArrayForm(entitySchema, id, editDto);
      }
    });
  }

  addListChiTietArrayForm(entitySchema: OfSchemaModel<GoiDichVuDto>, id: number, editDto) {
    if (!id) {
      this.goiDvSP.getById(0).subscribe(dto => {
        dto.chietKhauTheoId = 1;
        this.fbService.addListChiTietArrayForm(entitySchema.form, dto.listOfChiTiet);
        entitySchema.patchValue(dto);
      })
    } else {
      if (editDto != null) {
        editDto.isActive = editDto.isActive ? 'true' : 'false';
        this.fbService.addListChiTietArrayForm(entitySchema.form, editDto.listOfChiTiet);
        entitySchema.patchValue(editDto);
      }
    }
  }

  addValidateChietKhau(entitySchema: OfSchemaModel<GoiDichVuDto>) {
    const chietKhauCtrl = entitySchema.form.getControl('chietKhau');
    const chietKhauTheoCtrl = entitySchema.form.getControl('chietKhauTheoId');
    const tongTienCtrl = entitySchema.form.getControl('tongTien');
    combineLatest([chietKhauTheoCtrl.value$, chietKhauCtrl.value$, tongTienCtrl.value$])
      .pipe(tap(([chietKhauTheo,
                   chietKhau,
                   tongTien]) => {
        if (chietKhauTheo == CHIET_KHAU_THEO.PhanTram && chietKhau > 100) {
          chietKhauCtrl.setErrors({'Chiết khấu theo phần trăm không lớn hơn 100': true});
          return;
        }
        if (chietKhauTheo == CHIET_KHAU_THEO.SoTien && chietKhau > tongTien) {
          chietKhauCtrl.setErrors({'Chiết khấu lớn hơn tổng tiền': true});
          return;
        }
        chietKhauCtrl.setErrors(null);
      })).subscribe();
  }

  delete(record: any): void {
    this.crudService.removeById({
      name: `Gói dịch vụ "${record.ten}"`,
      proxyServices: this.proxyServices,
      id: record.id,
      callBack: () => {
        this.searchSchema.reloadDataTable();
      }
    });
  }

  lock(id: number, lock: boolean) {
    abp.ui.setBusy();
    this.goiDvSP.lock(id, lock)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(d => {
        abp.notify.success(lock ? 'Khóa thành công' : 'Mở khóa thành công');
        this.searchSchema.reloadDataTable();
      });

  }
}
