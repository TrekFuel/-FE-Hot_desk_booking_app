import { Action } from '@ngrx/store';
import {
  createBookingInterface,
  CreateBookingInterface,
  GapDateInterface,
  GetAllMapIdInterface,
} from '../../booking/modules/booking-store.interface';

export enum bookingActionType {
  BOOKING_GET_MAP_ID = '[Booking] Booking Get map id',
  BOOKING_GAP_DATE = '[Booking] Booking Gap Date bookings',
  BOOKING_ALL = '[Booking] Booking All',
  BOOKING_CREATE = '[Booking] Booking Create',
}

export class bookingGetMapIdAction implements Action {
  readonly type = bookingActionType.BOOKING_GET_MAP_ID;

  constructor(public payload: { mapId: GetAllMapIdInterface }) {}
}

export class gapDateBookingsAction implements Action {
  readonly type = bookingActionType.BOOKING_GAP_DATE;

  constructor(public payload: { gapDate: GapDateInterface }) {}
}

export class getAllBookingsAction implements Action {
  readonly type = bookingActionType.BOOKING_ALL;

  constructor(public payload: { allBookings: any }) {}
}

export class createBookingAction implements Action {
  readonly type = bookingActionType.BOOKING_CREATE;

  constructor(public payload: { dataCreateBooking: createBookingInterface }) {}
}

export type bookingTypeActions =
  | bookingGetMapIdAction
  | gapDateBookingsAction
  | getAllBookingsAction
  | createBookingAction;
