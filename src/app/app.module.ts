import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material-module';
import { reducers } from './store';
import { SharedModule } from './shared/shared.module';
import { RoomsManagementModule } from './rooms-management/rooms-management.module';
import { BookingModule } from './booking/booking.module';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { UsersModule } from './users/users.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UsersListEffects } from './store/effects/usersList.effects';
import { AppInterceptors } from './app.interceptors';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginEffects } from './store/effects/login.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    UsersModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UsersListEffects, LoginEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AuthModule,
    SharedModule,
    RoomsManagementModule,
    BookingModule,
    MomentDateModule,
    HomeModule,
    HttpClientModule,
  ],
  providers: [AppInterceptors.interceptors],
  bootstrap: [AppComponent],
})
export class AppModule {}
