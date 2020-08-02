import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginUser } from '../models/login-user.model';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { LoginSuccessAction } from '../../../store/actions/auth.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private store$: Store<AppState>,
              private router: Router) {
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
    let loadedUser: AuthResponse;

    const userFromLocalStorage = localStorage.getItem(environment.localStorageUser);
    if (userFromLocalStorage) {
      loadedUser = JSON.parse(userFromLocalStorage);
      this.router.navigate(['/booking']);
      this.store$.dispatch(new LoginSuccessAction({loggedInUser: loadedUser}));
    } else {
      return false;
    }
  }

}
