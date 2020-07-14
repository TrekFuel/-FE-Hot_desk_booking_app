import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from "../material/material-module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UsersComponent } from './users/users.component';
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersComponent
  ],
    imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        MatRadioModule
    ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersComponent
  ]
})
export class LayoutModule { }
