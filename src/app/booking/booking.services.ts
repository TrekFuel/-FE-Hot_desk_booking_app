import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateBookingInterface, GetAllBookingsInterface } from './modules/booking-store.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingServices {
  constructor(private http: HttpClient) {}

  getAllBooking(data: GetAllBookingsInterface) {
    console.log(data);
    return this.http.get(`
    ${environment.databaseURL}/booking/byroom?roomId=${data.roomId}&start=${data.startDate}&end=${data.endDate}`);
  }

  createBooking(data: CreateBookingInterface) {
    // console.log({
    //   bookingDate: data.startDate,
    //   dueDate: data.endDate,
    //   placeId: data.placeId,
    //   userDto: data.userDto,
    // });
    return this.http.post(`${environment.databaseURL}/booking`, {
      bookingDate: data.startDate,
      dueDate: data.endDate,
      placeId: data.placeId,
      userDto: data.userDto,
    });
  }
}
