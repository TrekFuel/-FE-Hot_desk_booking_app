import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoginService } from '../../auth/login/services/login.service';
import { Injectable } from '@angular/core';
import { loginActionType, LoginFailureAction,
  LoginStartAction, LoginSuccessAction } from '../actions/login.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthResponse } from '../../auth/login/models/auth-response.model';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {
  @Effect()
  loggedInUser$ = this.actions$
    .pipe(
      ofType(loginActionType.LOGIN_START),
      switchMap((action: LoginStartAction) => {
        return this.services$.login(action.payload.loginData)
          .pipe(
            map((response: AuthResponse) => {
// user creation across all application
              const user: AuthResponse = {
                username: response.username,
                token: response.token,
              };
              localStorage.setItem(environment.localStorageUser, JSON.stringify(user));
              return new LoginSuccessAction({loggedInUser: user});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(new LoginFailureAction({errors: errorResponse}));
            }),
          );
      }),
    );

  constructor(
    private actions$: Actions,
    private services$: LoginService,
  ) {
  }
}
