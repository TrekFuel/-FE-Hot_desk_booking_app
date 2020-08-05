import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Booking } from './models/booking.model';

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsTableComponent {
  @Input() bookingData: Booking[];
}
