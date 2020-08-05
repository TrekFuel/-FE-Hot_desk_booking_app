import { UsersListEffects } from './usersList.effects';
import { AuthEffects } from './auth.effects';
import { LoaderEffects } from './loader.effects';
import { MessageStateEffects } from './messageState.effects';
import { OfficeChoosingEffects } from './officeChoosing.effects';
import { roomsManagementEditEffects } from './roomsManagementEdit.effects';

export const indexEffects = [
  UsersListEffects,
  AuthEffects,
  LoaderEffects,
  MessageStateEffects,
  roomsManagementEditEffects,
  OfficeChoosingEffects,
];
