import { RoomsManagementEditStoreInterface } from '../../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';
import {
  roomsManagementEditActionType,
  roomsManagementEditTypeActions,
} from '../actions/roomsManagementEdit.action';

const initialState: RoomsManagementEditStoreInterface = {
  addressId: null,
  officeId: null,
  floorId: null,
  roomId: null,
  officeDto: null,
  defaultData: null,
  florDtoInterface: null,
  roomDtoInterface: null,
  placeDtoInterface: null,
};

export function roomsManagementEditReducer(
  state: RoomsManagementEditStoreInterface = initialState,
  action: roomsManagementEditTypeActions
) {
  switch (action.type) {
    case roomsManagementEditActionType.R_M_E_START:
      return {
        ...state,
        addressId: action.payload.addressId,
        defaultData: action.payload.defaultData,
      };
    case roomsManagementEditActionType.R_M_E_OFFICE:
      return {
        ...state,
        officeId: action.payload.dataCreateOffice.id,
        officeDto: action.payload.dataCreateOffice,
      };
    case roomsManagementEditActionType.R_M_E_FLOOR:
      return {
        ...state,
        floorId: action.payload.getDataFloor.id,
        florDtoInterface: action.payload.getDataFloor,
      };
    case roomsManagementEditActionType.R_M_E_ROOM:
      return {
        ...state,
        roomId: action.payload.getDataRoom.id,
        roomDtoInterface: action.payload.getDataRoom,
      };
    case roomsManagementEditActionType.R_M_E_CREATE_MAP:
      return {
        ...state,
        placeDtoInterface: action.payload.getDataMap,
      };
    default:
      return {
        ...state,
      };
  }
}
