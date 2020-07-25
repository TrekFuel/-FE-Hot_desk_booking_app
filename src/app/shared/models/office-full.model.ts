import { MapDataModel } from './map-data.model';
import { OfficeAddress } from './office-address';

export interface OfficeFullModel {
  address: OfficeAddress,
  map: MapDataModel,
  id?: string,
}
