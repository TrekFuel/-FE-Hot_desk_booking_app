import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { UserInterface } from '../shared/modules/user.interface';
import { AuthResponse } from '../auth/login/models/auth-response.model';
import { loginReducer } from './reducers/login.reducer';

export interface AppState {
  usersList: UserInterface[];
  login: AuthResponse;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  login: loginReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
