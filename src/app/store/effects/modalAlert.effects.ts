import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { modalAlertActionType } from '../actions/modalAlert.actions';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ModalAlertEffects {
  @Effect()
  loaderStart$ = this.actions$.pipe(
    ofType(modalAlertActionType.MODAL_ALERT_START),
    switchMap((data) => {
      console.log(data);
      return data;
    })
  );

  constructor(private actions$: Actions) {}
}
