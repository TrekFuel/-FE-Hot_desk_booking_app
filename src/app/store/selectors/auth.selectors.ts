import {
  AuthResponse,
  UserDataInterface,
} from '../../auth/login/models/auth-response.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';

export interface LoginInterface {
  loggedInUser: AuthResponse;
  expirationDate: Date;
}

export const loginSelector = createFeatureSelector<AppState, LoginInterface>(
  'auth'
);

export const userSelector = createSelector(
  loginSelector,
  (login: LoginInterface): AuthResponse => {
    return login.loggedInUser;
  }
);

export const userTokenSelector = createSelector(
  loginSelector,
  (login: LoginInterface): string => {
    if (login.loggedInUser) {
      return login.loggedInUser.token;
    }
  }
);

export const userRolesSelector = createSelector(
  loginSelector,
  (login: LoginInterface): string[] => {
    if (login.loggedInUser.token) {
      return login.loggedInUser.userInfo.roleNames;
    }
  }
);

export const userData = createSelector(
  loginSelector,
  (login: LoginInterface): UserDataInterface => {
    return login.loggedInUser.userInfo;
  }
);
