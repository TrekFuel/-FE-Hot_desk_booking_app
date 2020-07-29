import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { usersListActionType } from '../actions/usersList.actions';
import { delay, map } from 'rxjs/operators';
import {
  messageStateFinishAction,
  messageStateStartAction,
} from '../actions/messageState.action';

interface messageStateInterface {
  payload;
  type;
}

/*  add actions */
const showMessageAction = [usersListActionType.USERS_LIST_FAILURE];

@Injectable()
export class MessageStateEffects {
  @Effect()
  loaderStart$ = this.actions$.pipe(
    ofType(...showMessageAction),
    map((action: messageStateInterface) => {
      let { message } = action.payload;
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