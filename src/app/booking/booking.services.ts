import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingServices {
  constructor(private http: HttpClient) {}

  getAllBooking() {
    this.http.get(`${environment.databaseURL}/booking`);
  }
}
