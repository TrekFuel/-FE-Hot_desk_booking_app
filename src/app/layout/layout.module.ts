import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material-module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { MessageStateComponent } from './message-state/message-state.component';
import { ModalAlertContainer } from './modal-alert/modal-alert.container';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';

@NgModule({
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    MessageStateComponent,
    ModalAlertContainer,
  ],
  imports: [BrowserAnimationsModule, FormsModule, MaterialModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    MessageStateComponent,
    ModalAlertComponent,
    ModalAlertContainer,
  ],
})
export class LayoutModule {}
