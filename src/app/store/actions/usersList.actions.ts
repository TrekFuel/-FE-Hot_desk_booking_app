import { Action } from '@ngrx/store';
import { UserInterface } from '../../shared/models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageStateInterface } from '../../layout/message-state/modules/message.interface';
import { Params } from '@angular/router';

export enum usersListActionType {
  USERS_LIST_START = '[Users] UsersList start',
  USERS_LIST_SUCCESS = '[Users] LoadUsersList success',
  USERS_LIST_FAILURE = '[Users] LoadUsersList failure',
}

export class usersListStartAction implements Action {
  readonly type = usersListActionType.USERS_LIST_START;

  constructor(public payload: { queryParams: Params }) {}
}

export class usersListSuccessAction implements Action {
  readonly type = usersListActionType.USERS_LIST_SUCCESS;

  constructor(public payload: { users: UserInterface[] }) {}
}

export class usersListFailureAction implements Action {
  readonly type = usersListActionType.USERS_LIST_FAILURE;

  constructor(
    public payload: {
      errors: HttpErrorResponse;
      message: MessageStateInterface;
    }
  ) {}
}

export type usersListTypeActions =
  | usersListStartAction
  | usersListFailureAction
  | usersListSuccessAction;
