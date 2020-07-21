import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  usersListActionType,
  usersListSuccessAction,
} from '../actions/usersList.actions';
import { UsersServices } from '../../users/users.services';
import { UserInterface } from '../../shared/modules/user.interface';
import { UsersListInterface } from '../../users/modules/usersList.interface';

@Injectable()
export class UsersListEffects {
  @Effect()
  loadUsersList$ = this.actions$.pipe(
    ofType(usersListActionType.USERS_LIST),
    switchMap(() => {
      return this.usersServices.getUsersList().pipe(
        map((data: UserInterface[]) => {
          const arrUsers: UsersListInterface = { users: data };
          return new usersListSuccessAction(arrUsers);
        }),
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private usersServices: UsersServices
  ) {}
}
