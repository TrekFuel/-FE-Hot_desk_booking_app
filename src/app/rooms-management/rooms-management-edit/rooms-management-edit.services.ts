import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GetFloorDataInterface,
  GetOfficeDataInterface,
  GetRoomDataInterface,
  PostFloorDataInterface,
  PostOfficeDataInterface,
  PostRoomDataInterface,
} from './models/rooms-management-edit-store.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaceData } from '../../shared/models/map-data.model';

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

  postPlaces(data: PlaceData[]): Observable<PlaceData[]> {
    return this.http
      .post(`${environment.databaseURL}/place/places`, data)
      .pipe(map((data: PlaceData[]) => data));
  }

  putOffice(data: PostFloorDataInterface) {
    return this.http
      .put(`${environment.databaseURL}/floor`, data)
      .pipe(map((data: GetFloorDataInterface) => data));
  }

  getOffice(idAddress: string) {
    return this.http
      .get(`${environment.databaseURL}/office/address/${idAddress}`)
      .pipe(map((data: GetFloorDataInterface) => data));
  }
}
