import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { createFloorId } from '../../store/selectors/officeChosing.selectors';
import { filter } from 'rxjs/operators';
import { roomsManagementEditStartAction } from '../../store/actions/roomsManagementEdit.action';

@Component({
  selector: 'app-rooms-management-edit-container',
  template: ` <app-rooms-management-edit></app-rooms-management-edit> `,
})
export class RoomsManagementEditContainer {
  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  initStore(): void {
    this.store$
      .select(createFloorId)
      .pipe(filter((data) => data !== null))
      .subscribe((id: string) =>
        this.store$.dispatch(
          new roomsManagementEditStartAction({ addressId: id })
        )
      );
  }
}
