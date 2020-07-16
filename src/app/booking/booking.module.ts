import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingRoutingModule} from './booking-routing.module';
import {BookingPageComponent} from './booking-page/booking-page.component';


@NgModule({
  declarations: [BookingPageComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
  ]
})
export class BookingModule {
}
