import { AuthResponse } from '../../auth/login/models/auth-response.model';

const initialState: AuthResponse = {
  username: '',
  token: '',
};

export function loginReducer(
  state: AuthResponse = initialState,
) {
  return state;
}
