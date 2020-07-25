import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../auth/login/models/auth-response.model';
import { LoginUser } from '../../auth/login/models/login-user.model';

export enum authActionType {
  LOGIN_START = '[Login] Login start',
  LOGIN_SUCCESS = '[Login] Login success',
  LOGIN_FAILURE = '[Login] Login failure',
  LOGOUT_START = '[Logout] Logout start',
  LOGOUT_END = '[Logout] Logout end',
}

export class LoginStartAction implements Action {
  readonly type = authActionType.LOGIN_START;

  constructor(public payload: { loginData: LoginUser }) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = authActionType.LOGIN_SUCCESS;

  constructor(public payload: { loggedInUser: AuthResponse }) {
  }
}

export class LoginFailureAction implements Action {
  readonly type = authActionType.LOGIN_FAILURE;

  constructor(public payload: { errors: HttpErrorResponse }) {
  }
}

export class LogoutStartAction implements Action {
  readonly type = authActionType.LOGOUT_START;
}

export class LogoutEndAction implements Action {
  readonly type = authActionType.LOGOUT_END;

  constructor(public payload: { loggedInUser: null }) {
  }
}

export type authTypeActions =
  LoginStartAction |
  LoginSuccessAction |
  LoginFailureAction |
  LogoutStartAction |
  LogoutEndAction;
