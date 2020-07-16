import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingRoutingModule} from './booking-routing.module';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material-module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [BookingPageComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class BookingModule {
}
