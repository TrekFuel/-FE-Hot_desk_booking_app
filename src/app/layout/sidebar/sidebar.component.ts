import { Component } from '@angular/core';
import { SidebarServices } from "./sidebar.services";
import { sidebarAnimation } from "./sidebar.animation";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimation]
})
export class SidebarComponent {

  get isVisibleSidebar() {
    return this.sidebarServices.isVisible;
  }

  constructor(private sidebarServices: SidebarServices) {
  }

  closeSidebar(event) {
   if(event.target.id === 'component') {
     this.sidebarServices.onClick();
   }
  }

}

