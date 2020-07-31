import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { authReducer } from './reducers/auth.reducer';
import { LoginInterface } from './selectors/auth.selectors';
import { LoaderInterface } from '../layout/loader/models/loader.interface';
import { loaderReducer } from './reducers/loader.reducer';
import { MessageStateInterface } from '../layout/message-state/models/message.interface';
import { messageStateReducer } from './reducers/messageState.reducer';
import { UsersListInterface } from '../users/modules/usersList.interface';
import { ModalAlertInterface } from '../layout/modal-alert/models/modal-alert.interface';
import { moduleAlertReducer } from './reducers/modalAlert.reducer';

export interface AppState {
  usersList: UsersListInterface;
  auth: LoginInterface;
  loader: LoaderInterface;
  messageState: MessageStateInterface;
  modalAlert: ModalAlertInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  auth: authReducer,
  loader: loaderReducer,
  messageState: messageStateReducer,
  modalAlert: moduleAlertReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
