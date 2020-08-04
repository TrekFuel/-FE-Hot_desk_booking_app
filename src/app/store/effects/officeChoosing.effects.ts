import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageStateInterface } from '../../layout/message-state/models/message.interface';
import { of } from 'rxjs';
import * as officeChoosingTypeActions from '../actions/officeChoosing.action';
import {
  officeChoosingActionType,
  officeChoosingCreateAddressAction,
  officeChoosingFailureAction,
  officeChoosingSuccessAction,
} from '../actions/officeChoosing.action';
import { OfficeChoosingServices } from '../../shared/office-choosing/office-choosing.services';
import { OfficesDataSelectsInterface } from '../../shared/models/offices-data-selects.interface';
import { SelectorsModel } from '../../shared/models/selectors.model';

@Injectable()
export class OfficeChoosingEffects {
  @Effect()
  getSelectors$ = this.actions$.pipe(
    ofType(officeChoosingActionType.SELECTORS_DATA_START),
    switchMap(() => {
      return this.officeChoosingServices.getSelectorsData().pipe(
        map((data: OfficesDataSelectsInterface[]) => {
          const selectors = this.getDataSelectors(data);

          return new officeChoosingSuccessAction({
            selectorsData: selectors,
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
            new officeChoosingFailureAction({
              errors: errorResponse,
              message: messageState,
            })
          );
        })
      );
    })
  );

  @Effect()
  createSelector = this.actions$.pipe(
    ofType(officeChoosingActionType.SELECTORS_CREATE_ADDRESS_START),
    switchMap(
      (
        data: officeChoosingTypeActions.officeChoosingStartCreateAddressAction
      ) => {
        const { payload } = data;
        return this.officeChoosingServices
          .postSelectorsData(payload.selectorData)
          .pipe(
            map((data: OfficesDataSelectsInterface) => {
              return new officeChoosingCreateAddressAction({
                selectorData: data,
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
                new officeChoosingFailureAction({
                  errors: errorResponse,
                  message: messageState,
                })
              );
            })
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private officeChoosingServices: OfficeChoosingServices
  ) {}

  getDataSelectors(data: OfficesDataSelectsInterface[]): SelectorsModel {
    const selectorDate: SelectorsModel = {
      country: [],
      city: [],
      address: [],
    };
    let checkCity = [];
    data.forEach((data: OfficesDataSelectsInterface) => {
      if (selectorDate.country.indexOf(data.countryName) === -1) {
        selectorDate.country = [...selectorDate.country, data.countryName];
      }
      if (checkCity.indexOf(data.city) === -1) {
        checkCity = [...checkCity, data.city];
        selectorDate.city = [
          ...selectorDate.city,
          {
            country: data.countryName,
            city: data.city,
          },
        ];
      }
      selectorDate.address = [
        ...selectorDate.address,
        {
          city: data.city,
          address: data.street,
          addressId: data.id,
        },
      ];
    });
    return selectorDate;
  }
}
