import { Action } from '@ngrx/store';
import { FirstModel } from '../models/first.model';
import { FIRST_ACTION } from '../actions/first.actions';

export const initialState: {something: FirstModel[]} = {something: []};

export function firstReducer(
  state: {something: FirstModel[]} = initialState,
  action: Action) {
  switch (action.type) {
    case 'FIRST_ACTION':
      return state;
    default:
      return state;
  }
}
