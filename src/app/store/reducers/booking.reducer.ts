import { BookingStoreInterface } from '../../booking/modules/booking-store.interface';
import {
  bookingActionType,
  bookingTypeActions,
} from '../actions/booking.actions';

const initialState: BookingStoreInterface = null;

export function bookingReducer(
  state: BookingStoreInterface = initialState,
  action: bookingTypeActions
) {
  switch (action.type) {
    case bookingActionType.BOOKING_GET_MAP_ID:
      return {
        ...state,
        mapId: action.payload.mapId,
      };
    case bookingActionType.BOOKING_GAP_DATE:
      return {
        ...state,
        gapDate: action.payload.gapDate,
      };
    case bookingActionType.BOOKING_ALL:
      return {
        ...state,
        allBookings: action.payload.allBookings,
      };
    default:
      return {
        ...state,
      };
  }
}
