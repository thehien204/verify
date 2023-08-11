import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OraUploadFileComponent} from "@app-ordco/custom/ora-upload-file/ora-upload-file.component";
import {NzUploadModule} from "@node_modules/ng-zorro-antd/upload";
import {NzButtonModule} from "@node_modules/ng-zorro-antd/button";
import {NzIconModule} from "@node_modules/ng-zorro-antd/icon";


const com = [
  OraUploadFileComponent
]

@NgModule({
  declarations: [...com],
  exports: [...com],
  imports: [
    CommonModule,
    NzUploadModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class CustomModule {
}
