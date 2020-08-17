import { UserDataInterface } from '../../auth/login/models/auth-response.model';

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

export interface CreateBookingInterface {
  startDate: string;
  endDate: string;
  userId: string;
  placeId: string;
  userDto?: UserDataInterface;
}
