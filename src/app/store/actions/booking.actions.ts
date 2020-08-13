import { Action } from '@ngrx/store';
import { UsersRequestPathInterface } from '../../users/models/requestPath.interface';
import { GetAllMapId } from '../../booking/modules/booking-store.interface';

export enum bookingActionType {
  BOOKING_GET_MAP_ID = '[Booking] Booking Get map id',
}

export class bookingGetMapIdAction implements Action {
  readonly type = bookingActionType.BOOKING_GET_MAP_ID;

  constructor(public payload: { mapId: GetAllMapId }) {}
}

export type bookingTypeActions = bookingGetMapIdAction;
