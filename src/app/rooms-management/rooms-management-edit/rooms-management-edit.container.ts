import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Component({
  selector: 'app-rooms-management-edit-container',
  template: `
    <app-rooms-management-edit></app-rooms-management-edit>
  `
})
export class RoomsManagementEditContainer {

  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  initStore(): void {
    // this.store$.dispatch();
  }

}
