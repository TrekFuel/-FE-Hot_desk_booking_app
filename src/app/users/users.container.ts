import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/models/user.interface';
import {
  usersNumberPageSelector,
  usersSelector,
  usersTotalPagesSelector,
} from '../store/selectors/usersList.selectors';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { usersListStartAction } from '../store/actions/usersList.actions';
import { UsersRequestPathInterface } from './models/requestPath.interface';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-users-container',
  template: ` <app-users
    [users]="$users | async"
    [pageNumberVisible]="$pageNumber | async"
    [pagesTotal]="$pagesTotal | async"
  ></app-users>`,
})
export class AppUsersContainer {
  public $users: Observable<UserInterface[]>;
  public $pageNumber: Observable<number>;
  public $pagesTotal: Observable<number>;

  constructor(private store$: Store<AppState>, public router: Router) {
    this.$users = this.store$.pipe(select(usersSelector));
    this.$pageNumber = this.store$.pipe(select(usersNumberPageSelector));
    this.$pagesTotal = this.store$.pipe(select(usersTotalPagesSelector));

    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map((data: NavigationEnd) => {
          return { path: data.url };
        })
      )
      .subscribe((data: UsersRequestPathInterface) => {
        let [path] = data.path.split('?');
        if (path === environment.usersComponentRoute) {
          this.store$.dispatch(new usersListStartAction({ queryParams: data }));
        }
      });
  }
}
