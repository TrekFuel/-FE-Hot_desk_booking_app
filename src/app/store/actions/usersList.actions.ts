import { Action } from '@ngrx/store';
import { UserInterface } from '../../shared/modules/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

export enum usersListActionType {
  USERS_LIST_START = '[Users] UsersList start',
  USERS_LIST_SUCCESS = '[Users] LoadUsersList success',
  USERS_LIST_FAILURE = '[Users] LoadUsersList failure',
}

export class usersListStartAction implements Action {
  readonly type = usersListActionType.USERS_LIST_START;
}

export class usersListSuccessAction implements Action {
  readonly type = usersListActionType.USERS_LIST_SUCCESS;

  constructor(public payload: { users: UserInterface[] }) {}
}

export class usersListFailureAction implements Action {
  readonly type = usersListActionType.USERS_LIST_FAILURE;

  constructor(public payload: { errors: HttpErrorResponse }) {}
}

export type usersListTypeActions =
  | usersListStartAction
  | usersListFailureAction
  | usersListSuccessAction;
