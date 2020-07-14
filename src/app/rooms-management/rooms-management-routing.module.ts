import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoomsManagementEntryComponent} from './rooms-management-entry/rooms-management-entry.component';

const routes: Routes = [
  {
    path: 'rooms-management',
    component: RoomsManagementEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsManagementRoutingModule {
}
