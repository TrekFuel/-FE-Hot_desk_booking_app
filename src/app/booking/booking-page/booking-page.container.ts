import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeData } from '../../shared/models/choose-office.model';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { roomsManagementEditStartGetMapAction } from '../../store/actions/roomsManagementEdit.actions';
import { Observable } from 'rxjs';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';
import { gapDateBookingsAction } from '../../store/actions/booking.actions';
import { GapDateInterface } from '../modules/booking-store.interface';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-booking-page-container',
  template: `
    <app-booking-page
        [$blockSelection]="blockSelection$ | async"
        (choseDateEmitter)="onChangeDate($event)"
    ></app-booking-page>`
})
export class BookingPageContainerComponent {
  blockSelection$: Observable<boolean>;
  choseDate: string = moment().format().split('+')[0];
  startDate: string = moment().format().split('T')[0];
  endDate: string = moment().format().split('T')[0];

  //don`t need that here
  // public allBookings$: Observable<[]>;
  gapDate: GapDateInterface = {
    startDate: this.startDate + 'T00:00:01',
    endDate: this.endDate + 'T23:23:59'
  };

  constructor(public router: ActivatedRoute, public store$: Store<AppState>) {
    this.router.queryParams
      .pipe(
        filter((data: OfficeData) => data.addressId !== undefined),
        map(({ addressId }) => addressId)
      )
      .subscribe((addressId: string) => {
        this.store$.dispatch(
          new roomsManagementEditStartGetMapAction({ addressId })
        );
        this.loopRequest();
      });
    this.initStore();
  }

  onChangeDate(date: string) {
    let changedDate = date.split('T');
    let [startDate, endDate] = [changedDate + 'T00:00:01', changedDate + 'T23:23:59'];
    this.gapDate = { startDate, endDate };
  }

  loopRequest() {
    this.store$.dispatch(new gapDateBookingsAction({ gapDate: this.gapDate }));
  }

  initStore(): void {
    this.blockSelection$ = this.store$.select(getBlockSelection);
    // this.allBookings$ = this.store$.select(allBookings);
  }
}
