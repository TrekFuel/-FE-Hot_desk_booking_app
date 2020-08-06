import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Observable } from 'rxjs';
import { OfficeChoosingServices } from '../../shared/office-choosing/office-choosing.services';

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
  date = new FormControl(new Date());
  // date = new FormControl(moment());
  blockSelection$: Observable<boolean> = this.ocs.blockSelection;
  showMap: boolean = false;

  constructor(private ocs: OfficeChoosingServices) {
  }

  onClickAnotherAddress() {
    this.ocs.setBlockSelection(false);
  }
}
