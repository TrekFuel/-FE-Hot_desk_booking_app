import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingPageContainerComponent } from './booking-page/booking-page.container';

@NgModule({
  declarations: [
    BookingPageComponent,
    BookingPageContainerComponent,
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
