import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SidebarServices } from '../sidebar/sidebar.services';
import { LoginService } from '../../auth/login/services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isVisibleSubmenu = false;

  @ViewChild('subMenu') subMenu: ElementRef;
  @ViewChild('btnSubMenu') btnSubMenu: ElementRef;
  @ViewChild('form') form: NgForm;

  constructor(
    private el: ElementRef,
    private sidebarServices: SidebarServices,
    private loginService: LoginService
  ) {}

  @HostListener('document:click', ['$event']) clickOut(event) {
    let open: boolean = this.btnSubMenu.nativeElement.contains(event.target);
    let close: boolean = this.subMenu.nativeElement.contains(event.target);
    if (!open && !close) {
      this.isVisibleSubmenu = false;
    }
  }

  isVisibleSidebar() {
    this.sidebarServices.onClick();
  }

  onClickSubmenu() {
    this.isVisibleSubmenu = !this.isVisibleSubmenu;
  }

  onLogout() {
    this.loginService.logout();
  }

  onFormSubmit() {}
}
