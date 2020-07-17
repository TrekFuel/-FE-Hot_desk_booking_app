import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {UsersComponent} from './users/users.component';
import {RoomsManagementEntryComponent} from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import {BookingPageComponent} from './booking/booking-page/booking-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'rooms-management', component: RoomsManagementEntryComponent},
  {path: 'booking', component: BookingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
