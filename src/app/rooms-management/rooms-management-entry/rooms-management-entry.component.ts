import { Component, OnInit } from '@angular/core';
import { ChooseOffice } from '../../shared/models/choose-office.model';

@Component({
  selector: 'app-rooms-management-entry',
  templateUrl: './rooms-management-entry.component.html',
  styleUrls: ['./rooms-management-entry.component.scss'],
})
export class RoomsManagementEntryComponent implements OnInit {
  chooseOffice: ChooseOffice;
  showMap: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
