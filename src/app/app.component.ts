import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/login/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hot-desk-booking-app';

  constructor(private loginService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  ngOnInit() {
    this.loginService.autoLogin();
  }
}
