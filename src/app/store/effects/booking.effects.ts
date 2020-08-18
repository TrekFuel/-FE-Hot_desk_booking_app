import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookingServices } from '../../booking/booking.services';
import * as roomsManagementEditTypeActions from '../actions/roomsManagementEdit.actions';
import { roomsManagementEditActionType } from '../actions/roomsManagementEdit.actions';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import {
  bookingActionType,
  bookingGetMapIdAction,
  createBookingAction,
  getAllBookingsAction,
  getCreateBookingAction
} from '../actions/booking.actions';
import {
  BookingStoreInterface,
  CreateBookingInterface,
  GetAllMapIdInterface
} from '../../booking/modules/booking-store.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { bookingMapId } from '../selectors/booking.selctors';
import { userData } from '../selectors/auth.selectors';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';
import { BookingResponseModel } from '../../shared/models/booking-response.model';
import { timer } from 'rxjs';

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
    switchMap(() => timer(0, 3000)),
    take(10),
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
            // console.log(data);
            return new getAllBookingsAction({ allBookings: data });
          })
        );
    })
  );

  @Effect()
  createBooking = this.actions$.pipe(
    ofType(bookingActionType.BOOKING_CREATE),
    withLatestFrom(this.store$.select(userData)),
    map(([action, userId]): [createBookingAction, UserDataInterface] => [
      action,
      userId,
    ]),
    switchMap(([action, userData]) => {
      console.log('start');
      const data: CreateBookingInterface = {
        startDate: action.payload.dataCreateBooking.startDate,
        endDate: action.payload.dataCreateBooking.endDate,
        userId: action.payload.dataCreateBooking.userId,
        placeId: action.payload.dataCreateBooking.placeId,
        userDto: userData,
      };
      return this.bookingServices.createBooking(data).pipe(
        map((data: BookingResponseModel) => {
          console.log(data);
          return new getCreateBookingAction();
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
