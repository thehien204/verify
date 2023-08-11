import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector} from '@angular/core';
import {OfControlUIWidget} from "@node_modules/@orendaco/of";
import {FormArray} from '@ngneat/reactive-forms';
import {debounceTime, takeWhile} from "@node_modules/rxjs/internal/operators";
import {BangGiaDichVuDto, GoiDichVuChiTietDto, GoiDichVuDto} from "@service-proxies/verify-service-proxies";
import {NzSafeAny} from "@node_modules/ng-zorro-antd/core/types";

@Component({
  selector: 'app-goi-dich-vu-chi-tiet-form',
  templateUrl: './goi-dich-vu-chi-tiet-form.component.html',
  styleUrls: ['./index.scss']
})
export class GoiDichVuChiTietFormComponent extends OfControlUIWidget {
  ready = false;

  afterViewInit(): void {
    this.schemaModel.form.value$.pipe(
      debounceTime(200),
      takeWhile(() => {
        return !this.ready;
      })).subscribe((value: GoiDichVuDto) => {
      if (value?.listOfChiTiet) {
        this.ready = true;
      }
    })

  }

  getFormArray(): FormArray<GoiDichVuChiTietDto> {
    return this.schemaModel.form.getControl(this.field.dataField) as FormArray;
  }

  getTongTienItem(index: number) {
    const formItem = this.getFormArray().at(index);
    const value = formItem.value as NzSafeAny;
    if (value?.checked && value?.soLuong > 0 && value?.bangGiaDichVuId) {
      const findBangGia = value?.listBangGiaDto.find(x => x.id == value?.bangGiaDichVuId);
      if (findBangGia) {
        return 1 * (+value.soLuong) * findBangGia.donGia;
      }

    }
    return 0;

  }

  getTongTien() {

    const items = this.getFormArray().controls;
    let sum = 0;
    if (items) {
      items.forEach((it, idx) => {
        sum += this.getTongTienItem(idx);
      });
    }
    const thoiGianTinhGia = this.rootFormGroup.value?.thoiGianTinhGia || 0;
    this.rootFormGroup.get('tongTien').patchValue(sum * thoiGianTinhGia);
    return sum;
  }

  getGoiDichVuItem(value: string, listBangGiaDto: BangGiaDichVuDto[]): BangGiaDichVuDto {
    // @ts-ignore
    return listBangGiaDto.find(x => x.id == value);
  }
}

