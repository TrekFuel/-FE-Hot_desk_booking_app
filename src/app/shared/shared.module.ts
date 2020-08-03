import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeChoosingComponent } from './office-choosing/office-choosing.component';
import { MaterialModule } from '../material/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClearableInputComponent } from './components/clearable-input/clearable-input.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { HasFocusDirective } from './directives/has-focus.directive';
import { OfficeChoosingContainer } from './office-choosing/office-choosing.container';

@NgModule({
  declarations: [
    OfficeChoosingComponent,
    OfficeChoosingContainer,
    ClearableInputComponent,
    ZoomComponent,
    HasFocusDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    OfficeChoosingContainer,
    ClearableInputComponent,
    ZoomComponent,
    HasFocusDirective
  ]
})
export class SharedModule {
}
