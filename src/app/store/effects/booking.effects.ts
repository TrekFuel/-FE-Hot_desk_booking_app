import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookingServices } from '../../booking/booking.services';
import { roomsManagementEditActionType } from '../actions/roomsManagementEdit.actions';
import { map } from 'rxjs/operators';
import { bookingGetMapIdAction } from '../actions/booking.actions';
import * as roomsManagementEditTypeActions from '../actions/roomsManagementEdit.actions';
import { GetAllMapId } from '../../booking/modules/booking-store.interface';

@Injectable()
export class BookingEffects {
  @Effect()
  getAllMapId$ = this.actions$.pipe(
    ofType(roomsManagementEditActionType.R_M_E_GET_MAP),
    map(
      ({
        payload,
      }: roomsManagementEditTypeActions.roomsManagementEditGetMapAction) => {
        const { getMap } = payload;
        const mapId: GetAllMapId = {
          addressId: getMap.id,
          officeId: getMap.officeId,
          floorId: getMap.room[0].floorId,
          roomId: getMap.room[0].id,
        };
        return new bookingGetMapIdAction({
          mapId: mapId,
        });
      }
    )
  );

  constructor(
    private actions$: Actions,
    private bookingServices: BookingServices
  ) {}
}
