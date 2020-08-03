import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../auth/login/models/auth-response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { userSelector } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-user-profile-container',
  template: `<app-user-profile [user]="user$ | async"></app-user-profile>`,
})

export class UserProfileContainerComponent {

  user$: Observable<AuthResponse>;

  constructor(private store$: Store<AppState>) {
    this.user$ = this.store$.select(userSelector);
  }

}
