import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  usersListActionType,
  usersListFailureAction,
  usersListSuccessAction,
} from '../actions/usersList.actions';
import { UsersServices } from '../../users/users.services';
import { UserInterface } from '../../shared/modules/user.interface';
import { UsersListInterface } from '../../users/modules/usersList.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class UsersListEffects {
  @Effect()
  loadUsersList$ = this.actions$.pipe(
    ofType(usersListActionType.USERS_LIST_START),
    switchMap(() => {
      return this.usersServices.getUsersList().pipe(
        map((data: UserInterface[]) => {
          const arrUsers: UsersListInterface = { users: data };
          return new usersListSuccessAction(arrUsers);
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(new usersListFailureAction({ errors: errorResponse }));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private usersServices: UsersServices
  ) {}
}
