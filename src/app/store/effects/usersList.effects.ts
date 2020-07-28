import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as usersListTypeActions from '../actions/usersList.actions';
import {usersListActionType, usersListFailureAction, usersListSuccessAction} from '../actions/usersList.actions';
import {UsersServices} from '../../users/users.services';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {MessageStateInterface} from '../../layout/message-state/modules/message.interface';
import {UsersRequestPathInterface} from '../../users/modules/requestPath.interface';
import {GetAllUsersInterface} from '../../shared/models/getAllUsers.interface';
import {UserInterface} from '../../shared/models/user.interface';

@Injectable()
export class UsersListEffects {
  @Effect()
  loadUsersList$ = this.actions$.pipe(
    ofType(usersListActionType.USERS_LIST_START),
    switchMap((data: usersListTypeActions.usersListStartAction) => {
      const queryParam: UsersRequestPathInterface = data.payload.queryParams;

      return this.usersServices.getUsersList(queryParam).pipe(
        map((data: GetAllUsersInterface) => {
          const arrUsers: { users: UserInterface[] } = {
            users: data.content,
          };
          return new usersListSuccessAction(arrUsers);
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
