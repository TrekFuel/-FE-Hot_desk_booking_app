import { Action } from '@ngrx/store';
import { ResponseOfficeDtoInterface } from '../../rooms-management/rooms-management-edit/models/response.interface';

export enum roomsManagementEditActionType {
  R_M_E_START = '[RoomsManagementEdit] Start office',
  R_M_E_CREATE_OFFICE = '[RoomsManagementEdit] Create office',
  R_M_E_CREATE_FLOOR = '[RoomsManagementEdit] Create Floor',
  R_M_E_CREATE_ROOM = '[RoomsManagementEdit] Create Room',
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
}

export class roomsManagementEditCreateRoomAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_CREATE_ROOM;
}

export type roomsManagementEditTypeActions =
  | roomsManagementEditStartAction
  | roomsManagementEditCreateOfficeAction
  | roomsManagementEditCreateFloorAction
  | roomsManagementEditCreateRoomAction;
