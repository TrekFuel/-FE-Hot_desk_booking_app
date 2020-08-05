import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { userRolesSelector } from '../../store/selectors/auth.selectors';
import { map, take } from 'rxjs/operators';
import { UserRoles } from '../../shared/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})

export class UsersGuard implements CanActivate {

  constructor(private store$: Store<AppState>, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store$.select(userRolesSelector)
      .pipe(
        take(1),
        map((userRoles: string[]) => {
          if (userRoles.includes(UserRoles.HR)) {
            return true;
          } else {
            this.router.navigate(['booking']);
            return false;
          }
        }),
      );
  }

}
