import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RoomsManagementEntryComponent } from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import { BookingPageComponent } from './booking/booking-page/booking-page.component';
import { AppUsersContainer } from './users/users.container';
import { UserProfileComponent } from './home/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: AppUsersContainer },
  { path: 'rooms-management', component: RoomsManagementEntryComponent },
  { path: 'booking', component: BookingPageComponent },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
