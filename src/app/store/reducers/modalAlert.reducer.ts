import { ModalAlertInterface } from '../../layout/modal-alert/models/modal-alert.interface';
import {
  modalAlertActionType,
  modalAlertTypeActions,
} from '../actions/modalAlert.action';

const initialState: ModalAlertInterface = {
  message: null,
  btnFalse: null,
  btnTrue: null,
  btnStyle: {
    btnTrue: null,
    btnFalse: null,
  },
};

export function moduleAlertReducer(
  state: ModalAlertInterface = initialState,
  action: modalAlertTypeActions
) {
  switch (action.type) {
    case modalAlertActionType.MODAL_ALERT_START:
      return {
        ...state,
        ...action.payload.messageModal,
        visible: true,
      };
    case modalAlertActionType.MODAL_ALERT_FINISHES:
      return {
        ...state,
        visible: false,
      };
    default:
      return {
        ...state,
      };
  }
}
