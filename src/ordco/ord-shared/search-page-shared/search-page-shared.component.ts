import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-search-page-shared',
  templateUrl: './search-page-shared.component.html',
  styleUrls: ['./search-page-shared.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPageSharedComponent {
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal'
  @Input() titlePage = '';
  @Input() allowTitleTextUppercase = true;
  @Input() pageSpinning = false;
  @Input() tipSpinning = 'Đang xử lý thông tin';
  @Input() hasSearchBox = true;
  @Input() searchBoxTitle = 'Thông tin tìm kiếm';

}
