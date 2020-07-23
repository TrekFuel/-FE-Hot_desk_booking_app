import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeChoosingComponent } from './office-choosing/office-choosing.component';
import { MaterialModule } from '../material/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClearableInputComponent } from './components/clearable-input/clearable-input.component';
import { ZoomComponent } from './components/zoom/zoom.component';

@NgModule({
  declarations: [
    OfficeChoosingComponent,
    ClearableInputComponent,
    ZoomComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    OfficeChoosingComponent,
    ClearableInputComponent,
    ZoomComponent,
  ]
})
export class SharedModule {
}
