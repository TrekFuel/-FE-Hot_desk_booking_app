import { ResponseOfficeDtoInterface } from '../../rooms-management/rooms-management-edit/models/response.interface';
import {
  roomsManagementEditActionType,
  roomsManagementEditTypeActions,
} from '../actions/roomsManagementEdit.action';

const initialState: ResponseOfficeDtoInterface = null;

export function roomsManagementEditReducer(
  state: ResponseOfficeDtoInterface = initialState,
  action: roomsManagementEditTypeActions
) {
  switch (action.type) {
    case roomsManagementEditActionType.R_M_E_CREATE_OFFICE:
      return {
        ...state,
        ...action.payload.response,
      };
    case roomsManagementEditActionType.R_M_E_CREATE_FLOOR:
      return {
        ...state,
      };
  }
  return state;
}
