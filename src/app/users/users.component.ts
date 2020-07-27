import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserInterface } from '../shared/models/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  @Input() public users: UserInterface[];
  @Output() public $route = '12';
  public checkRadioBtn: number;
  public valueRadioBtn: number[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.queryParams();
  }

  ngOnInit(): void {
    this.initializeRadioBtn();
  }

  initializeRadioBtn(): void {
    this.valueRadioBtn = [1, 2, 3];
    this.checkRadioBtn = this.valueRadioBtn[0];
  }

  onClickRadioBtn(size: number): void {}

  queryParams() {
    this.router.navigate(['/users'], {
      queryParams: {
        size: 1,
        siz: 1,
      },
    });
  }
}
