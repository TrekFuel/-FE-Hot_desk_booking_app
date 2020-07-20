import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userFields: { field: string, value: string }[] = [
    {field: 'Department', value: 'Development'},
    {field: 'Location', value: 'Grodno'},
    {field: 'HR', value: 'Alex Low'},
    {field: 'Birthday', value: '01.12.1996'},
    {field: 'Email', value: 'ridge96@yandex.ru'},
    {field: 'Skype', value: 'test213124'},
    {field: 'Phone', value: '+375291328633'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
