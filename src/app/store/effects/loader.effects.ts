import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { usersListActionType } from '../actions/usersList.actions';
import { map } from 'rxjs/operators';
import {
  loaderFinishAction,
  loaderStartAction,
} from '../actions/loader.action';
import { officeChoosingActionType } from '../actions/officeChoosing.action';
import { authActionType } from '../actions/auth.actions';

const showLoaderAction = [
  usersListActionType.USERS_LIST_START,
  officeChoosingActionType.SELECTORS_DATA_START,
  authActionType.LOGIN_START,
  officeChoosingActionType.SELECTORS_CREATE_ADDRESS_START,
];

const hideLoaderAction = [
  usersListActionType.USERS_LIST_FAILURE,
  usersListActionType.USERS_LIST_SUCCESS,
  officeChoosingActionType.SELECTORS_DATA_SUCCESS,
  officeChoosingActionType.SELECTORS_DATA_FAILURE,
  authActionType.LOGIN_SUCCESS,
  authActionType.LOGIN_FAILURE,
  officeChoosingActionType.SELECTORS_CREATE_ADDRESS,
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
