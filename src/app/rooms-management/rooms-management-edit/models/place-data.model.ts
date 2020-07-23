import { PlaceRole } from './place-role';

export interface PlaceData {
  id: string,
  role: PlaceRole,
  isFree: boolean,
  occupiedBy?: string | string[],
  maxQuantity?: number,
  quantity?: number,
  infoForAdmins?: any,
}
