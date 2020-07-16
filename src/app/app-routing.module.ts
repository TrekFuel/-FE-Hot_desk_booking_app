import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from "./layout/users/users.component";
import { RoomsManagementEntryComponent } from './rooms-management/rooms-management-entry/rooms-management-entry.component';
import { RoomsManagementEditComponent } from './rooms-management/rooms-management-edit/rooms-management-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rooms-management', component: RoomsManagementEntryComponent },
  { path: 'rooms-management/edit', component: RoomsManagementEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
