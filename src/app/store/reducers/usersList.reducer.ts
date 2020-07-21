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
    case usersListActionType.USERS_LIST:
      return [...state];
    case usersListActionType.USERS_LIST_SUCCESS:
      return [...state, ...action.payload.users];
    case usersListActionType.USERS_LIST_FAILURE:
      return [...state];
    case usersListActionType.USERS_LIST_DELETE:
      return [];
    default:
      return [...state];
  }
}
