import { Action } from '@ngrx/store';

export enum stateLoaderActionType {
  LOADER_VISIBLE = '[Loader] StateLoader visible',
  LOADER_NOT_VISIBLE = '[Loader] StateLoader not visible',
}

export class stateLoaderVisibleAction implements Action {
  readonly type = stateLoaderActionType.LOADER_VISIBLE;
}

export class stateLoaderNotVisibleAction implements Action {
  readonly type = stateLoaderActionType.LOADER_NOT_VISIBLE;
}

export type stateLoaderTypeActions =
  | stateLoaderVisibleAction
  | stateLoaderNotVisibleAction;
