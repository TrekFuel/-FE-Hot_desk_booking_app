import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserInterface } from '../shared/models/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  @Input() public users: UserInterface[];
  @Input() public usersLength: number;
  public checkRadioBtn: number;
  public numberPage: number;
  public valueRadioBtn: number[];
  public disabledNext: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.initializeRadioBtn();
    this.queryParams();
  }

  initializeRadioBtn(): void {
    this.valueRadioBtn = [1, 2, 3];
    this.checkRadioBtn = this.valueRadioBtn[0];
    this.numberPage = 1;
  }

  queryParams(): void {
    this.router.navigate([environment.usersComponentRoute], {
      queryParams: {
        size: this.checkRadioBtn,
        page: this.numberPage - 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  onClickRadioBtn(size: number): void {
    this.numberPage = 1;
    this.checkRadioBtn = size;
    this.queryParams();
  }

  previousPage(): void {
    this.numberPage--;
    this.queryParams();
  }

  nextPage(): void {
    this.numberPage++;
    this.queryParams();
  }
}
