import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-common-cell-is-active',
  templateUrl: './common-cell-is-active.component.html',
  styles: []
})
export class CommonCellIsActiveComponent implements OnInit {
  @Input() isActive = false;
  @Input() trueText ="Có";
  @Input() falseText ="Không";

  constructor() {
  }

  ngOnInit(): void {
  }

}
