import { PlaceRole } from './place-role';

export interface PlaceData {
  id: string,
  role: PlaceRole,
  occupied?: string | string[] | null,
  maxQuantity?: number,
  quantity?: number,
}
