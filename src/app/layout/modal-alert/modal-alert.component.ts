import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ModalAlertInterface } from './models/modal-alert.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { modalAlertFinishesAction } from '../../store/actions/modalAlert.action';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAlertComponent {
  @Input() public visibleModal: boolean;
  @Input() public messageData: ModalAlertInterface;
  @ViewChild('btnTrue') public btnTrue: ElementRef;
  @ViewChild('btnFalse') public btnFalse: ElementRef;

  constructor(private store$: Store<AppState>) {}

  onClick(): void {
    this.store$.dispatch(new modalAlertFinishesAction());
  }
}
