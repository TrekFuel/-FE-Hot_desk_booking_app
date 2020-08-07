import { Action } from '@ngrx/store';
import {
  dataRoomsManagementEditInterface,
  GetFloorDataInterface,
  GetOfficeDataInterface,
  GetRoomDataInterface,
} from '../../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';

export enum roomsManagementEditActionType {
  R_M_E_START = '[RoomsManagementEdi] Start Office',
  R_M_E_OFFICE = '[RoomsManagementEdi] Post Office',
  R_M_E_FLOOR = '[RoomsManagementEdi] Post Floor',
  R_M_E_ROOM = '[RoomsManagementEdi] Post Room',
  R_M_E_PLACE = '[RoomsManagementEdi] Post Place',
}

export class roomsManagementEditStartAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_START;

  constructor(
    public payload: {
      dataRoomsContainer: dataRoomsManagementEditInterface;
      addressId: string;
    }
  ) {}
}

export class roomsManagementEditOfficeAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_OFFICE;

  constructor(
    public payload: {
      dataCreateOffice: GetOfficeDataInterface;
    }
  ) {}
}

export class roomsManagementEditFloorAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_FLOOR;

  constructor(
    public payload: {
      getDataFloor: GetFloorDataInterface;
    }
  ) {}
}

export class roomsManagementEditRoomAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_ROOM;

  constructor(
    public payload: {
      getDataRoom: GetRoomDataInterface;
    }
  ) {}
}

export class roomsManagementEditPlaceAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_PLACE;

  constructor(
    public payload: {
      getDataPlace: any;
    }
  ) {}
}

export type roomsManagementEditTypeActions =
  | roomsManagementEditStartAction
  | roomsManagementEditOfficeAction
  | roomsManagementEditFloorAction
  | roomsManagementEditRoomAction
  | roomsManagementEditPlaceAction;
