import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import {
  BookingStoreInterface,
  GapDateInterface,
} from '../../booking/modules/booking-store.interface';

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

export const gapDateBooking = createSelector(
  bookingSelector,
  (state: BookingStoreInterface): GapDateInterface => {
    return state.gapDate;
  }
);
