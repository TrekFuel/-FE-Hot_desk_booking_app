import { Action } from '@ngrx/store';
import { SelectorsModel } from '../../shared/models/selectors.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';
import { OfficesDataSelectsInterface } from '../../shared/models/offices-data-selects.interface';

export enum officeChoosingActionType {
  SELECTORS_DATA_START = '[OfficeChoosing] OfficeChoosing start',
  SELECTORS_DATA_SUCCESS = '[OfficeChoosing] OfficeChoosing success',
  SELECTORS_DATA_FAILURE = '[OfficeChoosing] OfficeChoosing failure',
  SELECTORS_CREATE_ADDRESS_START = '[OfficeChoosing] OfficeChoosing create address start',
  SELECTORS_CREATE_ADDRESS = '[OfficeChoosing] OfficeChoosing create address',
}

export class officeChoosingStartAction implements Action {
  readonly type = officeChoosingActionType.SELECTORS_DATA_START;
}

export class officeChoosingSuccessAction implements Action {
  readonly type = officeChoosingActionType.SELECTORS_DATA_SUCCESS;

  constructor(public payload: { selectorsData: SelectorsModel }) {}
}

export class officeChoosingFailureAction implements Action {
  readonly type = officeChoosingActionType.SELECTORS_DATA_FAILURE;

  constructor(
    public payload: {
      errors: HttpErrorResponse;
      message: MessageStateInterface;
    }
  ) {}
}

export class officeChoosingStartCreateAddressAction implements Action {
  readonly type = officeChoosingActionType.SELECTORS_CREATE_ADDRESS_START;

  constructor(public payload: { selectorData: OfficesDataSelectsInterface }) {}
}

export class officeChoosingCreateAddressAction implements Action {
  readonly type = officeChoosingActionType.SELECTORS_CREATE_ADDRESS;

  constructor(public payload: { selectorData: OfficesDataSelectsInterface }) {}
}

export type officeChoosingTypeActions =
  | officeChoosingStartAction
  | officeChoosingSuccessAction
  | officeChoosingFailureAction
  | officeChoosingStartCreateAddressAction
  | officeChoosingCreateAddressAction;
