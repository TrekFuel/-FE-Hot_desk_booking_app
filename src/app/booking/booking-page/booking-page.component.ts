import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { roomsManagementEditUnblockSelectorsAction } from '../../store/actions/roomsManagementEdit.actions';
import { ActivatedRoute, Router } from '@angular/router';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPageComponent {
  date = new FormControl(new Date());
  // date = new FormControl(moment());
  @Input() $blockSelection: boolean;
  showMap: boolean = true;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onClickAnotherAddress() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {},
    });
    this.store$.dispatch(
      new roomsManagementEditUnblockSelectorsAction({ blockSelection: false })
    );
  }
}
