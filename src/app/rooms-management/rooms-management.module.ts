import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsManagementEntryComponent } from './rooms-management-entry/rooms-management-entry.component';
import { RoomsManagementRoutingModule } from './rooms-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material-module';
import { RoomsManagementEditComponent } from './rooms-management-edit/rooms-management-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoomsManagementEntryComponent,
    RoomsManagementEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RoomsManagementRoutingModule,
    ReactiveFormsModule
  ]
})

export class RoomsManagementModule {
}
