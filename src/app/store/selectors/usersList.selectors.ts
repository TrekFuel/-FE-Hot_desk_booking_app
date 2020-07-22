import { UserInterface } from '../../shared/modules/user.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';

export interface UsersListInterface {
  users: UserInterface[];
  loader: boolean;
}

export const usersListSelector = createFeatureSelector<
  AppState,
  UsersListInterface
>('usersList');

export const usersSelector = createSelector(
  usersListSelector,
  (usersList: UsersListInterface): UserInterface[] => {
    return usersList.users;
  }
);

export const loaderSelector = createSelector(
  usersListSelector,
  (usersList: UsersListInterface): boolean => {
    return usersList.loader;
  }
);
