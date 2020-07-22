import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from '../shared/modules/user.interface';
import { ActivatedRoute } from '@angular/router';
import { UsersRequestPathInterface } from './modules/requestPath.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  @Input() public users: UserInterface[];
  private _path: UsersRequestPathInterface;
  private _subscribeRoute: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeRoutePath();
  }

  initializeRoutePath(): void {
    this._subscribeRoute = this.route.queryParams.subscribe(
      (path: UsersRequestPathInterface) => {
        this._path = path;
      }
    );
  }
}
