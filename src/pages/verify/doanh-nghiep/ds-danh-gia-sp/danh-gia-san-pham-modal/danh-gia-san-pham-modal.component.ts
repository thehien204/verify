import {Component, Input, OnInit} from '@angular/core';
import {
  DanhGiaSanPhamDto,
  DanhGiaSanPhamManagerServiceProxy,
  DanhGiaSanPhamSearchListInputDto
} from "@service-proxies/verify-service-proxies";

class DanhGiaSanPhamExtendDto extends DanhGiaSanPhamDto {
  inputReply: string;
  isShowReppy: boolean;
  loadingReply: boolean;
}

@Component({
  templateUrl: './danh-gia-san-pham-modal.component.html',
  styles: []
})
export class DanhGiaSanPhamModalComponent implements OnInit {
  @Input() sanPhamId: number;
  data: DanhGiaSanPhamDto[] = [];

  constructor(private danhGiaSpProxy: DanhGiaSanPhamManagerServiceProxy) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    const input = new DanhGiaSanPhamSearchListInputDto();
    input.sanPhamId = this.sanPhamId;
    this.danhGiaSpProxy.searchList(input)
      .subscribe(res => {
        this.data = res.items;

      })
  }

  xoaDanhGia(comment: DanhGiaSanPhamDto) {
    abp.ui.setBusy()
    this.danhGiaSpProxy.remove(comment.id)
      .subscribe(res => {
        this.getList();
        abp.ui.clearBusy()
      });
  }

  handleSubmit(comment: DanhGiaSanPhamExtendDto) {
    comment.loadingReply = true;
    const input = new DanhGiaSanPhamDto(comment);
    input.parentId = comment.id;
    input.nhanXet = comment.inputReply;
    input.diem = 0;
    this.danhGiaSpProxy.create(input)
      .subscribe(res => {
        comment.loadingReply = false;
        this.getList();
      })
  }
}
