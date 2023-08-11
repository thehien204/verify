import {Pipe, PipeTransform} from '@angular/core';
import {OCoreUtilityService} from "@node_modules/@orendaco/of";

@Pipe({
  name: 'khungGioDisplay'
})
export class KhungGioDisplayPipe implements PipeTransform {

  transform(khungGio: number): string {
    if (OCoreUtilityService.isNullOrEmpty(khungGio)) {
      return '';
    }
    const h = Math.floor(khungGio / 100);
    const m = khungGio % 100;
    return `${this.numberToString(h)}:${this.numberToString(m)}`;
  }

  numberToString(v: number) {
    if (v < 10) {
      return '0' + v;
    }
    return v + '';
  }

}
