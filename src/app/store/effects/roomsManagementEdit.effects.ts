import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RoomsManagementEditServices } from '../../rooms-management/rooms-management-edit/rooms-management-edit.services';
import * as officeChoosingTypeActions from '../actions/officeChoosing.action';
import { officeChoosingActionType } from '../actions/officeChoosing.action';
import * as roomsManagementEditTypeActions from '../actions/roomsManagementEdit.action';
import {
  roomsManagementEditActionType,
  roomsManagementEditCreateMapAction,
  roomsManagementEditFloorAction,
  roomsManagementEditOfficeAction,
  roomsManagementEditRoomAction,
  roomsManagementEditSaveMapAction,
  roomsManagementEditStartAction,
} from '../actions/roomsManagementEdit.action';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { DEFAULT_DATA_SAVE_MAP } from '../../rooms-management/rooms-management-edit/models/defauld-data-save-map';
import { roomsManagementEditData } from '../selectors/roomsManagementEdit.selector';
import {
  GetFloorDataInterface,
  GetRoomDataInterface,
  RoomsManagementEditStoreInterface,
} from '../../rooms-management/rooms-management-edit/models/rooms-management-edit-store.interface';
import { PlaceData, PlaceRole } from '../../shared/models/map-data.model';
import { RoomsManagementEditComponent } from '../../rooms-management/rooms-management-edit/rooms-management-edit.component';

@Injectable()
export class RoomsManagementEditEffects {
  @Effect()
  roomManagementGeStartData$ = this.actions$.pipe(
    ofType(officeChoosingActionType.SELECTORS_CREATE_ADDRESS),
    map(
      (
        data: officeChoosingTypeActions.officeChoosingStartCreateAddressAction
      ) => {
        return new roomsManagementEditStartAction({
          defaultData: DEFAULT_DATA_SAVE_MAP,
          addressId: data.payload.selectorData.id,
        });
      }
    )
  );

  @Effect()
  roomManagementOffice$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_START),
    switchMap(
      (data: roomsManagementEditTypeActions.roomsManagementEditStartAction) => {
        return this.roomsManagementEditServices
          .postOffice({
            addressId: data.payload.addressId,
            number: data.payload.defaultData.number,
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
          map: storeState.defaultData.defaultMap,
          officeId: storeState.officeId,
          number: storeState.defaultData.number,
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
          number: storeState.defaultData.number,
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
    ofType(roomsManagementEditActionType.R_M_E_PLACE),
    withLatestFrom(this.store$.select(roomsManagementEditData)),
    map(([action, roomsManagementEditData]): [
      roomsManagementEditTypeActions.roomsManagementEditPlaceAction,
      RoomsManagementEditStoreInterface
    ] => [action, roomsManagementEditData]),
    switchMap(([{ payload }, storeState]) => {
      let places: PlaceData[] = [];
      payload.getDataPlace.forEach((el) => {
        places = [
          ...places,
          {
            ...el,
            roomId: storeState.roomId,
            number: storeState.defaultData.number,
          },
        ];
      });
      return this.roomsManagementEditServices.postPlaces(places).pipe(
        map((data: PlaceData[]) => {
          let places: PlaceData[] = [];
          data.forEach((el: PlaceData) => {
            places = [
              ...places,
              {
                id: el.id,
                number: el.number,
                maxQuantity: el.maxQuantity,
                tempId: el.tempId,
                placeType: +PlaceRole[String(el.placeType).toLowerCase()],
                roomId: el.roomId,
              },
            ];
          });
          return new roomsManagementEditCreateMapAction({
            getDataMap: places,
          });
        })
      );
    })
  );

  @Effect()
  roomManagementSaveMap$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_CREATE_MAP),
    withLatestFrom(this.store$.select(roomsManagementEditData)),
    map(([action, roomsManagementEditData]): [
      roomsManagementEditTypeActions.roomsManagementEditCreateMapAction,
      RoomsManagementEditStoreInterface
    ] => [action, roomsManagementEditData]),
    switchMap(([action, roomsManagementEditData]) => {
      let mapJson: string = RoomsManagementEditComponent.putDataReturnMap(
        action.payload.getDataMap
      );
      return this.roomsManagementEditServices
        .putOffice({
          officeId: roomsManagementEditData.officeId,
          number: roomsManagementEditData.defaultData.number,
          map: mapJson,
        })
        .pipe(
          map((data: GetFloorDataInterface) => {
            return new roomsManagementEditSaveMapAction({
              getMap: data,
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
