import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RoomsManagementEntryComponent } from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import { AppUsersContainer } from './users/users.container';
import { UserProfileContainerComponent } from './home/user-profile/user-profile.container';
import { BookingPageContainerComponent } from './booking/booking-page/booking-page.container';
import { NoAuthGuard } from './shared/guards/no-auth.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: AppUsersContainer,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'rooms-management',
    component: RoomsManagementEntryComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'booking',
    component: BookingPageContainerComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileContainerComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
