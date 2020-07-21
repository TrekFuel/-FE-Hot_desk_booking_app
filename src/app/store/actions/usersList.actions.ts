import { Action } from '@ngrx/store';
import { UserInterface } from '../../shared/modules/user.interface';

export enum usersListActionType {
  USERS_LIST = '[Users] UsersList',
  USERS_LIST_SUCCESS = '[Users] LoadUsersList success',
  USERS_LIST_FAILURE = '[Users] LoadUsersList failure',
  USERS_LIST_DELETE = '[Users] LoadUsersList delete',
}

export class usersListAction implements Action {
  readonly type = usersListActionType.USERS_LIST;
}

export class usersListSuccessAction implements Action {
  readonly type = usersListActionType.USERS_LIST_SUCCESS;

  constructor(public payload: { users: UserInterface[] }) {}
}

export class usersListFailureAction implements Action {
  readonly type = usersListActionType.USERS_LIST_FAILURE;
}

export class usersListDeleteAction implements Action {
  readonly type = usersListActionType.USERS_LIST_DELETE;
}

export type usersListTypeActions =
  | usersListAction
  | usersListFailureAction
  | usersListSuccessAction
  | usersListDeleteAction;
