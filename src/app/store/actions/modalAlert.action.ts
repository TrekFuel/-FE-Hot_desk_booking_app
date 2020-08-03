import { Action } from '@ngrx/store';
import { ModalAlertInterface } from '../../layout/modal-alert/models/modal-alert.interface';

export enum modalAlertActionType {
  MODAL_ALERT_START = '[Modal-Alert] ModalAlert start',
  MODAL_ALERT_FINISHES = '[Modal-Alert] ModalAlert finishes',
}

export class modalAlertStartAction implements Action {
  readonly type = modalAlertActionType.MODAL_ALERT_START;

  constructor(public payload: { messageModal: ModalAlertInterface }) {}
}

export class modalAlertFinishesAction implements Action {
  readonly type = modalAlertActionType.MODAL_ALERT_FINISHES;
}

export type modalAlertTypeActions =
  | modalAlertStartAction
  | modalAlertFinishesAction;
