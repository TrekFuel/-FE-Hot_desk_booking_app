import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { PlaceData } from '../../shared/models/map-data.model';
import { RoomsManagementEditComponent } from './rooms-management-edit.component';

@Component({
  selector: 'app-rooms-management-edit-container',
  template: `
    <app-rooms-management-edit
        (handlePlaces)="onHandlePlaces($event)"
    ></app-rooms-management-edit>
  `
})
export class RoomsManagementEditContainer {

  constructor(private store$: Store<AppState>) {
    this.initStore();
  }

  onHandlePlaces(placeDataArr: PlaceData[]) {
    // Input DATA [ {id: "1596568001226-651", placeType: 0, number: 1, maxQuantity: 1} ]
    // OUTPUT DATA [ {oldId: "1596568001226-651", placeType: 0, number: 1, maxQuantity: 1, id: 'uuid from server here'} ]
    const newPlaceDataArr = [...placeDataArr].map((item: PlaceData) => {
      let [oldId, number, maxQuantity, placeType] = [item.id, item.number, item.maxQuantity, item.placeType];
      const newItem: PlaceData = { id: 'uuid from server here', oldId, number, maxQuantity, placeType };
      return newItem;
    });

    let changedMap = RoomsManagementEditComponent.putDataReturnMap(newPlaceDataArr);
    console.log(changedMap);
  }

  initStore(): void {
    // this.store$.dispatch();
  }

}
