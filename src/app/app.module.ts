import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {LayoutModule} from './layout/layout.module';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './material/material-module';
import {reducers} from './store';
import {SharedModule} from './shared/shared.module';
import {RoomsManagementModule} from './rooms-management/rooms-management.module';
import {BookingModule} from './booking/booking.module';
import {MomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    AuthModule,
    SharedModule,
    RoomsManagementModule,
    BookingModule,
    MomentDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
