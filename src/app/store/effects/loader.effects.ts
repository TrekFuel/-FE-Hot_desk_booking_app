import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { usersListActionType } from '../actions/usersList.actions';
import { map } from 'rxjs/operators';
import {
  loaderFinishAction,
  loaderStartAction,
} from '../actions/loader.actions';
import { officeChoosingActionType } from '../actions/officeChoosing.actions';
import { authActionType } from '../actions/auth.actions';
import { roomsManagementEditActionType } from '../actions/roomsManagementEdit.actions';

const showLoaderAction = [
  usersListActionType.USERS_LIST_START,
  officeChoosingActionType.SELECTORS_DATA_START,
  authActionType.LOGIN_START,
  authActionType.LOGOUT_START,
  officeChoosingActionType.SELECTORS_CREATE_ADDRESS_START,
  roomsManagementEditActionType.R_M_E_PLACE,
  roomsManagementEditActionType.R_M_E_START_GET_MAP,
];

const hideLoaderAction = [
  usersListActionType.USERS_LIST_FAILURE,
  usersListActionType.USERS_LIST_SUCCESS,
  officeChoosingActionType.SELECTORS_DATA_SUCCESS,
  officeChoosingActionType.SELECTORS_DATA_FAILURE,
  authActionType.LOGIN_SUCCESS,
  authActionType.LOGIN_FAILURE,
  authActionType.LOGOUT_END,
  officeChoosingActionType.SELECTORS_CREATE_ADDRESS,
  roomsManagementEditActionType.R_M_E_SAVE_MAP,
  roomsManagementEditActionType.R_M_E_GET_MAP,
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
