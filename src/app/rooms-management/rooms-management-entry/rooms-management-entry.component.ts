import { Component } from '@angular/core';
import { OfficeChoosingServices } from '../../shared/office-choosing/office-choosing.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-management-entry',
  templateUrl: './rooms-management-entry.component.html',
  styleUrls: ['./rooms-management-entry.component.scss'],
})
export class RoomsManagementEntryComponent {
  blockSelection$: Observable<boolean> = this.ocs.blockSelection;

  constructor(private ocs: OfficeChoosingServices) {
  }
}
