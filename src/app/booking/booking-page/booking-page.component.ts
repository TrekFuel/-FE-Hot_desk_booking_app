import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChooseOffice } from '../../shared/models/choose-office.model';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookingPageComponent {
  chooseOffice: ChooseOffice;
  constructor() {
  }

}
