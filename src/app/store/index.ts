import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { UserInterface } from '../shared/modules/user.interface';

export interface AppState {
  usersList: UserInterface[];
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
