import { Component } from '@angular/core';
import { ModalAlertInterface } from './models/modal-alert.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { modalAlertDataSelector } from '../../store/selectors/modalAlert.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-alert-container',
  template: ` <app-modal-alert
    [messageData]="$message | async"
  ></app-modal-alert>`,
})
export class ModalAlertContainer {
  public $message: Observable<ModalAlertInterface>;

  constructor(private store$: Store<AppState>) {
    this.$message = this.store$.select(modalAlertDataSelector);
  }
}
