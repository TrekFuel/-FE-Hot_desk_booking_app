import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeData } from '../../shared/models/choose-office.model';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { roomsManagementEditStartGetMapAction } from '../../store/actions/roomsManagementEdit.action';

@Component({
  selector: 'app-booking-page-container',
  template: ` <app-booking-page></app-booking-page>`,
})
export class BookingPageContainerComponent {
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
      });
  }
}
