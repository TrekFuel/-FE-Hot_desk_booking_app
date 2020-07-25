import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {SidebarServices} from '../sidebar/sidebar.services';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {userSelector} from '../../store/selectors/login.selectors';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../auth/login/models/auth-response.model';
import {LoginService} from '../../auth/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isVisibleSubmenu = false;
  isLoggedIn$: Observable<AuthResponse>;

  @ViewChild('subMenu') subMenu: ElementRef;
  @ViewChild('btnSubMenu') btnSubMenu: ElementRef;

  // @HostListener('document:click', ['$event']) clickOut(event) {
  //   let open: boolean = this.btnSubMenu.nativeElement.contains(event.target);
  //   let close: boolean = this.subMenu.nativeElement.contains(event.target);
  //   if (!open && !close) {
  //     this.isVisibleSubmenu = false;
  //   }
  // }

  constructor(
    private el: ElementRef,
    private sidebarServices: SidebarServices,
    private loginService: LoginService,
    private store$: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store$.pipe(
      select(userSelector)
    );
  }

  isVisibleSidebar() {
    this.sidebarServices.onClick();
  }

  onClickSubmenu() {
    this.isVisibleSubmenu = !this.isVisibleSubmenu;
  }

  onLogout() {

  }

}
