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
import { OfficeChoosingInterface } from '../shared/models/selectors.model';
import { officeChoosingReducer } from './reducers/officeChoosing.reducer';
import { ResponseOfficeDtoInterface } from '../rooms-management/rooms-management-edit/models/response.interface';
import { roomsManagementEditReducer } from './reducers/roomsManagementEdit.reducer';

export interface AppState {
  usersList: UsersListInterface;
  auth: LoginInterface;
  loader: LoaderInterface;
  messageState: MessageStateInterface;
  modalAlert: ModalAlertInterface;
  officeChoosing: OfficeChoosingInterface;
  roomsManagementEdit: ResponseOfficeDtoInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  auth: authReducer,
  loader: loaderReducer,
  messageState: messageStateReducer,
  modalAlert: moduleAlertReducer,
  officeChoosing: officeChoosingReducer,
  roomsManagementEdit: roomsManagementEditReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
