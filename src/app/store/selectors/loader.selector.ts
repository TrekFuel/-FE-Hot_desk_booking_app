import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { LoaderInterface } from '../../layout/loader/models/loader.interface';

export const loaderSelector = createFeatureSelector<AppState, LoaderInterface>(
  'loader'
);

export const loaderStateSelector = createSelector(
  loaderSelector,
  (state: LoaderInterface): boolean | null => {
    return state.visible;
  }
);
