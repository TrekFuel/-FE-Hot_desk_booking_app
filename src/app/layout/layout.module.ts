import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material-module';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        RouterModule
    ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
