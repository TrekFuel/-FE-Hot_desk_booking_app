import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { BehaviorSubject, Observable } from 'rxjs';
import { getMapBooking } from '../../store/selectors/roomsManagementEdit.selector';
import { BookingStateOnUI } from './booking-state.models';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';
import { userData } from '../../store/selectors/auth.selectors';
import { createBookingAction } from '../../store/actions/booking.actions';

const STEP_1: BookingStateOnUI[] = [
  { placeId: '19abee6b-b8ea-4a47-b194-f6e3319ad8b1', isFree: true },
  { placeId: '0e893e3f-bb42-4d17-a039-c95a02d27a3b', isFree: true },
  { placeId: '2ac21350-89ca-40e7-9293-625edb4060a5', isFree: true },
  { placeId: 'e6c15f89-bcde-4d26-ae22-35085dd081f2', isFree: true },
];

@Component({
  selector: 'app-booking-map-container',
  template: `
    <app-booking-map
      [userData]="$userData | async"
      [mapData]="$getMapBooking | async"
      [bookingState$]="$bookings"
      (bookedPlaceForId)="onBookPlace($event)"
    ></app-booking-map>
  `,
})
export class BookingMapContainer {
  public $userData: Observable<UserDataInterface>;
  public $getMapBooking: Observable<string>;
  public $bookings: BehaviorSubject<BookingStateOnUI[]> = new BehaviorSubject<
    BookingStateOnUI[]
  >(STEP_1);

  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  onBookPlace(id: string) {
    this.store$.dispatch(
      new createBookingAction({
        dataCreateBooking: {
          userId: 'ca672d41-f1e1-40ef-bc42-4e7979d757dc',
          placeId: 'e6c15f89-bcde-4d26-ae22-35085dd081f2',
        },
      })
    );
  }

  initStore(): void {
    this.$getMapBooking = this.store$.select(getMapBooking);
    this.$userData = this.store$.select(userData);
  }
}
