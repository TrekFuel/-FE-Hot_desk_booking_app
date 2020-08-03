import {
  usersListActionType,
  usersListTypeActions,
} from '../actions/usersList.actions';
import { UsersListInterface } from '../../users/modules/usersList.interface';

const initialState: UsersListInterface = {
  users: [],
  numberPages: null,
  totalPages: null,
};

export function usersListReducer(
  state: UsersListInterface = initialState,
  action: usersListTypeActions
) {
  switch (action.type) {
    case usersListActionType.USERS_LIST_START:
      return {
        ...state,
      };
    case usersListActionType.USERS_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload.dataUsers.content,
        totalPages: action.payload.dataUsers.totalPages,
        numberPages: action.payload.dataUsers.number,
      };
    case usersListActionType.USERS_LIST_FAILURE:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
