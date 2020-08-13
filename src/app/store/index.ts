import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { usersListReducer } from './reducers/usersList.reducer';
import { authReducer } from './reducers/auth.reducer';
import { LoginInterface } from './selectors/auth.selectors';
import { LoaderInterface } from '../layout/loader/models/loader.interface';
import { loaderReducer } from './reducers/loader.reducer';
import { MessageStateInterface } from '../layout/message-state/models/message.interface';
import { messageStateReducer } from './reducers/messageState.reducer';
import { UsersListInterface } from '../users/models/usersList.interface';
import { ModalAlertInterface } from '../layout/modal-alert/models/modal-alert.interface';
import { moduleAlertReducer } from './reducers/modalAlert.reducer';
import { OfficeChoosingInterface } from '../shared/models/selectors.model';
import { officeChoosingReducer } from './reducers/officeChoosing.reducer';
import { roomsManagementEditReducer } from './reducers/roomsManagementEdit.reducer';
import { RoomsManagementEditStoreInterface } from '../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';
import { BookingStoreInterface } from '../booking/modules/booking-store.interface';
import { bookingReducer } from './reducers/booking.reducer';

export interface AppState {
  usersList: UsersListInterface;
  auth: LoginInterface;
  loader: LoaderInterface;
  messageState: MessageStateInterface;
  modalAlert: ModalAlertInterface;
  officeChoosing: OfficeChoosingInterface;
  roomsManagementEditStore: RoomsManagementEditStoreInterface;
  booking: BookingStoreInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  usersList: usersListReducer,
  auth: authReducer,
  loader: loaderReducer,
  messageState: messageStateReducer,
  modalAlert: moduleAlertReducer,
  officeChoosing: officeChoosingReducer,
  roomsManagementEditStore: roomsManagementEditReducer,
  booking: bookingReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
