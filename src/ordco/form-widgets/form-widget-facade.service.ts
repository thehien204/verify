import {Injectable, Injector} from '@angular/core';
import {OCoreUtilityService, OfFormWidgetsService, OfGridSchema} from '@orendaco/of';
import {OfValidateService} from './of-validate.service';
import {SelectWidgetService} from './select-widget.service';
import {CustomWidgetService} from './custom-widget/custom-widget.service';
import {FormatDataControlService} from '@app-ordco/form-widgets/format-data-control.service';
import {ButtonGroupWidgetService} from '@app-ordco/form-widgets/button-group-widget.service';

@Injectable({
  providedIn: 'root'
})
export class FormWidgetFacadeService {

  private _baseWidgetsService: OfFormWidgetsService;
  private _validateService: OfValidateService;
  private _selectControl: SelectWidgetService;
  private _buttonGroupWidget: ButtonGroupWidgetService;
  private _customControl: CustomWidgetService;
  private _formatService: FormatDataControlService;

  constructor(private injector: Injector) {
  }

  get base(): OfFormWidgetsService {
    if (!this._baseWidgetsService) {
      this._baseWidgetsService = this.injector.get(OfFormWidgetsService);
    }
    return this._baseWidgetsService;
  }

  /**
   * Validate control chung
   */
  get validate(): OfValidateService {
    if (!this._validateService) {
      this._validateService = this.injector.get(OfValidateService);
    }
    return this._validateService;
  }

  /**
   * Cấu hình các control select như tỉnh/ huyện /xã ...
   */
  get selectControl(): SelectWidgetService {
    if (!this._selectControl) {
      this._selectControl = this.injector.get(SelectWidgetService);
    }
    return this._selectControl;
  }

  get buttonGroupWidget(): ButtonGroupWidgetService {
    if (!this._buttonGroupWidget) {
      this._buttonGroupWidget = this.injector.get(ButtonGroupWidgetService);
    }
    return this._buttonGroupWidget;
  }

  /**
   * Các control widget custom
   */
  get custom(): CustomWidgetService {
    if (!this._customControl) {
      this._customControl = this.injector.get(CustomWidgetService);
    }
    return this._customControl;
  }

  get formatData(): FormatDataControlService {
    if (!this._formatService) {
      this._formatService = this.injector.get(FormatDataControlService);
    }
    return this._formatService;
  }

  public getGridByWidth(width: number): OfGridSchema {
    return OCoreUtilityService.getGridByWidth(width);
  }
}
