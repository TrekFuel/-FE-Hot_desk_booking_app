import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { createFloorId } from '../../store/selectors/officeChosing.selectors';
import { filter } from 'rxjs/operators';
import { roomsManagementEditStartAction } from '../../store/actions/roomsManagementEdit.action';
import { PlaceData } from '../../shared/models/map-data.model';
import { RoomsManagementEditComponent } from './rooms-management-edit.component';

@Component({
  selector: 'app-rooms-management-edit-container',
  template: `
    <app-rooms-management-edit
      (handlePlaces)="onHandlePlaces($event)"
      (deletePlaces)="onDeletePlaces($event)"
    ></app-rooms-management-edit>
  `,
})
export class RoomsManagementEditContainer {
  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  onHandlePlaces(placeDataArr: PlaceData[]): void {
    console.log(placeDataArr);
    // Input DATA [ {tempId: "1596568001226-651", placeType: 0, number: 1, maxQuantity: 1 } ]
    //
    // OUTPUT DATA [ {tempId: "1596568001226-651", placeType: 0, number: 1, maxQuantity: 1, id: 'uuid from server here' } ]

    // simulate server work
    let rnd = Math.ceil(Math.random() * 99 + 1);
    const newPlaceDataArr = [...placeDataArr].map((item: PlaceData) => {
      const newItem: PlaceData = { ...item, id: `uuid ${rnd}` };
      return newItem;
    });

    // changedMap can be save to server
    let changedMap = RoomsManagementEditComponent.putDataReturnMap(
      newPlaceDataArr
    );
    // console.log(changedMap);
  }

  onDeletePlaces(idToDeleteFromServer: string[]): void {
    console.log(`Need to delete this id from server: ${idToDeleteFromServer}`);
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
