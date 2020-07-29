import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { usersListActionType } from '../actions/usersList.actions';
import { map } from 'rxjs/operators';
import {
  loaderFinishAction,
  loaderStartAction,
} from '../actions/loader.action';

const showLoaderAction = [usersListActionType.USERS_LIST_START];

const hideLoaderAction = [
  usersListActionType.USERS_LIST_FAILURE,
  usersListActionType.USERS_LIST_SUCCESS,
];

@Injectable()
export class LoaderEffects {
  @Effect()
  loaderStart$ = this.actions$.pipe(
    ofType(...showLoaderAction),
    map((s) => new loaderStartAction())
  );

  @Effect()
  loaderFinish$ = this.actions$.pipe(
    ofType(...hideLoaderAction),
    map((s) => new loaderFinishAction())
  );

  constructor(private actions$: Actions) {}
}
