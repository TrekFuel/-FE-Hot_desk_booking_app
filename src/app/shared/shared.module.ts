import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficeChoosingComponent} from './office-choosing/office-choosing.component';
import {MaterialModule} from '../material/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClearableInputComponent } from './clearable-input/clearable-input.component';

@NgModule({
  declarations: [
    OfficeChoosingComponent,
    ClearableInputComponent,
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
  ]
})
export class SharedModule {
}
