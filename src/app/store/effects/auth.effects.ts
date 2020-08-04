import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/login/services/auth.service';
import { Injectable } from '@angular/core';
import {
  authActionType,
  LoginFailureAction,
  LoginStartAction,
  LoginSuccessAction,
  LogoutEndAction,
} from '../actions/auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthResponse } from '../../auth/login/models/auth-response.model';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  loggedInUser$ = this.actions$.pipe(
    ofType(authActionType.LOGIN_START),
    switchMap((action: LoginStartAction) => {
      return this.services$.login(action.payload.loginData).pipe(
        map((response: AuthResponse) => {
          // user creation across all application
          const user: AuthResponse = {
            userInfo: {
              id: response.userInfo.id,
              email: response.userInfo.email,
              username: response.userInfo.username,
              firstName: response.userInfo.firstName,
              lastName: response.userInfo.lastName,
              isActive: response.userInfo.isActive,
              roleNames: [...response.userInfo.roleNames],
            },
            token: response.token,
          };
          localStorage.setItem(
            environment.localStorageUser,
            JSON.stringify(user)
          );
          this.router.navigate(['/booking']);
          return new LoginSuccessAction({
            loggedInUser: user,
          });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(new LoginFailureAction({ errors: errorResponse }));
        })
      );
    })
  );

  @Effect()
  loggedOutUser$ = this.actions$.pipe(
    ofType(authActionType.LOGOUT_START),
    switchMap(() => {
      localStorage.removeItem(environment.localStorageUser);
      this.router.navigate(['/login']);
      return of(new LogoutEndAction({ loggedInUser: null }));
    })
  );

  constructor(
    private actions$: Actions,
    private services$: AuthService,
    private router: Router
  ) {}
}
