import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material-module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppUsersContainer } from './users.container';

@NgModule({
  declarations: [UsersComponent, AppUsersContainer],
  imports: [
    FormsModule,
    MaterialModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
