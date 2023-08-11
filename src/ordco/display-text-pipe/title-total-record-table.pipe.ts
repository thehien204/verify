import {Pipe, PipeTransform} from '@angular/core';
import {nzTableHelper} from '@node_modules/@orendaco/of/op/models/nzTableHelper';

@Pipe({
  name: 'titleTotalRecordTable',
  pure: false
})
export class TitleTotalRecordTablePipe implements PipeTransform {
  transform(nzTable: nzTableHelper, title = 'bản ghi'): string {
    if (nzTable && nzTable?.items?.length > 0) {
      return `Hiện thị: ${nzTable.skip + 1} - ${nzTable.skip + nzTable.items.length}
    / ${nzTable.totalCount} ` + title.toLowerCase()
    }
    return '';
  }

}
