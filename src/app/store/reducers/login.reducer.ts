import {AuthResponse} from '../../auth/login/models/auth-response.model';
import {loginActionType, loginTypeActions} from '../actions/login.actions';

const initialState: AuthResponse = {
  username: '',
  token: '',
};

export function loginReducer(
  state: AuthResponse = initialState,
  action: loginTypeActions,
) {
  switch (action.type) {
    case loginActionType.LOGIN_START:
      return {
        ...state,
      };
    case loginActionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.payload.loggedInUser,
      };
    case loginActionType.LOGIN_FAILURE:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
