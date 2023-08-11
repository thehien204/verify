import {Component, OnInit} from '@angular/core';
import {OfControlUIWidget} from '@orendaco/of';

@Component({
  template: `
    <form [formGroup]="schemaModel.form">
      <nz-input-group nzSuffix="Kg" nzPrefix="￥">
        <input [formControlName]="field.dataField" type="text" nz-input/>
      </nz-input-group>
    </form>
  `,
  styles: []
})
export class DemoCustomControlComponent extends OfControlUIWidget implements OnInit {

  ngOnInit(): void {
    this.addFormControlIntoRootFormGroup(this.field);
  }

  afterViewInit(): void {
  }

}
