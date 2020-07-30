import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RoomsManagementEntryComponent } from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import { RoomsManagementEditComponent } from './rooms-management/rooms-management-edit/rooms-management-edit.component';
import { BookingPageComponent } from './booking/booking-page/booking-page.component';
import { AppUsersContainer } from './users/users.container';
import { UserProfileContainerComponent } from './home/user-profile/user-profile.container';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: AppUsersContainer },
  { path: 'rooms-management', component: RoomsManagementEntryComponent },
  { path: 'rooms-management/edit', component: RoomsManagementEditComponent },
  { path: 'booking', component: BookingPageComponent },
  { path: 'profile', component: UserProfileContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
