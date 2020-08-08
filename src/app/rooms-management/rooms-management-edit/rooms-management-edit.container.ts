import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { PlaceData } from '../../shared/models/map-data.model';
import { RoomsManagementEditStoreInterface } from './models/rooms-management-edit-store.interface';
import { roomsManagementEditData } from '../../store/selectors/roomsManagementEdit.selector';
import { roomsManagementEditPlaceAction } from '../../store/actions/roomsManagementEdit.action';
import { ActivatedRoute } from '@angular/router';
import { OfficeData } from '../../shared/models/choose-office.model';

@Component({
  selector: 'app-rooms-management-edit-container',
  template: `
    <app-rooms-management-edit
        (handlePlaces)="onHandlePlaces($event)"
        (deletePlaces)="onDeletePlaces($event)"
        (deleteMap)="onDeleteMap()"
    ></app-rooms-management-edit>
  `,
})
export class RoomsManagementEditContainer implements OnInit {
  public addressId: string;
  public dataStore: RoomsManagementEditStoreInterface;

  constructor(private store$: Store<AppState>, private activatedRoute: ActivatedRoute) {
    this.initStore();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe((data: OfficeData) => {
        console.log(data);
      });
  }

  onHandlePlaces(placeDataArr: PlaceData[]): void {
    this.store$.dispatch(
      new roomsManagementEditPlaceAction({
        getDataPlace: placeDataArr,
      })
    );
  }

  onDeletePlaces(idToDeleteFromServer: string[]): void {
    console.log(`Need to delete this id from server: ${idToDeleteFromServer}`);
  }

  onDeleteMap() {
    console.log('deleteMap chose');
  }

  initStore(): void {
    this.store$
      .select(roomsManagementEditData)
      .subscribe((data: RoomsManagementEditStoreInterface) => {
        this.dataStore = data;
      });
  }

}
