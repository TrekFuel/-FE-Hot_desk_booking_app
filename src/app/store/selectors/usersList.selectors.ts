import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { UserInterface } from '../../shared/models/user.interface';
import { UsersListInterface } from '../../users/models/usersList.interface';

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

export const usersTotalPagesSelector = createSelector(
  usersListSelector,
  (usersList: UsersListInterface): number => {
    return +usersList.totalPages;
  }
);

export const usersNumberPageSelector = createSelector(
  usersListSelector,
  (usersList: UsersListInterface): number => {
    return +usersList.numberPages + 1;
  }
);
