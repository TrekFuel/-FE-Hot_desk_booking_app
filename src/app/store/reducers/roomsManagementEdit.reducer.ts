import { RoomsManagementEditStoreInterface } from '../../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';
import { roomsManagementEditActionType, roomsManagementEditTypeActions } from '../actions/roomsManagementEdit.actions';

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
  getMap: null,
  blockSelection: null,
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
    case roomsManagementEditActionType.R_M_E_GET_MAP:
      // console.log(action.payload.getMap);
      return {
        ...state,
        getMap: action.payload.getMap.map,
        blockSelection: true,
      };
    case roomsManagementEditActionType.R_M_E_UNBLOCK_SELECTORS:
      return {
        ...state,
        blockSelection: false,
      };
    case roomsManagementEditActionType.R_M_E_BLOCK_SELECTORS:
      return {
        ...state,
        blockSelection: true,
      };
    default:
      return {
        ...state,
      };
  }
}
