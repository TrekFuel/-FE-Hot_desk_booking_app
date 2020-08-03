import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileContainerComponent } from './user-profile/user-profile.container';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileContainerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [
    UserProfileComponent,
    UserProfileContainerComponent,
  ]
})
export class HomeModule {
}
