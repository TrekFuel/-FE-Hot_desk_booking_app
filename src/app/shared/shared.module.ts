import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficeChoosingComponent} from './office-choosing/office-choosing.component';
import {MaterialModule} from '../material/material-module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [OfficeChoosingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    OfficeChoosingComponent,
  ]
})
export class SharedModule {
}
