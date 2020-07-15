import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UsersComponent } from './users/users.component';
import { MaterialModule } from "../material/material-module";

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersComponent
  ],
    imports: [
      BrowserAnimationsModule,
      FormsModule,
      MaterialModule
    ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersComponent
  ]
})
export class LayoutModule { }
