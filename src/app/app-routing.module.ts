import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {UsersComponent} from './users/users.component';
import {RoomsManagementEntryComponent} from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import {RoomsManagementEditComponent} from './rooms-management/rooms-management-edit/rooms-management-edit.component';
import {BookingPageComponent} from './booking/booking-page/booking-page.component';
import {UserProfileComponent} from './home/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rooms-management', component: RoomsManagementEntryComponent },
  { path: 'rooms-management/edit', component: RoomsManagementEditComponent },
  { path: 'booking', component: BookingPageComponent },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
