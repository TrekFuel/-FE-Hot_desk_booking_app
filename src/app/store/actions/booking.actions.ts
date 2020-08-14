import { Action } from '@ngrx/store';
import {
  GapDateInterface,
  GetAllMapIdInterface,
} from '../../booking/modules/booking-store.interface';

export enum bookingActionType {
  BOOKING_GET_MAP_ID = '[Booking] Booking Get map id',
  BOOKING_GET_ALL = '[Booking] Booking Get all bookings',
}

export class bookingGetMapIdAction implements Action {
  readonly type = bookingActionType.BOOKING_GET_MAP_ID;

  constructor(public payload: { mapId: GetAllMapIdInterface }) {}
}

export class getAllBookingsAction implements Action {
  readonly type = bookingActionType.BOOKING_GET_ALL;

  constructor(public payload: { gapDate: GapDateInterface }) {}
}

export type bookingTypeActions = bookingGetMapIdAction | getAllBookingsAction;
