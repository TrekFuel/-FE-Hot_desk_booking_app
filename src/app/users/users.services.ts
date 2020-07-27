import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInterface } from '../shared/models/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  constructor(private http: HttpClient) {}

  getUsersList(data) {
    console.log(data);
    return this.http.get(`${environment.databaseURL}/users`).pipe(
      map((users: UserInterface[]) => {
        return users;
      })
    );
  }
}
