import { Component } from '@angular/core';
import { Booking } from './models/booking.model';
import { BookingPageService } from './booking-page.service';

@Component({
  selector: 'app-booking-table-container',
  template: `
    <app-bookings-table [bookingData]="bookings"></app-bookings-table>`
})
export class BookingsTableContainer {
  bookings: Booking[];

  constructor(private bookingsService: BookingPageService) {
    this.bookings = this.bookingsService.bookings;
  }

}
