import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userFields = ['Location: Belarus, Grodno', 'Date of Birth: 01.12.1996',
    'Email: ridge96@yandex.ru', 'Skype: test123', 'Phone: +375291328633'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
