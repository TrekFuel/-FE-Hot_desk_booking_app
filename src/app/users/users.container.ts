import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/models/user.interface';
import { usersSelector } from '../store/selectors/usersList.selectors';
import { usersListStartAction } from '../store/actions/usersList.actions';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-users-container',
  template: ` <app-users [users]="$users | async"></app-users>`,
})
export class AppUsersContainer implements OnInit {
  public $users: Observable<UserInterface[]>;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {
    this.$users = this.store$.pipe(select(usersSelector));
  }

  ngOnInit() {
    this.initializeRoutePath();
  }

  initializeRoutePath(): void {
    this.route.params.subscribe(console.log)
  }
}
