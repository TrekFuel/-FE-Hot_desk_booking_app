import {
  usersListActionType,
  usersListTypeActions,
} from '../actions/usersList.actions';
import { UserInterface } from '../../shared/modules/user.interface';

const initialState: UserInterface[] = [];

export function usersListReducer(
  state: UserInterface[] = initialState,
  action: usersListTypeActions
) {
  switch (action.type) {
    case usersListActionType.USERS_LIST_START:
      return {
        ...state,
        loader: true,
      };
    case usersListActionType.USERS_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        loader: false,
      };
    case usersListActionType.USERS_LIST_FAILURE:
      return {
        ...state,
        loader: false,
      };
    default:
      return {
        ...state,
      };
  }
}
