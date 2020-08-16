export interface BookingStoreInterface {
  mapId: GetAllMapIdInterface;
  gapDate: GapDateInterface;
  getBooking?: GetAllBookingsInterface;
  allBookings?: [];
}

export interface GetAllMapIdInterface {
  addressId: string;
  officeId: string;
  floorId: string;
  roomId: string;
}

export interface GetAllBookingsInterface {
  startDate: string;
  endDate: string;
  roomId: string;
}

export interface GapDateInterface {
  startDate: string;
  endDate: string;
}
