import {Component, OnInit} from '@angular/core';
import { SysAuditLogServiceProxy, _definitions_TINH_NANG_HE_THONG } from '@service-proxies/verify-service-proxies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private sysAuditLogService: SysAuditLogServiceProxy) {}

  ngOnInit(): void {
    this.sysAuditLogService.tangLuotSuDungTinhNang(_definitions_TINH_NANG_HE_THONG.Dashboard).subscribe(x => {
      console.log("TangLuotSuDungTinhNang", _definitions_TINH_NANG_HE_THONG.Dashboard);
    })
  }
}
