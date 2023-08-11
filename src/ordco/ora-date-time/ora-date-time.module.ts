import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OraDatePickerComponent } from './ora-date-time-picker/ora-date-picker.component';
import {ReactiveFormsModule} from "@node_modules/@angular/forms";
import {NzDatePickerModule} from "@node_modules/ng-zorro-antd/date-picker";

const com = [
  OraDatePickerComponent
]

@NgModule({
  declarations: [
    ...com
  ],
  exports:[...com],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ]
})
export class OraDateTimeModule { }
