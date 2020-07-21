import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { UserInterface } from '../shared/modules/user.interface';
import { LoaderInterface } from '../layout/loader/modules/loader.interface';
import { stateLoaderReducer } from './reducers/stateLoader.reducer';

export interface AppState {
  usersList: UserInterface[];
  stateLoader: LoaderInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  stateLoader: stateLoaderReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
