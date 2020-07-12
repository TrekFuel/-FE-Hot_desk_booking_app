import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from "../material/material-module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
