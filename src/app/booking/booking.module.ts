import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingPageContainerComponent } from './booking-page/booking-page.container';
import { BookingsTableComponent } from './bookings-table/bookings-table.component';
import { BookingsTableContainer } from './bookings-table/bookings-table.container';
import { BookingMapComponent } from './booking-map/booking-map.component';
import { BookingMapContainer } from './booking-map/booking-map.container';

@NgModule({
  declarations: [
    BookingPageComponent,
    BookingPageContainerComponent,
    BookingsTableComponent,
    BookingsTableContainer,
    BookingMapComponent,
    BookingMapContainer
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
   exports: [
     BookingPageComponent,
     BookingPageContainerComponent,
   ]
})

export class BookingModule {
}
