import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {OfSchemaModel} from '@orendaco/of';
import {FormWidgetFacadeService} from '@app-ordco/form-widgets/form-widget-facade.service';
import {InputBoolean, InputNumber} from '@node_modules/ng-zorro-antd/core/util';

@Component({
  selector: 'app-search-form',
  templateUrl: './common-search-form.component.html',
  styles: []
})
export class CommonSearchFormComponent implements OnInit, AfterViewInit {
  @Input() searchSchema: OfSchemaModel;
  @Input() @InputNumber() widthButtonBox = 3;
  @Input() @InputBoolean() hasSearchBtn = true;

  constructor(private fw: FormWidgetFacadeService) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.builderFormSearch();
  }

  builderFormSearch() {
    this.searchSchema.fields.push({
      ...this.fw.base.templateRef({
        label: ' '
      }),
      dataField: 'btn',
      css: 'ord-search-group',
      grid: this.fw.getGridByWidth(this.widthButtonBox)
    });
    this.searchSchema.fields.push(this.fw.base.text({
      label: ' ',
      dataField: 'sorting',
      hidden: true
    }));

  }

  onSearch() {
    this.searchSchema.search();
  }
}
