import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { userRolesSelector } from '../../store/selectors/auth.selectors';
import { map, take } from 'rxjs/operators';
import { UserRoles } from '../../shared/enums/user-roles.enum';
import { Observable } from 'rxjs';
import { sidebarButtons } from './sidebar-buttons';

export interface BtnSidebarInterface {
  value: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})

export class SidebarServices {

  constructor(private store$: Store<AppState>) {
  }

  // tslint:disable-next-line:variable-name
  private _isVisible = false;

  get isVisible(): boolean {
    return this._isVisible;
  }

  filterButtons(): Observable<BtnSidebarInterface[]> {
    let btnList: BtnSidebarInterface[] = [sidebarButtons.default];

    return this.store$.select(userRolesSelector)
      .pipe(
        take(1),
        map((userRoles: string[]) => {
          if (userRoles.includes(UserRoles.HR)) {
            btnList = [...btnList,
              ...[sidebarButtons.hr]];
          } else if (userRoles.includes(UserRoles.ADMIN) ||
            userRoles.includes(UserRoles.OFFICE_MANAGER)) {
            btnList = [...btnList,
              ...[sidebarButtons.admin_office_manager]];
          }
          return btnList;
        }),
      );
  }

  onClick(): void {
    this._isVisible = !this._isVisible;
  }

}
