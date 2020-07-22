import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/modules/user.interface';
import { usersSelector } from '../store/selectors/usersList.selectors';
import { usersListStartAction } from '../store/actions/usersList.actions';

@Component({
  selector: 'app-users-container',
  template: ` <app-users [users]="$users | async"></app-users>`,
})
export class AppUsersContainer implements OnInit {
  public $users: Observable<UserInterface[]>;

  constructor(private store$: Store<AppState>) {
    this.$users = this.store$.pipe(select(usersSelector));
  }

  ngOnInit() {
    this.store$.dispatch(new usersListStartAction());
  }
}
