import { Action } from '@ngrx/store';
import { LoginUser } from '../../auth/login/models/login-user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../auth/login/models/auth-response.model';

export enum loginActionType {
  LOGIN_START = '[Login] Login start',
  LOGIN_SUCCESS = '[Login] Login success',
  LOGIN_FAILURE = '[Login] Login failure',
}

export class LoginStartAction implements Action {
  readonly type = loginActionType.LOGIN_START;

  constructor(public payload: { loginUser: LoginUser }) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = loginActionType.LOGIN_SUCCESS;

  constructor(public payload: { loggedInUser: AuthResponse}) {
  }
}

export class LoginFailureAction implements Action {
  readonly type = loginActionType.LOGIN_FAILURE;

  constructor(public payload: { errors: HttpErrorResponse }) {
  }
}

export type loginTypeActions =
  LoginStartAction |
  LoginSuccessAction |
  LoginFailureAction;
