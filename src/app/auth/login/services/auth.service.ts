import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginUser } from '../models/login-user.model';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { LoginSuccessAction, LogoutStartAction } from '../../../store/actions/auth.actions';
import { LoginInterface } from '../../../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _expirationDate: Date;

  constructor(private http: HttpClient,
              private store$: Store<AppState>) {
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

  getUserFromLocalStorage(): LoginInterface {
    if (localStorage.getItem(environment.localStorageUser)) {
      return JSON.parse(localStorage.getItem(environment.localStorageUser));
    }
  }

  // check if we have user in localStorage and in case we have - user creation from localStorage
  autoLogin(): void {
    let loadedUser: LoginInterface;
    if (this.getUserFromLocalStorage()) {
      loadedUser = this.getUserFromLocalStorage();
      this.store$.dispatch(new LoginSuccessAction
      ({
        loggedInUser: loadedUser.loggedInUser,
        expirationDate: loadedUser.expirationDate
      }));
      this.autoLogout();
    }
  }

  logout(body): Observable<object> {
    return this.http.post(`${environment.databaseURL}/logout`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  autoLogout(): void {
    this._expirationDate = this.getUserFromLocalStorage().expirationDate;
    const due = Number
    (new Date(this._expirationDate).getTime() - new Date().getTime());
    setTimeout(() => {
      this.store$.dispatch(new LogoutStartAction());
    }, due);
  }

}
