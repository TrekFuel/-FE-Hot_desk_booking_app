import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthResponse } from '../../auth/login/models/auth-response.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserProfileComponent {

  @Input() user: AuthResponse;

  constructor() {
  }

}
