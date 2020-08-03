import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { userTokenSelector } from '../../store/selectors/auth.selectors';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {
  constructor(private store$: Store<AppState>, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store$.select(userTokenSelector)
      .pipe(
        take(1),
        map((userToken: string) => {
          if (userToken) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
  }

}
