import { Action } from '@ngrx/store';
import {
  GapDateInterface,
  GetAllMapIdInterface,
} from '../../booking/modules/booking-store.interface';

export enum bookingActionType {
  BOOKING_GET_MAP_ID = '[Booking] Booking Get map id',
  BOOKING_GAP_DATE = '[Booking] Booking Gap Date bookings',
  BOOKING_ALL = '[Booking] Booking All',
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

export type bookingTypeActions =
  | bookingGetMapIdAction
  | gapDateBookingsAction
  | getAllBookingsAction;
