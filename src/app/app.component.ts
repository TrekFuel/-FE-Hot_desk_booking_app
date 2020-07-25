import { Component, OnInit } from '@angular/core';
import { LoginService } from './auth/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hot-desk-booking-app';

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.autoLogin();
  }
}
