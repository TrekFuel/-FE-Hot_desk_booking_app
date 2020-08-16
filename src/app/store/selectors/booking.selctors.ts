import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { BookingStoreInterface } from '../../booking/modules/booking-store.interface';

export const bookingSelector = createFeatureSelector<
  AppState,
  BookingStoreInterface
>('booking');

export const bookingMapId = createSelector(
  bookingSelector,
  (state: BookingStoreInterface): BookingStoreInterface => {
    return state;
  }
);

export const allBookings = createSelector(
  bookingSelector,
  (state: BookingStoreInterface): [] => {
    return state.allBookings;
  }
);
