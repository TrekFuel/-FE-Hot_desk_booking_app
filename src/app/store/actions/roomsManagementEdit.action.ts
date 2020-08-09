import { Action } from '@ngrx/store';
import {
  dataRoomsManagementDefaultEditInterface,
  GetFloorDataInterface,
  GetOfficeDataInterface,
  GetRoomDataInterface,
} from '../../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';
import { PlaceData } from '../../shared/models/map-data.model';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';

export enum roomsManagementEditActionType {
  R_M_E_START = '[RoomsManagementEdi] Start Office',
  R_M_E_OFFICE = '[RoomsManagementEdi] Post Office',
  R_M_E_FLOOR = '[RoomsManagementEdi] Post Floor',
  R_M_E_ROOM = '[RoomsManagementEdi] Post Room',
  R_M_E_PLACE = '[RoomsManagementEdi] Post Place',
  R_M_E_CREATE_MAP = '[RoomsManagementEdi] Create Map',
  R_M_E_SAVE_MAP = '[RoomsManagementEdi] Save Map',
  R_M_E_START_GET_MAP = '[RoomsManagementEdi] Start Get Map',
  R_M_E_GET_MAP = '[RoomsManagementEdi] Get Map',
  R_M_E_UNBLOCK_SELECTORS = '[RoomsManagementEdi] Unblock Selectors',
  R_M_E_BLOCK_SELECTORS = '[RoomsManagementEdi] Block Selectors',
}

export class roomsManagementEditStartAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_START;

  constructor(
    public payload: {
      defaultData: dataRoomsManagementDefaultEditInterface;
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

/*-- Save map --*/
export class roomsManagementEditPlaceAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_PLACE;

  constructor(
    public payload: {
      getDataPlace: PlaceData[];
    }
  ) {}
}

export class roomsManagementEditCreateMapAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_CREATE_MAP;

  constructor(
    public payload: {
      getDataMap: PlaceData[];
    }
  ) {}
}

export class roomsManagementEditSaveMapAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_SAVE_MAP;

  constructor(
    public payload: {
      getMap: GetFloorDataInterface;
      message: MessageStateInterface;
    }
  ) {}
}

/*-- Get Map --*/
export class roomsManagementEditStartGetMapAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_START_GET_MAP;

  constructor(
    public payload: {
      addressId: string;
    }
  ) {}
}

export class roomsManagementEditGetMapAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_GET_MAP;

  constructor(
    public payload: {
      getMap: GetFloorDataInterface;
    }
  ) {}
}

export class roomsManagementEditUnblockSelectorsAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_UNBLOCK_SELECTORS;

  constructor(
    public payload: {
      blockSelection: boolean;
    }
  ) {}
}

export class roomsManagementEditBlockSelectorsAction implements Action {
  readonly type = roomsManagementEditActionType.R_M_E_BLOCK_SELECTORS;

  constructor(
    public payload: {
      blockSelection: boolean;
    }
  ) {}
}

export type roomsManagementEditTypeActions =
  | roomsManagementEditStartAction
  | roomsManagementEditOfficeAction
  | roomsManagementEditFloorAction
  | roomsManagementEditRoomAction
  | roomsManagementEditPlaceAction
  | roomsManagementEditCreateMapAction
  | roomsManagementEditSaveMapAction
  | roomsManagementEditStartGetMapAction
  | roomsManagementEditGetMapAction
  | roomsManagementEditUnblockSelectorsAction
  | roomsManagementEditBlockSelectorsAction;
