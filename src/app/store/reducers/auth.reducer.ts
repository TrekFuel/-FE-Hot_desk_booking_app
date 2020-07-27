import { authActionType, authTypeActions } from '../actions/auth.actions';
import { LoginInterface } from '../selectors/auth.selectors';

const initialState: LoginInterface = {
  loggedInUser: {
    username: null,
    token: null,
  }
};

export function authReducer(
  state: LoginInterface = initialState,
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
