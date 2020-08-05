import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChooseOffice } from '../../shared/models/choose-office.model';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookingPageComponent {
  chooseOffice: ChooseOffice;
  date = new FormControl(new Date());

  // date = new FormControl(moment());

  constructor() {
  }

  onClickShowMap() {
    console.log('showmap');
  }

}
