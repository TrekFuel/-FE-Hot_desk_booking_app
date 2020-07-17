import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookingPageComponent} from './booking-page/booking-page.component';

const routes: Routes = [
  {
    path: 'booking',
    component: BookingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
