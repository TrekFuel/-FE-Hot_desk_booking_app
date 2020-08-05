import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as roomsManagementEditTypeActions from '../actions/roomsManagementEdit.action';
import {
  roomsManagementEditActionType,
  roomsManagementEditCreateFloorAction,
  roomsManagementEditCreateOfficeAction,
} from '../actions/roomsManagementEdit.action';
import { RoomsManagementEditServices } from '../../rooms-management/rooms-management-edit/rooms-management-edit.services';
import {
  RequestFloorInterface,
  RequestOfficeInterface,
} from '../../rooms-management/rooms-management-edit/models/ request.interface';
import { ResponseOfficeDtoInterface } from '../../rooms-management/rooms-management-edit/models/response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';
import { of } from 'rxjs';
import { usersListFailureAction } from '../actions/usersList.actions';
import { DEFAULT_MAP_DATA } from '../../shared/models/default-map';

@Injectable()
export class roomsManagementEditEffects {
  @Effect()
  createOffice$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_START),
    switchMap(
      (data: roomsManagementEditTypeActions.roomsManagementEditStartAction) => {
        const dadaRequest: RequestOfficeInterface = {
          addressId: data.payload.addressId,
          number: '1',
        };
        return this.roomsManagementEditServices.postOffice(dadaRequest).pipe(
          map((data: ResponseOfficeDtoInterface) => {
            return new roomsManagementEditCreateOfficeAction({
              response: data,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            const messageState: MessageStateInterface = {
              message: {
                text: errorResponse.statusText,
                stateAlert: 'alert-danger',
              },
            };

            return of(
              new usersListFailureAction({
                errors: errorResponse,
                message: messageState,
              })
            );
          })
        );
      }
    )
  );

  @Effect()
  createFloor$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_CREATE_OFFICE),
    switchMap(
      (
        data: roomsManagementEditTypeActions.roomsManagementEditCreateOfficeAction
      ) => {
        const dataFloor: RequestFloorInterface = {
          officeId: data.payload.response.id,
          number: '1',
          map: DEFAULT_MAP_DATA,
        };
        return this.roomsManagementEditServices.postFloor(dataFloor).pipe(
          map((data: ResponseOfficeDtoInterface) => {
            return new roomsManagementEditCreateFloorAction({ response: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            const messageState: MessageStateInterface = {
              message: {
                text: errorResponse.statusText,
                stateAlert: 'alert-danger',
              },
            };

            return of(
              new usersListFailureAction({
                errors: errorResponse,
                message: messageState,
              })
            );
          })
        );
      }
    )
  );

  /*@Effect()
  createPlace$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_CREATE_PLACE_START),
    switchMap((data:  roomsManagementEditTypeActions.) => {})
  );*/

  constructor(
    private actions$: Actions,
    private roomsManagementEditServices: RoomsManagementEditServices
  ) {}
}