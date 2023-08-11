import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NzModalRef} from "@node_modules/ng-zorro-antd/modal";
import {GanDoanhNghiepUserDto, SysUserDto, SysUserServiceProxy} from "@service-proxies/verify-service-proxies";
import {DestroyRxjsService, OfSchemaModel} from "@node_modules/@orendaco/of";
import {FormWidgetFacadeService} from "@app-ordco/form-widgets/form-widget-facade.service";
import {finalize, takeUntil, tap} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-gan-doanh-nghiep-phu-trach',
  templateUrl: './gan-doanh-nghiep-phu-trach.component.html',
  styles: [],
  providers: [DestroyRxjsService]
})
export class GanDoanhNghiepPhuTrachComponent implements AfterViewInit {
  user: SysUserDto;
  listDoanhNghiep = [];
  schemaForm = new OfSchemaModel({
    fieldObject: {
      name: this.fw.base.text({
        label: 'Họ tên',
        grid: this.fw.getGridByWidth(12),
        disabled: true,
      }),
      userName: this.fw.base.text({
        label: 'Tên đăng nhập',
        grid: this.fw.getGridByWidth(12),
        disabled: true,
      }),
      doanhNghiepId: this.fw.selectControl.doanhNghiepSearchServer({
        label: 'Tìm kiếm doanh nghiệp',
        placeholder: 'Nhập mã/ tên doanh nghiệp để tìm kiếm',
        grid: this.fw.getGridByWidth(24)
      }),
    }
  });

  constructor(private modal: NzModalRef,
              private userSp: SysUserServiceProxy,
              private destroy$: DestroyRxjsService,
              private fw: FormWidgetFacadeService) {
  }

  ngAfterViewInit(): void {
    this.userSp.getDoanhNghiepDaGan(this.user.id).subscribe(d => {
      this.listDoanhNghiep = d.listDoanhNghiepId || [];
    });
    this.schemaForm.patchValue(this.user);
    const fcDoanhNghiep = this.schemaForm.form.getControl('doanhNghiepId');
    fcDoanhNghiep.valueChanges
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(v => {
        if (v) {
          fcDoanhNghiep.patchValue(null);
          const find = this.listDoanhNghiep.find(x => x == v);
          if (!find) {
            this.listDoanhNghiep.push(v);
          }

        }
      })).subscribe();
  }

  onClose(id: number) {
    this.listDoanhNghiep = this.listDoanhNghiep.filter(x => x != id);
  }

  onSave() {
    const body = new GanDoanhNghiepUserDto();
    body.userId = this.user.id;
    body.listDoanhNghiepId = this.listDoanhNghiep;
    abp.ui.setBusy();
    this.userSp.ganDoanhNghiepPhuTrach(body)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(d => {
        abp.notify.success('Gán doanh nghiệp phụ trách thành công');
        this.destroyModal();
      });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
