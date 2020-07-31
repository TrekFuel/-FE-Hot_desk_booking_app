import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ModalAlertInterface } from './models/modal-alert.interface';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAlertComponent implements OnInit {
  @Input() public message: ModalAlertInterface;

  constructor() {}

  ngOnInit(): void {}
}
