import { Component } from '@angular/core';
import { BookingPageService } from '../bookings-table/booking-page.service';
import { Booking } from '../bookings-table/models/booking.model';

@Component({
  selector: 'app-booking-page-container',
  template: `
    <app-booking-page [bookingData]="bookings"></app-booking-page>`,
})
export class BookingPageContainerComponent {
  bookings: Booking[];

  constructor(private bookingsService: BookingPageService) {
this.bookings = this.bookingsService.bookings;
  }

}
