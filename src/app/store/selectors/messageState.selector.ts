import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { MessageStateInterface } from '../../layout/message-state/modules/message.interface';

export const messageStateSelector = createFeatureSelector<
  AppState,
  MessageStateInterface
>('messageState');

export const messageSelector = createSelector(
  messageStateSelector,
  (state: MessageStateInterface): MessageStateInterface => {
    return state;
  }
);
