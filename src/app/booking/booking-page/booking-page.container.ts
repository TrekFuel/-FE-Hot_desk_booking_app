import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeData } from '../../shared/models/choose-office.model';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { roomsManagementEditStartGetMapAction } from '../../store/actions/roomsManagementEdit.actions';
import { Observable } from 'rxjs';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';
import { getAllBookingsAction } from '../../store/actions/booking.actions';
import { GapDateInterface } from '../modules/booking-store.interface';

@Component({
  selector: 'app-booking-page-container',
  template: ` <app-booking-page
    [$blockSelection]="blockSelection$ | async"
  ></app-booking-page>`,
})
export class BookingPageContainerComponent {
  blockSelection$: Observable<boolean>;

  //for Sergei
  gapDate: GapDateInterface = {
    startDate: '2020-08-15',
    endDate: '2020-08-15',
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
        this.store$.dispatch(
          new getAllBookingsAction({ gapDate: this.gapDate })
        );
      });
    this.initStore();
  }

  initStore(): void {
    this.blockSelection$ = this.store$.select(getBlockSelection);
  }
}
