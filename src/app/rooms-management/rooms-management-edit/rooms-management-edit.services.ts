import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestOfficeInterface } from './models/ request.interface';
import { Observable } from 'rxjs';
import { ResponseOfficeDtoInterface } from './models/response.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomsManagementEditServices {
  constructor(private http: HttpClient) {}

  postOffice(
    data: RequestOfficeInterface
  ): Observable<ResponseOfficeDtoInterface> {
    return this.http
      .post(`${environment.databaseURL}/office`, data)
      .pipe(map((data: ResponseOfficeDtoInterface) => data));
  }

  postFloor(
    data: RequestOfficeInterface
  ): Observable<ResponseOfficeDtoInterface> {
    return this.http
      .post(`${environment.databaseURL}/floor`, data)
      .pipe(map((data: ResponseOfficeDtoInterface) => data));
  }
}
