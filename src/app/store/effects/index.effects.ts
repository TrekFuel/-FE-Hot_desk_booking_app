import { UsersListEffects } from './usersList.effects';
import { AuthEffects } from './auth.effects';
import { LoaderEffects } from './loader.effects';
import { MessageStateEffects } from './messageState.effects';

export const indexEffects = [
  UsersListEffects,
  AuthEffects,
  LoaderEffects,
  MessageStateEffects,
];
