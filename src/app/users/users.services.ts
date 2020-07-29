import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsersRequestPathInterface } from './modules/requestPath.interface';
import { GetAllUsersInterface } from '../shared/models/getAllUsers.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  constructor(private http: HttpClient) {}

  getUsersList(data: UsersRequestPathInterface) {
    let path = data.path;
    return this.http.get(`${environment.databaseURL}${path}`).pipe(
      map((users: GetAllUsersInterface) => {
        return users;
      })
    );
  }
}
