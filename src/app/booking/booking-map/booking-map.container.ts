import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { getMapBooking } from '../../store/selectors/roomsManagementEdit.selector';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';
import { userData } from '../../store/selectors/auth.selectors';
import { allBookings } from '../../store/selectors/booking.selctors';
import * as _moment from 'moment';
import { createBookingAction } from '../../store/actions/booking.actions';
import { CreateBookingInterface } from '../modules/booking-store.interface';

const moment = _moment;

@Component({
  selector: 'app-booking-map-container',
  template: `
    <app-booking-map
        [userData]="$userData | async"
        [mapData]="$getMapBooking | async"
        [bookingState$]="allBookings$"
        (bookedPlaceForId)="onBookPlace($event)"
        (deleteBookingForPlace)="onDeleteBookedPlace($event)"
        (deleteMap)="onDeleteMap()"
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

  onBookPlace(data: CreateBookingInterface) {
    let [startDate, endDate] = [this.choseDate, this.choseDate];
    let dataForBooking: CreateBookingInterface = {
      ...data,
      startDate,
      endDate,
    };
    this.store$.dispatch(
      new createBookingAction({
        dataCreateBooking: dataForBooking,
      })
    );
  }

  onDeleteBookedPlace(placeId: string) {
    console.log(placeId);
  }

  onDeleteMap() {
    console.log('need to delete map!!');
  }

  initStore(): void {
    this.$getMapBooking = this.store$.select(getMapBooking);
    this.$userData = this.store$.select(userData);
    this.allBookings$ = this.store$.select(allBookings);
  }
}
