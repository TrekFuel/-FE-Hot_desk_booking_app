import { PlaceData } from '../../../shared/models/map-data.model';

export interface RoomsManagementEditStoreInterface {
  addressId: string | null;
  officeId: string | null;
  floorId: string | null;
  roomId: string | null;
  dataRoomsContainer: dataRoomsManagementEditInterface | null;
  officeDto: GetOfficeDataInterface | null;
  florDtoInterface: GetFloorDataInterface | null;
  roomDtoInterface: GetRoomDataInterface | null;
  placeDtoInterface: GetPlaceDataInterface | null;
}

export interface dataRoomsManagementEditInterface {
  addressId: string;
  number: '1';
  map: string;
  places: PlaceData[];
}

export interface PostOfficeDataInterface {
  addressId: string;
  number: '1';
}

export interface GetOfficeDataInterface {
  addressId: string;
  floor: null;
  id: string;
  number: '1';
}

export interface PostFloorDataInterface {
  officeId: string;
  number: '1';
  map: string;
}

export interface GetFloorDataInterface {
  officeId: string;
  id: string;
  number: '1';
  map: string;
  room: null;
}

export interface PostRoomDataInterface {
  floorId: string;
  number: '1';
}

export interface GetRoomDataInterface {
  floorId: string;
  id: string;
  number: '1';
  place: null;
}

export interface PostPlaceDataInterface {
  roomId: string;
  maxQuantity: string;
  number: '1';
  placeType: string;
  tempId: string;
}

export interface GetPlaceDataInterface {
  id: string;
  roomId: string;
  maxQuantity: string;
  number: '1';
  placeType: string;
  tempId: string;
}
