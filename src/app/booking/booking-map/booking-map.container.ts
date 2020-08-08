import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Component({
  selector: 'app-booking-map-container',
  template: `
    <app-booking-map></app-booking-map>
  `
})
export class BookingMapContainer {
  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  initStore(): void {
    // this.store$
  }
}
