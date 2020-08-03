import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RoomsManagementEntryComponent } from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import { AppUsersContainer } from './users/users.container';
import { UserProfileContainerComponent } from './home/user-profile/user-profile.container';
import { BookingPageContainerComponent } from './booking/booking-page/booking-page.container';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: AppUsersContainer },
  { path: 'rooms-management', component: RoomsManagementEntryComponent },
  { path: 'booking', component: BookingPageContainerComponent },
  { path: 'profile', component: UserProfileContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
