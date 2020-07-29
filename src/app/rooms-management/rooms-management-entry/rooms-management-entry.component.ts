import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms-management-entry',
  templateUrl: './rooms-management-entry.component.html',
  styleUrls: ['./rooms-management-entry.component.scss']
})
export class RoomsManagementEntryComponent implements OnInit {

  showMap: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
