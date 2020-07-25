import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {userTokenSelector} from '../../store/selectors/login.selectors';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private store$: Store<AppState>) {
  }

  intercept(
    request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store$
      .pipe(
        select(userTokenSelector),
        take(1),
        exhaustMap((userToken: string) => {
          let requestClone = null;
          if (userToken) {
            requestClone = request.clone({
              headers: request.headers.set('-authorize-', `Bearer_${userToken}`)
            });
          }
          return next.handle(requestClone || request);
        })
      );
  }
}
