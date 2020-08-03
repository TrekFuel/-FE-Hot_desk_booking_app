import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { SelectorsModel } from '../../shared/models/selectors.model';

export const officeChoosingSelector = createFeatureSelector<
  AppState,
  SelectorsModel
>('officeChoosing');

export const selectorsData = createSelector(
  officeChoosingSelector,
  (data: SelectorsModel): SelectorsModel => {
    return data;
  }
);
