import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../environments/environment";

@Pipe({
  name: 'imgSrc'
})
export class ImgUrlPipe implements PipeTransform {

  constructor() {
  }

  transform(value: string ): string {
    return environment.oAuthConfig.issuer + value;
  }
}
