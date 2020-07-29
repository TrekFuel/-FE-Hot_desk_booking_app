import { Action } from '@ngrx/store';

export enum loaderActionType {
  LOADER_START = '[Loader] Loader start',
  LOADER_FINISH = '[Loader] Loader finish',
}

export class loaderStartAction implements Action {
  readonly type = loaderActionType.LOADER_START;
}

export class loaderFinishAction implements Action {
  readonly type = loaderActionType.LOADER_FINISH;
}

export type loaderTypeActions = loaderStartAction | loaderFinishAction;
