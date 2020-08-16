import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookingServices } from '../../booking/booking.services';
import { roomsManagementEditActionType } from '../actions/roomsManagementEdit.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  bookingActionType,
  bookingGetMapIdAction,
  getAllBookingsAction,
} from '../actions/booking.actions';
import * as roomsManagementEditTypeActions from '../actions/roomsManagementEdit.actions';
import {
  BookingStoreInterface,
  GetAllMapIdInterface,
} from '../../booking/modules/booking-store.interface';
import { timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { bookingMapId } from '../selectors/booking.selctors';

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
        const mapId: GetAllMapIdInterface = {
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

  @Effect()
  getAllBooking = this.actions$.pipe(
    ofType(bookingActionType.BOOKING_GET_MAP_ID),
    /*switchMap(() => timer(0, 1000)),*/
    withLatestFrom(this.store$.select(bookingMapId)),
    map(([action, booking]): [number, BookingStoreInterface] => [
      action,
      booking,
    ]),
    switchMap(([, bookingData]) => {
      return this.bookingServices
        .getAllBooking({
          startDate: bookingData.gapDate.startDate,
          endDate: bookingData.gapDate.endDate,
          roomId: bookingData.mapId.roomId,
        })
        .pipe(
          map((data) => {
            return new getAllBookingsAction({ allBookings: data });
          })
        );
    })
  );

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private bookingServices: BookingServices
  ) {}
}
