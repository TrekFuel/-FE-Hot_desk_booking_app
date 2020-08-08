import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { PlaceData } from '../../shared/models/map-data.model';
import { RoomsManagementEditComponent } from './rooms-management-edit.component';
import { RoomsManagementEditStoreInterface } from './models/rooms-management-edit-store.interface';
import { roomsManagementEditData } from '../../store/selectors/roomsManagementEdit.selector';
import { roomsManagementEditPlaceAction } from '../../store/actions/roomsManagementEdit.action';

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
  public addressId: string;
  public dataStore: RoomsManagementEditStoreInterface;

  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  onHandlePlaces(placeDataArr: PlaceData[]): void {
    // Input DATA [ {tempId: "1596568001226-651", placeType: 0, number: 1, maxQuantity: 1 } ]
    //
    // OUTPUT DATA [ {tempId: "1596568001226-651", placeType: 0, number: 1, maxQuantity: 1, id: 'uuid from server here' } ]

    /*// simulate server work
    let rnd = Math.ceil(Math.random() * 99 + 1);
    const newPlaceDataArr = [...placeDataArr].map((item: PlaceData) => {
      const newItem: PlaceData = { ...item, id: `uuid ${rnd}` };
      return newItem;
    });*/

    // changedMap can be save to server
    let changedMap = RoomsManagementEditComponent.putDataReturnMap(
      placeDataArr
    );

    console.log(placeDataArr);

    this.store$.dispatch(
      new roomsManagementEditPlaceAction({
        getDataPlace: placeDataArr,
      })
    );
  }

  onDeletePlaces(idToDeleteFromServer: string[]): void {
    console.log(`Need to delete this id from server: ${idToDeleteFromServer}`);
  }

  initStore(): void {
    this.store$
      .select(roomsManagementEditData)
      .subscribe((data: RoomsManagementEditStoreInterface) => {
        this.dataStore = data;
      });
  }
}
