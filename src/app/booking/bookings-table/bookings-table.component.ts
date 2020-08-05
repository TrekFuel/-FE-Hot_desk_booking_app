import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as _moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { Booking } from './models/booking.model';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
  providers: [ { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS } ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsTableComponent {

  date = new FormControl(moment());

  @Input() bookingData: Booking[];

}
