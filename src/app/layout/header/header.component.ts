import {
  Component, ElementRef, HostListener,
  OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { SidebarServices } from '../sidebar/sidebar.services';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { userSelector, userTokenSelector } from '../../store/selectors/auth.selectors';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/login/services/auth.service';
import { LogoutStartAction } from '../../store/actions/auth.actions';
import { AuthResponse } from '../../auth/login/models/auth-response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  public isVisibleSubmenu = false;
  usernameForIcon: string;

  user$: Observable<AuthResponse>;
  userToken$: Observable<string>;
  subscription$: Subscription;

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
    private loginService: AuthService,
    private store$: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.user$ = this.store$.select(userSelector);
    this.userToken$ = this.store$.select(userTokenSelector);

    this.subscription$ = this.user$
      .subscribe((user: AuthResponse) => {
        if (user && user.token) {
          const nameShortcut = user.userInfo.firstName.charAt(0);
          const surnameShortcut = user.userInfo.lastName.charAt(0);
          this.usernameForIcon = nameShortcut.concat(surnameShortcut);
        }
      });
  }

  isVisibleSidebar() {
    this.sidebarServices.onClick();
  }

  onClickSubmenu() {
      this.isVisibleSubmenu = !this.isVisibleSubmenu;
  }

  onLogout() {
    this.store$.dispatch(new LogoutStartAction());
    this.onClickSubmenu();
  }

  onFormSubmit() {
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
