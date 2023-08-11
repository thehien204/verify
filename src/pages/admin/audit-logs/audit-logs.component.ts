import {Component} from '@angular/core';
import {AppOrdCoComponentBase} from "@app-ordco/utils/app-ordco-component-base";
import {Injector} from "@node_modules/@angular/core";
import {FbAuditLogService} from "./fb-audit-log.service";
import {SysAuditLogDto} from "@service-proxies/verify-service-proxies";

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styles: []
})
export class AuditLogsComponent extends AppOrdCoComponentBase {
  proxyServices = this.builderCommonCrudProxyService('app/sys-audit-log');
  searchSchema = this.fbService.builderSearch();
  isVisible = false;
  auditDetail: SysAuditLogDto;

  constructor(private injector: Injector,
              private fbService: FbAuditLogService) {
    super(injector);
  }
}
