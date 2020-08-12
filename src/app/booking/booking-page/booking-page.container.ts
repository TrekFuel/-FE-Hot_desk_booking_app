import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeData } from '../../shared/models/choose-office.model';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { roomsManagementEditStartGetMapAction } from '../../store/actions/roomsManagementEdit.action';
import { Observable } from 'rxjs';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';

@Component({
  selector: 'app-booking-page-container',
  template: `
    <app-booking-page [$blockSelection]="blockSelection$ | async"></app-booking-page>`
})
export class BookingPageContainerComponent {
  blockSelection$: Observable<boolean>;

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
    this.initStore();
  }

  initStore(): void {
    this.blockSelection$ = this.store$.select(getBlockSelection);
  }

}
