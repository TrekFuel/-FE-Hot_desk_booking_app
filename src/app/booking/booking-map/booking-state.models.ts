export interface BookingStateOnUI {
  placeId: string,
  isFree: boolean,
  placeNumber?: number,
  nameOfUser?: string,
  userId?: string
}

export interface CurrentBookingPlace {
  isPlaceClicked: boolean,
  placeData: BookingStateOnUI | null
}
