import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetAllBookingsInterface } from './modules/booking-store.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingServices {
  constructor(private http: HttpClient) {}

  getAllBooking(data: GetAllBookingsInterface) {
    console.log(data);
    return this.http.get(`
    ${environment.databaseURL}/booking/byroom?start=${data.startDate}&roomId=${data.roomId}&end=${data.endDate}`);
  }
}
