import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { ModalAlertInterface } from '../../layout/modal-alert/models/modal-alert.interface';

export const modalAlertSelector = createFeatureSelector<
  AppState,
  ModalAlertInterface
>('modalAlert');

export const modalAlertDataSelector = createSelector(
  modalAlertSelector,
  (message: ModalAlertInterface): ModalAlertInterface => {
    return message;
  }
);
