import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeData } from '../../shared/models/choose-office.model';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { roomsManagementEditStartGetMapAction } from '../../store/actions/roomsManagementEdit.actions';
import { interval, Observable } from 'rxjs';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';
import { gapDateBookingsAction } from '../../store/actions/booking.actions';
import { GapDateInterface } from '../modules/booking-store.interface';
import { allBookings } from '../../store/selectors/booking.selctors';

@Component({
  selector: 'app-booking-page-container',
  template: ` <app-booking-page
    [$blockSelection]="blockSelection$ | async"
  ></app-booking-page>`,
})
export class BookingPageContainerComponent {
  blockSelection$: Observable<boolean>;

  //for Sergei
  public allBookings$: Observable<[]>;
  gapDate: GapDateInterface = {
    startDate: '2020-08-18T23:33:03',
    endDate: '2020-08-18T23:33:03',
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

  currentDate() {}

  loopRequest() {
    this.store$.dispatch(new gapDateBookingsAction({ gapDate: this.gapDate }));
  }

  initStore(): void {
    this.blockSelection$ = this.store$.select(getBlockSelection);
    this.allBookings$ = this.store$.select(allBookings);
  }
}
