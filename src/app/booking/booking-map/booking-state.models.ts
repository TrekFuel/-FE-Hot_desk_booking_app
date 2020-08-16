import { PlaceRole } from '../../shared/models/map-data.model';

export interface BookingStateOnUI {
  placeId: string,
  isFree: boolean,
  placeNumber?: number,
  placeType?: PlaceRole,
  maxQuantity?: number,
  nameOfUser?: string,
}

export interface CurrentBookingPlace {
  isPlaceClicked: boolean,
  placeData: BookingStateOnUI | null
}

export interface DataForBooking {
  placeId: string,
  userId: string,
  startDate?: string,
  endDate?: string
}
