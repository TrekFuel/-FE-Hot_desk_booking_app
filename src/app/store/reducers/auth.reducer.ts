import {AuthResponse} from '../../auth/login/models/auth-response.model';
import {authActionType, authTypeActions} from '../actions/auth.actions';

const initialState: AuthResponse = {
  username: '',
  token: '',
};

export function authReducer(
  state: AuthResponse = initialState,
  action: authTypeActions,
) {
  switch (action.type) {
    case authActionType.LOGIN_START:
      return {
        ...state,
      };
    case authActionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.payload.loggedInUser,
      };
    case authActionType.LOGIN_FAILURE:
      return {
        ...state,
      };
    case authActionType.LOGOUT_START:
      return {
        ...state,
      };
    case authActionType.LOGOUT_END:
      return {
        ...state,
        loggedInUser: action.payload.loggedInUser,
      };
    default:
      return {
        ...state,
      };
  }
}
