import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RoomsManagementEntryComponent } from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import { AppUsersContainer } from './users/users.container';
import { UserProfileContainerComponent } from './home/user-profile/user-profile.container';
import { BookingPageContainerComponent } from './booking/booking-page/booking-page.container';
import { NoAuthGuard } from './shared/guards/no-auth.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { UsersGuard } from './users/guards/users.guard';
import { RoomsManagementGuard } from './rooms-management/guards/rooms-management.guard';
import { environment } from '../environments/environment';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: environment.usersComponentRoute,
    component: AppUsersContainer,
    canActivate: [
      NoAuthGuard,
      UsersGuard,
    ],
  },
  {
    path: 'rooms-management',
    component: RoomsManagementEntryComponent,
    canActivate: [
      NoAuthGuard,
      RoomsManagementGuard,
    ],
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
  {
    path: '404',
    component: NotFoundPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
