import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOption'
})
export class IsOptionPipe implements PipeTransform {
  transform(value: any, curVal: any[]): boolean {
    return curVal ? curVal?.findIndex(x => x === value) > -1 : false;
  }

}
