import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfficesDataSelectsInterface } from '../models/offices-data-selects.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficeChoosingServices {
  constructor(private http: HttpClient) {}

  getSelectorsData(): Observable<OfficesDataSelectsInterface[]> {
    return this.http.get(`${environment.databaseURL}/address`).pipe(
      map((data: OfficesDataSelectsInterface[]) => {
        return [...data];
      })
    );
  }

  postSelectorsData(
    data: OfficesDataSelectsInterface
  ): Observable<OfficesDataSelectsInterface> {
    return this.http
      .post(`${environment.databaseURL}/address`, data)
      .pipe(map((data: OfficesDataSelectsInterface) => data));
  }
}
