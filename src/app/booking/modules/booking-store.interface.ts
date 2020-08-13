export interface BookingStoreInterface {
  mapId: GetAllMapId;
}

export interface GetAllMapId {
  addressId: string;
  officeId: string;
  floorId: string;
  roomId: string;
}
