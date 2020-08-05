import { Action } from '@ngrx/store';
import { ResponseOfficeDtoInterface } from '../../rooms-management/rooms-management-edit/models/response.interface';
import { PlaceData } from '../../shared/models/map-data.model';

export enum roomsManagementEditActionType {
  R_M_E_START = '[RoomsManagementEdit] Start office',
  R_M_E_CREATE_OFFICE = '[RoomsManagementEdit] Create office',
  R_M_E_CREATE_FLOOR = '[RoomsManagementEdit] Create Floor',
  R_M_E_CREATE_ROOM = '[RoomsManagementEdit] Create Room',
  R_M_E_CREATE_PLACE_START = '[RoomsManagementEdit] Start Create Place',
}

export class roomsManagementEditStartAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_START;

  constructor(public payload: { addressId: string }) {}
}

export class roomsManagementEditCreateOfficeAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_CREATE_OFFICE;

  constructor(public payload: { response: ResponseOfficeDtoInterface }) {}
}

export class roomsManagementEditCreateFloorAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_CREATE_FLOOR;

  constructor(public payload: { response: ResponseOfficeDtoInterface }) {}
}

export class roomsManagementEditCreateRoomAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_CREATE_ROOM;
}

export class roomsManagementEditCreateStartPlaceAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_CREATE_PLACE_START;

  constructor(public payload: { place: PlaceData }) {}
}

export type roomsManagementEditTypeActions =
  | roomsManagementEditStartAction
  | roomsManagementEditCreateOfficeAction
  | roomsManagementEditCreateFloorAction
  | roomsManagementEditCreateRoomAction;
