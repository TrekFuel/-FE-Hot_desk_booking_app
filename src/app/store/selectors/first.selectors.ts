import { AppState } from '../index';
import { createSelector } from '@ngrx/store';
import { FirstModel } from '../models/first.model';

export const selectState = (state: AppState) => state;

export const firstSelect = createSelector(selectState,
  (state: FirstModel) => state);
