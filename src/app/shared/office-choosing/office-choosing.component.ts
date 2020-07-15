import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { OfficeChoosingService } from './office-choosing.service';

@Component({
  selector: 'app-office-choosing',
  templateUrl: './office-choosing.component.html',
  styleUrls: ['./office-choosing.component.scss']
})
export class OfficeChoosingComponent implements OnInit {
  form: FormGroup;

  countryOptions = ['Belarus', 'Ukraine', 'Russia'];
  cityOptions = ['Minsk', 'Grodno', 'Kiev'];
  officeOptions = ['ул. Свердлова 2', 'ул. Королева 34', 'ул. Светлова 30'];

  adminMode = true;

  constructor( ) { }

  ngOnInit() {
    this._initChoosingForm();
    if (this.adminMode) {
      this.countryOptions.unshift('New');
      this.cityOptions.unshift('New');
      this.officeOptions.unshift('New');
    }
  }

  private _initChoosingForm() {
    this.form = new FormGroup({
      country: new FormControl(''),
      city: new FormControl(''),
      office: new FormControl(''),
    });
  }

  onSelected(value: string) {
    console.log(value);
  }

}
