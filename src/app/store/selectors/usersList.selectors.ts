import { UserInterface } from '../../shared/models/user.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { UsersListInterface } from '../../users/modules/usersList.interface';

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

export const usersSizePageSelector = createSelector(
  usersListSelector,
  (usersList: UsersListInterface): UserInterface[] => {
    return usersList.users;
  }
);
