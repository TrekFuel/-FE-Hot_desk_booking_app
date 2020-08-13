import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { BehaviorSubject, Observable } from 'rxjs';
import { getMapBooking } from '../../store/selectors/roomsManagementEdit.selector';
import { BookingStateOnUI } from './booking-state.models';

const STEP_1: BookingStateOnUI[] = [
  { placeId: 'd7ddf7d1-c178-49aa-b65e-acd9e09ca88c', isFree: true },
  { placeId: '46d7f02b-5d74-4650-b0f3-19daae524f55', isFree: true },
  { placeId: 'cba7ae5b-c51e-4d4a-915e-1fe1a12e77ad', isFree: true }
];
const STEP_2: BookingStateOnUI[] = [
  { placeId: 'd7ddf7d1-c178-49aa-b65e-acd9e09ca88c', isFree: false, nameOfUser: 'SI' },
  { placeId: '46d7f02b-5d74-4650-b0f3-19daae524f55', isFree: true },
  { placeId: 'cba7ae5b-c51e-4d4a-915e-1fe1a12e77ad', isFree: true }
];
const STEP_3: BookingStateOnUI[] = [
  { placeId: 'd7ddf7d1-c178-49aa-b65e-acd9e09ca88c', isFree: false, nameOfUser: 'SI' },
  { placeId: '46d7f02b-5d74-4650-b0f3-19daae524f55', isFree: false, nameOfUser: 'KP' },
  { placeId: 'cba7ae5b-c51e-4d4a-915e-1fe1a12e77ad', isFree: true }
];
const STEP_4: BookingStateOnUI[] = [
  { placeId: 'd7ddf7d1-c178-49aa-b65e-acd9e09ca88c', isFree: false, nameOfUser: 'SI' },
  { placeId: '46d7f02b-5d74-4650-b0f3-19daae524f55', isFree: false, nameOfUser: 'KP' },
  { placeId: 'cba7ae5b-c51e-4d4a-915e-1fe1a12e77ad', isFree: false, nameOfUser: 'RR' }
];

@Component({
  selector: 'app-booking-map-container',
  template: `
    <app-booking-map [mapData]="$getMapBooking | async"
                     [bookingState$]="$bookings"
                     (bookedPlaceForId)="onBookPlace($event)"
    ></app-booking-map>
  `
})
export class BookingMapContainer {

  public $getMapBooking: Observable<string>;
  public $bookings: BehaviorSubject<BookingStateOnUI[]> = new BehaviorSubject<BookingStateOnUI[]>(STEP_4);

  // public $bookings: Observable<BookingStateOnUI[]>;

  constructor(private store$: Store<AppState>) {
    this.initStore();
    setTimeout(() => {
      this.$bookings.next(STEP_3);
    }, 10000);
    setTimeout(() => {
      this.$bookings.next(STEP_2);
    }, 20000);
    setTimeout(() => {
      this.$bookings.next(STEP_1);
    }, 30000);

  }

  onBookPlace(id: string) {
    console.log(id);
  }


  initStore(): void {
    this.$getMapBooking = this.store$.select(getMapBooking);
  }
}
