import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { UserInterface } from '../shared/modules/user.interface';
import { authReducer } from './reducers/auth.reducer';
import { LoginInterface } from './selectors/auth.selectors';
import { LoaderInterface } from '../layout/loader/models/loader.interface';
import { loaderReducer } from './reducers/loader.reducer';
import { MessageStateInterface } from '../layout/message-state/modules/message.interface';
import { messageStateReducer } from './reducers/messageState.reducer';


export interface AppState {
  usersList: UserInterface[];
  auth: LoginInterface;
  loader: LoaderInterface;
  messageState: MessageStateInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  auth: authReducer,
  loader: loaderReducer,
  messageState: messageStateReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
