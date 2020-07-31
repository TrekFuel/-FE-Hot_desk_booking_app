import { Component } from '@angular/core';
import { ModalAlertInterface } from './models/modal-alert.interface';

@Component({
  selector: 'app-modal-alert-container',
  template: ` <app-modal-alert [message]="message"></app-modal-alert>`,
})
export class ModalAlertContainer {
  public message: ModalAlertInterface = {
    message: 'Hello',
    btnFalse: 'No',
    btnTrue: 'Yes',
  };
}
