import { Action } from '@ngrx/store';
import { SelectorsModel } from '../../shared/models/selectors.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';

export enum officeChoosingActionType {
  SELECTORS_DATA_START = '[OfficeChoosing] OfficeChoosing start',
  SELECTORS_DATA_SUCCESS = '[OfficeChoosing] OfficeChoosing success',
  SELECTORS_DATA_FAILURE = '[OfficeChoosing] OfficeChoosing failure',
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

export type officeChoosingTypeActions =
  | officeChoosingStartAction
  | officeChoosingSuccessAction
  | officeChoosingFailureAction;
