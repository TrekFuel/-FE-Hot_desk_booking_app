export interface MapDataModel {
  mapData: string;
  placesData: PlaceData[];
}

export interface PlaceData {
  number: number;
  placeType: PlaceRole;
  id?: string;
  tempId?: string;
  roomId?: string;
  isFree?: boolean;
  maxQuantity?: number;
  nameOfBooked?: string;
}

export enum PlaceRole {
  cowork,
  confroom,
  constant,
}
