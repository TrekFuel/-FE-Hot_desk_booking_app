import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as usersListTypeActions from '../actions/usersList.actions';
import {
  usersListActionType,
  usersListFailureAction,
  usersListSuccessAction,
} from '../actions/usersList.actions';
import { UsersServices } from '../../users/users.services';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';
import { UsersRequestPathInterface } from '../../users/models/requestPath.interface';
import { GetAllUsersInterface } from '../../shared/models/getAllUsers.interface';

@Injectable()
export class UsersListEffects {
  @Effect()
  loadUsersList$ = this.actions$.pipe(
    ofType(usersListActionType.USERS_LIST_START),
    switchMap((data: usersListTypeActions.usersListStartAction) => {
      const queryParam: UsersRequestPathInterface = data.payload.queryParams;

      return this.usersServices.getUsersList(queryParam).pipe(
        map((data: GetAllUsersInterface) => {
          const dataUsers: { dataUsers: GetAllUsersInterface } = {
            dataUsers: data,
          };
          return new usersListSuccessAction(dataUsers);
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          const messageState: MessageStateInterface = {
            message: {
              text: errorResponse.statusText,
              stateAlert: 'alert-danger',
            },
          };

          return of(
            new usersListFailureAction({
              errors: errorResponse,
              message: messageState,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private usersServices: UsersServices
  ) {}
}
