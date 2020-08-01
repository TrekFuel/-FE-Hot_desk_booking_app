import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { usersListActionType } from '../actions/usersList.actions';
import { map } from 'rxjs/operators';
import {
  loaderFinishAction,
  loaderStartAction,
} from '../actions/loader.action';
import { officeChoosingActionType } from '../actions/officeChoosing.action';

const showLoaderAction = [
  usersListActionType.USERS_LIST_START,
  officeChoosingActionType.SELECTORS_DATA_START,
];

const hideLoaderAction = [
  usersListActionType.USERS_LIST_FAILURE,
  usersListActionType.USERS_LIST_SUCCESS,
  officeChoosingActionType.SELECTORS_DATA_SUCCESS,
  officeChoosingActionType.SELECTORS_DATA_FAILURE,
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
