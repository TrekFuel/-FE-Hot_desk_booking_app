export interface MapDataModel {
  mapData: string,
  placesData: PlaceData[]
}

export interface PlaceData {
  number: number,
  placeType: PlaceRole,
  id?: string,
  roomId?: string,
  isFree?: boolean,
  maxQuantity?: number,
}

export enum PlaceRole {
  cowork,
  confroom,
  constant,
}
