export interface BookingStoreInterface {
  mapId: GetAllMapId;
  getBooking: getAllBookings;
}

export interface GetAllMapId {
  addressId: string;
  officeId: string;
  floorId: string;
  roomId: string;
}

export interface getAllBookings {
  startDate: string;
  endDate: string;
  roomId: string;
}
