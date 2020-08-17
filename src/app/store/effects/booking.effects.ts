import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookingServices } from '../../booking/booking.services';
import { roomsManagementEditActionType } from '../actions/roomsManagementEdit.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  bookingActionType,
  bookingGetMapIdAction,
  bookingTypeActions,
  createBookingAction,
  getAllBookingsAction,
} from '../actions/booking.actions';
import * as roomsManagementEditTypeActions from '../actions/roomsManagementEdit.actions';
import {
  BookingStoreInterface,
  CreateBookingInterface,
  GapDateInterface,
  GetAllMapIdInterface,
} from '../../booking/modules/booking-store.interface';
import { interval, Observable, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { bookingMapId, gapDateBooking } from '../selectors/booking.selctors';

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
    switchMap(() => timer(0, 6000)),
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
            console.log(data);
            return new getAllBookingsAction({ allBookings: data });
          })
        );
    })
  );

  /*@Effect()
  createBooking = this.actions$.pipe(
    ofType(bookingActionType.BOOKING_CREATE),
    withLatestFrom(this.store$.select(gapDateBooking)),
    map(([action, gapData]): [createBookingAction, GapDateInterface] => {
      return [action, gapData];
    }),
    switchMap(([action, gapData]) => {
      const data: CreateBookingInterface = {
        date: {
          startDate: gapData.startDate,
          endDate: gapData.endDate,
        },
        userId: action.payload.dataCreateBooking.userId,
        placeId: action.payload.dataCreateBooking.placeId,
      };
      return this.bookingServices.createBooking(data).pipe(
        map((data) => {
          return data;
        })
      );
    })
  );*/

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private bookingServices: BookingServices
  ) {}
}
