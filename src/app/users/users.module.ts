import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material-module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    UsersComponent
  ]
})

export class UsersModule {
}
