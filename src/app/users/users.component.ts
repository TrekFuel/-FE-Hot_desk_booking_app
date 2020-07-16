import { Component, OnInit } from '@angular/core';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' },
    { firstName: 'Viktor', lastName: 'Suvorov', email: 'viktor@test.com' }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
