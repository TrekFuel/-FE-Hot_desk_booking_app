import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { getMapBooking } from '../../store/selectors/roomsManagementEdit.selector';

@Component({
  selector: 'app-booking-map-container',
  template: `
    <app-booking-map [mapData]="$getMapBooking | async"
                     (bookPlaceForId)="onBookPlace($event)"
    ></app-booking-map>
  `
})
export class BookingMapContainer {

  public $getMapBooking: Observable<string>;

  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  onBookPlace(id: string) {
    console.log(id);
  }

  initStore(): void {
    this.$getMapBooking = this.store$.select(getMapBooking);
  }
}
