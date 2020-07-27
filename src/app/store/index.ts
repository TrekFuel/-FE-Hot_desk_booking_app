import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { UserInterface } from '../shared/modules/user.interface';
import { authReducer } from './reducers/auth.reducer';
import { LoginInterface } from './selectors/auth.selectors';

export interface AppState {
  usersList: UserInterface[];
  login: LoginInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  login: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
