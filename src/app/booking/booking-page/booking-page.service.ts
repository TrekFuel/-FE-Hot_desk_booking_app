import { Injectable } from '@angular/core';
import { Booking } from './models/booking.model';

@Injectable({
  providedIn: 'root'
})

export class BookingPageService {
  // tslint:disable-next-line:variable-name
  private _bookings: Booking[] = [
    {
      country: 'Belarus',
      city: 'Minsk',
      office: 'Bogdanovicha, 30',
      floor: 1,
      place: '22a',
      date: 'July 27, 2020 - July 30, 2020'
    },
    {
      country: 'Ukraine',
      city: 'Kiev',
      office: 'Sokolovskogo, 20',
      floor: 3,
      place: 22,
      date: 'July 1, 2020 - July 7, 2020'
    },
    {
      country: 'Russia',
      city: 'Moscow',
      office: 'Lermontova, 12',
      floor: 4,
      place: 222,
      date: 'August 1, 2020 - August 3, 2020'
    },
  ];

  get bookings(): Booking[] {
    return this._bookings;
  }

  constructor() {
  }
}
