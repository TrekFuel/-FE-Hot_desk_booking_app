import { Action } from '@ngrx/store';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';

export enum messageSateActionType {
  MESSAGE_START = '[MessageState] Message start',
  MESSAGE_FINISH = '[MessageState] Message finish',
}

export class messageStateStartAction implements Action {
  readonly type = messageSateActionType.MESSAGE_START;

  constructor(public payload: { messageState: MessageStateInterface }) {}
}

export class messageStateFinishAction implements Action {
  readonly type = messageSateActionType.MESSAGE_FINISH;
}

export type messageStateTypeActions =
  | messageStateStartAction
  | messageStateFinishAction;
