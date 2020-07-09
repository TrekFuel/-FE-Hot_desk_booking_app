import { Action } from '@ngrx/store';

export const FIRST_ACTION = 'FIRST_ACTION';

export class FirstActions implements Action{
  readonly type = FIRST_ACTION;
  constructor(public payload: any) {}
}
