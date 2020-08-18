import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { roomsManagementEditUnblockSelectorsAction } from '../../store/actions/roomsManagementEdit.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';

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
  // date = new FormControl(new Date());
  date: FormControl = new FormControl(moment());
  @Output() choseDateEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Input() $blockSelection: boolean;
  @Output() choseDate: string = moment().format().split('+')[0];
  showMap: boolean = true;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onDateChange(event: MatDatepickerInputEvent<string>) {
    // // let date: Moment = event.target.value;
    // let date: any = event.target.value;
    // this.choseDate = date.format().split('+')[0];
    // this.choseDateEmitter.next(this.choseDate);
  }

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
