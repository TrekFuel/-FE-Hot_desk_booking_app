import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { BehaviorSubject, Observable } from 'rxjs';
import { getMapBooking } from '../../store/selectors/roomsManagementEdit.selector';
import { BookingStateOnUI, DataForBooking } from './booking-state.models';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';
import { userData } from '../../store/selectors/auth.selectors';
import { allBookings } from '../../store/selectors/booking.selctors';

// const STEP_1: BookingStateOnUI[] = [
//   { placeId: '26936017-f208-4848-b9b8-33baf5bd5674', isFree: true },
//   { placeId: '72ee6ffc-4b2a-40d5-80af-d83b7ddaf3b0', isFree: true },
//   { placeId: '83308f49-5493-4d1b-9133-ce064288f67c', isFree: true },
//   { placeId: 'dc613dd3-d0a5-4369-a842-af971223a812', isFree: true },
//   { placeId: 'b826c938-de59-4a6a-83fe-eee0dfc611b9', isFree: true },
//   { placeId: 'a511df39-01b6-4386-bd64-63dd1abbe305', isFree: true },
//   { placeId: '1749d691-d8a8-4c3c-827c-fb7090c25151', isFree: true },
//   { placeId: '194ca0b8-6ff6-4fe0-b2f9-b5a06e43c294', isFree: true },
//   { placeId: 'd22d0704-203b-4c33-969a-f293e407b2c1', isFree: true }
// ];

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
