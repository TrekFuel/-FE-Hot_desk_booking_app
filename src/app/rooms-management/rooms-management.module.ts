import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomsManagementEntryComponent} from './rooms-management-entry/rooms-management-entry.component';
import {RoomsManagementRoutingModule} from './rooms-management-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material-module';


@NgModule({
  declarations: [
    RoomsManagementEntryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RoomsManagementRoutingModule
  ]
})

export class RoomsManagementModule {
}
