import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GetFloorDataInterface,
  GetOfficeDataInterface,
  GetPlaceDataInterface,
  GetRoomDataInterface,
  PostFloorDataInterface,
  PostOfficeDataInterface,
  PostPlaceDataInterface,
  PostRoomDataInterface,
} from './models/rooms-management-edit-store.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomsManagementEditServices {
  constructor(private http: HttpClient) {}

  postOffice(
    data: PostOfficeDataInterface
  ): Observable<GetOfficeDataInterface> {
    return this.http
      .post(`${environment.databaseURL}/office`, data)
      .pipe(map((dataOffice: GetOfficeDataInterface) => dataOffice));
  }

  postFloor(data: PostFloorDataInterface): Observable<GetFloorDataInterface> {
    return this.http
      .post(`${environment.databaseURL}/floor`, data)
      .pipe(map((dataFloor: GetFloorDataInterface) => dataFloor));
  }

  postRoom(data: PostRoomDataInterface): Observable<GetRoomDataInterface> {
    return this.http
      .post(`${environment.databaseURL}/room`, data)
      .pipe(map((dataRoom: GetRoomDataInterface) => dataRoom));
  }

  postPlaces(
    data: PostPlaceDataInterface[]
  ): Observable<GetPlaceDataInterface[]> {
    return this.http
      .post(`${environment.databaseURL}/place/places`, data)
      .pipe(map((data: GetPlaceDataInterface[]) => data));
  }
}
