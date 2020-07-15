import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SidebarServices } from "./sidebar.services";
import { sidebarAnimation } from "./sidebar.animation";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimation]
})
export class SidebarComponent implements OnInit {

  private _bodyElement: ElementRef;

  get isVisibleSidebar() {
    this.scrollVisible(this.sidebarServices.isVisible);
    return this.sidebarServices.isVisible;
  }

  constructor(
    private sidebarServices: SidebarServices,
    private elRef: ElementRef, private renderer: Renderer2) {
  }

  closeSidebar(event) {
    if(event.target.id === 'component') {
     this.sidebarServices.onClick();
    }
  }

  ngOnInit(): void {
    this._bodyElement = this.elRef.nativeElement.offsetParent;
  }

  scrollVisible(flag: boolean) {
    if(flag) {
      this.renderer.setStyle(this._bodyElement, 'overflow-y', 'hidden');
    } else {
      this.renderer.removeStyle(this._bodyElement, 'overflow-y');
    }
  }

}

