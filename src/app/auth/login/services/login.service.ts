import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginUser } from '../models/login-user.model';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { LoginSuccessAction } from '../../../store/actions/login.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private store$: Store<AppState>) {
  }

  login(loginData: LoginUser): Observable<AuthResponse> {
    return this.http.post(`${environment.databaseURL}/login`,
      loginData)
      .pipe(
        map((response: AuthResponse) => {
          return response;
        })
      );
  }

  // check if we have user in localStorage and in case we have - user creation from localStorage
  autoLogin() {
    let user: {
      username: string,
      token: string,
    };

    const userFromLocalStorage = localStorage.getItem(environment.localStorageUser);
    if (userFromLocalStorage) {
      user = JSON.parse(userFromLocalStorage);
      const loadedUser: AuthResponse = {
        username: user.username,
        token: user.token,
      };

      this.store$.dispatch(new LoginSuccessAction({loggedInUser: loadedUser}));
    } else {
      return false;
    }
  }

}
