import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { BehaviorSubject, Observable } from 'rxjs';
import { getMapBooking } from '../../store/selectors/roomsManagementEdit.selector';
import { BookingStateOnUI, DataForBooking } from './booking-state.models';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';
import { userData } from '../../store/selectors/auth.selectors';
import { allBookings } from '../../store/selectors/booking.selctors';


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
  public $bookings: BehaviorSubject<BookingStateOnUI[]> = new BehaviorSubject<
    BookingStateOnUI[]
  >(null);
  public allBookings$: Observable<[]>;

  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  onBookPlace(data: DataForBooking) {
    console.log(data);
  }

  initStore(): void {
    this.$getMapBooking = this.store$.select(getMapBooking);
    this.$userData = this.store$.select(userData);
    this.allBookings$ = this.store$.select(allBookings);
  }
}
