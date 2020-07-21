import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../store';
import { UserInterface } from '../shared/modules/user.interface';
import { ActivatedRoute } from '@angular/router';
import { UsersRequestPathInterface } from './modules/requestPath.interface';
import {
  usersListAction,
  usersListDeleteAction,
} from '../store/actions/usersList.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public $users: Observable<UserInterface[]>;
  private _path: UsersRequestPathInterface;
  private _subscribeRoute: Subscription;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeRoutePath();
    this.initializeStore();
  }

  initializeStore(): void {
    this.store$.dispatch(new usersListAction());
    this.$users = this.store$.select('usersList');
  }

  initializeRoutePath(): void {
    this._subscribeRoute = this.route.queryParams.subscribe(
      (path: UsersRequestPathInterface) => {
        this._path = path;
      }
    );
  }

  ngOnDestroy(): void {
    this._subscribeRoute.unsubscribe();
    this.store$.dispatch(new usersListDeleteAction());
  }
}
