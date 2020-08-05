import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import {
  OfficeChoosingInterface,
  SelectorsModel,
} from '../../shared/models/selectors.model';

export const officeChoosingSelector = createFeatureSelector<
  AppState,
  OfficeChoosingInterface
>('officeChoosing');

export const selectorsData = createSelector(
  officeChoosingSelector,
  (data): SelectorsModel => {
    return data.selectorsData;
  }
);

export const createFloorId = createSelector(
  officeChoosingSelector,
  (data: OfficeChoosingInterface): string => {
    return data.createAddressId;
  }
);
