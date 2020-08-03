import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomsManagementServices {
  constructor(private http: HttpClient) {}

  getAllOffice() {
    return this.http
      .get(`${environment.databaseURL}${environment.officesURL}`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
