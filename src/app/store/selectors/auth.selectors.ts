import { AuthResponse } from '../../auth/login/models/auth-response.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';

export interface LoginInterface {
  loggedInUser: AuthResponse;
}

export const loginSelector = createFeatureSelector<AppState, LoginInterface>
('login');

export const userSelector = createSelector(loginSelector,
  (login: LoginInterface): AuthResponse => {
    return login.loggedInUser;
  });

export const userTokenSelector = createSelector(loginSelector,
  (login: LoginInterface): string => {
    return login.loggedInUser.token;
  });
