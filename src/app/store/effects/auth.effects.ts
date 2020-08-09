import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/login/services/auth.service';
import { Injectable } from '@angular/core';
import {
  authActionType, LoginFailureAction,
  LoginStartAction, LoginSuccessAction, LogoutEndAction
} from '../actions/auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthResponse } from '../../auth/login/models/auth-response.model';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';
import { LoginInterface } from '../selectors/auth.selectors';

@Injectable()

export class AuthEffects {

  @Effect()
  loggedInUser$ = this.actions$
    .pipe(
      ofType(authActionType.LOGIN_START),
      switchMap((action: LoginStartAction) => {
        return this.services$.login(action.payload.loginData)
          .pipe(
            map((response: AuthResponse) => {
// user creation across all application
              const user: LoginInterface = {
                loggedInUser: {
                  expiresIn: response.expiresIn,
                  userInfo: {
                    id: response.userInfo.id,
                    email: response.userInfo.email,
                    username: response.userInfo.username,
                    firstName: response.userInfo.firstName,
                    lastName: response.userInfo.lastName,
                    isActive: response.userInfo.isActive,
                    roleNames: [...response.userInfo.roleNames],
                    position: response.userInfo.position,
                    department: response.userInfo.department,
                    location: response.userInfo.location,
                    phone: response.userInfo.phone,
                    skype: response.userInfo.skype,
                    hr: response.userInfo.hr,
                    img: response.userInfo.img,
                  },
                  token: response.token,
                },
                expirationDate: new Date(new Date().getTime() + response.expiresIn),
              };
              localStorage.setItem(environment.localStorageUser, JSON.stringify(user));
              this.services$.autoLogout();
              this.router.navigate(['/booking']);
              return new LoginSuccessAction(
                {
                  loggedInUser: user.loggedInUser,
                  expirationDate: user.expirationDate
                }
              );
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              const messageState: MessageStateInterface = {
                message: {
                  text: errorResponse.statusText,
                  stateAlert: 'alert-danger',
                }
              };

              return of(new LoginFailureAction({
                errors: errorResponse,
                message: messageState,
              }));
            }),
          );
      }),
    );

  @Effect()
  loggedOutUser$ = this.actions$
    .pipe(
      ofType(authActionType.LOGOUT_START),
      switchMap(() => {
        return this.services$.logout({})
          .pipe(
            map(() => {
              localStorage.removeItem(environment.localStorageUser);
              clearTimeout(this.services$.timer);
              this.router.navigate(['/login']);
              return new LogoutEndAction({
                loggedInUser: null,
                expirationDate: null,
                message: {
                  message: {
                    text: 'Logout',
                    stateAlert: 'alert-primary',
                  }
                }
              });
            }),
          );
      }),
    );

  constructor(
    private actions$: Actions,
    private services$: AuthService,
    private router: Router,
  ) {
  }

}
