import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookingPageComponent {

  constructor() {
  }

}
