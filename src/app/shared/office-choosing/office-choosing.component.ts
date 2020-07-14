import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
    this._initChoosingForm();
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
