import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RoomsManagementEditServices } from '../../rooms-management/rooms-management-edit/rooms-management-edit.services';
import * as roomsManagementEditTypeActions from '../actions/roomsManagementEdit.action';
import {
  roomsManagementEditActionType,
  roomsManagementEditFloorAction,
  roomsManagementEditOfficeAction,
  roomsManagementEditPlaceAction,
  roomsManagementEditRoomAction,
} from '../actions/roomsManagementEdit.action';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { roomsManagementEditData } from '../selectors/roomsManagementEdit.selector';
import {
  GetFloorDataInterface,
  GetPlaceDataInterface,
  GetRoomDataInterface,
  PostPlaceDataInterface,
} from '../../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';

@Injectable()
export class RoomsManagementEditEffects {
  @Effect()
  roomManagementOffice$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_START),
    switchMap(
      (data: roomsManagementEditTypeActions.roomsManagementEditStartAction) => {
        return this.roomsManagementEditServices
          .postOffice({
            addressId: data.payload.addressId,
            number: data.payload.dataRoomsContainer.number,
          })
          .pipe(
            map((dataOffice) => {
              return new roomsManagementEditOfficeAction({
                dataCreateOffice: dataOffice,
              });
            })
          );
      }
    )
  );

  @Effect()
  roomManagementFloor$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_OFFICE),
    withLatestFrom(this.store$.select(roomsManagementEditData)),
    map(([action, roomsManagementEditData]) => [
      action,
      roomsManagementEditData,
    ]),
    switchMap(([, storeState]) => {
      return this.roomsManagementEditServices
        .postFloor({
          map: storeState.dataRoomsContainer.map,
          officeId: storeState.officeId,
          number: storeState.dataRoomsContainer.number,
        })
        .pipe(
          map((data: GetFloorDataInterface) => {
            return new roomsManagementEditFloorAction({
              getDataFloor: data,
            });
          })
        );
    })
  );

  @Effect()
  roomManagementRoom$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_FLOOR),
    withLatestFrom(this.store$.select(roomsManagementEditData)),
    map(([action, roomsManagementEditData]) => [
      action,
      roomsManagementEditData,
    ]),
    switchMap(([, storeState]) => {
      return this.roomsManagementEditServices
        .postRoom({
          floorId: storeState.floorId,
          number: storeState.dataRoomsContainer.number,
        })
        .pipe(
          map((data: GetRoomDataInterface) => {
            return new roomsManagementEditRoomAction({
              getDataRoom: data,
            });
          })
        );
    })
  );

  @Effect()
  roomManagementPlace$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_ROOM),
    withLatestFrom(this.store$.select(roomsManagementEditData)),
    map(([action, roomsManagementEditData]) => {
      let addRoomId = [];
      roomsManagementEditData.dataRoomsContainer.places.forEach((el) => {
        addRoomId = [
          ...addRoomId,
          { ...el, roomId: roomsManagementEditData.roomId },
        ];
      });
      return addRoomId;
    }),
    switchMap((arr: PostPlaceDataInterface[]) => {
      return this.roomsManagementEditServices.postPlaces(arr).pipe(
        map((data: GetPlaceDataInterface[]) => {
          return new roomsManagementEditPlaceAction({
            getDataPlace: data,
          });
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private roomsManagementEditServices: RoomsManagementEditServices,
    private store$: Store<AppState>
  ) {}
}
