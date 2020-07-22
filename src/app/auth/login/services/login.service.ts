import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user-model';
import {AuthResponse} from '../models/auth-response.model';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoginUser} from '../models/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // tslint:disable-next-line:variable-name
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  get loginUser$() {
    return this._user$;
  }

  constructor(private http: HttpClient) {
  }

  login(loginData: LoginUser): Observable<AuthResponse> {
    return this.http.post(`${environment.databaseURL}/api/v1/auth/login`,
      loginData)
      .pipe(
        tap((response: AuthResponse) => {
          this._loginHandler(response);
        })
      );
  }

  // user creation across all application (via BehaviourSubject + localStorage)
  private _loginHandler(response: AuthResponse) {
    const user = new User(
      response.username,
      response.token,
    );
    this._user$.next(user);
    localStorage.setItem(environment.localStorageUser, JSON.stringify(user));
  }

  logout() {
    this._user$.next(null);
    localStorage.removeItem(environment.localStorageUser);
  }

  // check if we have user in localStorage and in case we have - user creation from localStorage
  autoLogin() {
    let user: {
      username: string,
      _token: string,
    };

    const userFromLocalStorage = localStorage.getItem(environment.localStorageUser);
    if (userFromLocalStorage) {
      user = JSON.parse(userFromLocalStorage);
      const loadedUser = new User(
        user.username,
        user._token,
      );
      this._user$.next(loadedUser);
    } else {
      return false;
    }
  }

}
