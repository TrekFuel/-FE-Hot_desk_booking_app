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
    default:
      return {
        ...state,
      };
  }
}
