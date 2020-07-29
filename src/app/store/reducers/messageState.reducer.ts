import { MessageStateInterface } from '../../layout/message-state/modules/message.interface';
import {
  messageSateActionType,
  messageStateTypeActions,
} from '../actions/messageState.action';

const initialState: MessageStateInterface = {
  message: {
    text: null,
    stateAlert: null,
  },
};

export function messageStateReducer(
  state: MessageStateInterface = initialState,
  action: messageStateTypeActions
) {
  switch (action.type) {
    case messageSateActionType.MESSAGE_START:
      return {
        ...state,
        ...action.payload.messageState,
        visible: true,
      };
    case messageSateActionType.MESSAGE_FINISH:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
}
