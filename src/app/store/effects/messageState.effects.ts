import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { usersListActionType } from '../actions/usersList.actions';
import { delay, map } from 'rxjs/operators';
import {
  messageStateFinishAction,
  messageStateStartAction,
} from '../actions/messageState.action';
import { officeChoosingActionType } from '../actions/officeChoosing.action';
import { authActionType } from '../actions/auth.actions';
import { roomsManagementEditActionType } from '../actions/roomsManagementEdit.action';

interface messageStateInterface {
  payload;
  type;
}

const showMessageAction = [
  usersListActionType.USERS_LIST_FAILURE,
  officeChoosingActionType.SELECTORS_DATA_FAILURE,
  authActionType.LOGIN_FAILURE,
  roomsManagementEditActionType.R_M_E_SAVE_MAP,
];

@Injectable()
export class MessageStateEffects {
  @Effect()
  loaderStart$ = this.actions$.pipe(
    ofType(...showMessageAction),
    map((action: messageStateInterface) => {
      console.log(action)
      const { message } = action.payload;
      return new messageStateStartAction({ messageState: message });
    })
  );

  @Effect()
  loaderFinish$ = this.actions$.pipe(
    ofType(...showMessageAction),
    delay(4000),
    map(() => {
      return new messageStateFinishAction();
    })
  );

  constructor(private actions$: Actions) {}
}
