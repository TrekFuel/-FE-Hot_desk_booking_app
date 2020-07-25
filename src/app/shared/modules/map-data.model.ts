export interface MapDataModel {
  mapData: string,
  placesData: PlaceData[]
}

export interface PlaceData {
  id: string,
  role: PlaceRole,
  isFree: boolean,
  occupiedBy?: string | string[],
  maxQuantity?: number,
  quantity?: number,
  infoForAdmins?: any,
}

export enum PlaceRole {
  cowork,
  confroom,
  constant,
}
