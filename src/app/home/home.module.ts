import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileContainerComponent } from './user-profile/user-profile.container';
import {MaterialModule} from '../material/material-module';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileContainerComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
    ],
  exports: [
    UserProfileComponent,
    UserProfileContainerComponent,
  ]
})
export class HomeModule {
}
