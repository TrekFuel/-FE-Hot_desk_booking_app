import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rooms-management-edit',
  templateUrl: './rooms-management-edit.component.html',
  styleUrls: ['./rooms-management-edit.component.scss']
})
export class RoomsManagementEditComponent implements OnInit {

  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  inputMessage(message) {
    console.log(message);
  }
}
