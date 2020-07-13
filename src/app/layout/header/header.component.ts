import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SidebarServices } from "../sidebar/sidebar.services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isVisibleSubmenu: boolean = false;

  @ViewChild('subMenu') subMenu: ElementRef;
  @ViewChild('btnSubMenu') btnSubMenu: ElementRef;

  @HostListener('document:click', ['$event']) clickOut(event) {
    let open: boolean = this.btnSubMenu.nativeElement.contains(event.target);
    let close: boolean = this.subMenu.nativeElement.contains(event.target);
    if(!open && !close) this.isVisibleSubmenu = false;
  }

  constructor(
    private el: ElementRef,
    private sidebarServices: SidebarServices
  ) { }

  isVisibleSidebar() {
    this.sidebarServices.onClick();
  }

  onClickSubmenu() {
    this.isVisibleSubmenu = !this.isVisibleSubmenu;
  }

}