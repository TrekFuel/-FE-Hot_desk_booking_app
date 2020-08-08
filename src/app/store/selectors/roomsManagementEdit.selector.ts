import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { RoomsManagementEditStoreInterface } from '../../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';

export const roomsManagementEditSelector = createFeatureSelector<
  AppState,
  RoomsManagementEditStoreInterface
>('roomsManagementEditStore');

export const roomsManagementEditData = createSelector(
  roomsManagementEditSelector,
  (
    data: RoomsManagementEditStoreInterface
  ): RoomsManagementEditStoreInterface => {
    return data;
  }
);

export const getMapBooking = createSelector(
  roomsManagementEditSelector,
  (data: RoomsManagementEditStoreInterface): string => {
    return data.getMap;
  }
);
