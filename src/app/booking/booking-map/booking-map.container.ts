import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { getMapBooking } from '../../store/selectors/roomsManagementEdit.selector';
import { DataForBooking } from './booking-state.models';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';
import { userData } from '../../store/selectors/auth.selectors';
import { allBookings } from '../../store/selectors/booking.selctors';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-booking-map-container',
  template: `
    <app-booking-map
        [userData]="$userData | async"
        [mapData]="$getMapBooking | async"
        [bookingState$]="allBookings$"
        (bookedPlaceForId)="onBookPlace($event)"
    ></app-booking-map>
  `,
})
export class BookingMapContainer {
  public $userData: Observable<UserDataInterface>;
  public $getMapBooking: Observable<string>;
  @Input() choseDate: string = moment().format().split('+')[0];
  public allBookings$: Observable<[]>;

  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  onBookPlace(data: DataForBooking) {
    let [startDate, endDate] = [this.choseDate, this.choseDate];
    let dataForBooking: DataForBooking = { ...data, startDate, endDate };
    console.log(dataForBooking);
  }

  initStore(): void {
    this.$getMapBooking = this.store$.select(getMapBooking);
    this.$userData = this.store$.select(userData);
    this.allBookings$ = this.store$.select(allBookings);
  }
}
