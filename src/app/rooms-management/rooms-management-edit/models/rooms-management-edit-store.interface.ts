import { PlaceData } from '../../../shared/models/map-data.model';

export interface RoomsManagementEditStoreInterface {
  addressId: string | null;
  officeId: string | null;
  floorId: string | null;
  roomId: string | null;
  defaultData: dataRoomsManagementDefaultEditInterface | null;
  officeDto: GetOfficeDataInterface | null;
  florDtoInterface: GetFloorDataInterface | null;
  roomDtoInterface: GetRoomDataInterface | null;
  placeDtoInterface: PlaceData[] | null;
}

export interface dataRoomsManagementDefaultEditInterface {
  defaultMap: string;
  number: number;
}

export interface PostOfficeDataInterface {
  addressId: string;
  number: number;
}

export interface GetOfficeDataInterface {
  addressId: string;
  floor: null;
  id: string;
  number: number;
}

export interface PostFloorDataInterface {
  officeId: string;
  number: number;
  map: string;
}

export interface GetFloorDataInterface {
  officeId: string;
  id: string;
  number: number;
  map: string;
  room: null;
}

export interface PostRoomDataInterface {
  floorId: string;
  number: number;
}

export interface GetRoomDataInterface {
  floorId: string;
  id: string;
  number: number;
  place: null;
}
