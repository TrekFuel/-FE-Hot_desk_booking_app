import {
  usersListActionType,
  usersListTypeActions,
} from '../actions/usersList.actions';
import { UserInterface } from '../../shared/models/user.interface';

const initialState: UserInterface[] = [];

export function usersListReducer(
  state: UserInterface[] = initialState,
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
        users: action.payload.users,
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
