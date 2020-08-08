import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfficesDataSelectsInterface } from '../models/offices-data-selects.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficeChoosingServices {
  constructor(private http: HttpClient) {}

  // ToDo move it to store later
  private _blockSelection: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get blockSelection(): Observable<boolean> {
    return this._blockSelection.asObservable();
  }

  setBlockSelection(value: boolean) {
    this._blockSelection.next(value);
  }

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
