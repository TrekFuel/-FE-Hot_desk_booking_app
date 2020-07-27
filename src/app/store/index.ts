import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { UserInterface } from '../shared/models/user.interface';
import { LoaderInterface } from '../layout/loader/models/loader.interface';
import { loaderReducer } from './reducers/loader.reducer';
import { MessageStateInterface } from '../layout/message-state/modules/message.interface';
import { messageStateReducer } from './reducers/messageState.reducer';

export interface AppState {
  usersList: UserInterface[];
  loader: LoaderInterface;
  messageState: MessageStateInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  loader: loaderReducer,
  messageState: messageStateReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
