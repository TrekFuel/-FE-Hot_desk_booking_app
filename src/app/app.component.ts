import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/login/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hot-desk-booking-app';

  constructor(private loginService: AuthService) {
  }


  ngOnInit() {
    this.loginService.autoLogin();
  }
}
