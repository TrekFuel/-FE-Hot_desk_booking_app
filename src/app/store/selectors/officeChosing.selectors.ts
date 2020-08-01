import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const officeChoosingSelector = createFeatureSelector<
  AppState,
  SelectionMode
>('officeChoosing');

export const selectorsData = createSelector(
  officeChoosingSelector,
  (data: SelectionMode): SelectionMode => {
    return data;
  }
);
