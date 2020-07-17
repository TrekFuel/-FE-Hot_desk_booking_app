import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SidebarServices } from './sidebar.services';
import { sidebarAnimation } from './sidebar.animation';

interface BtnSidebarInterface {
  value: string,
  route: string,
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimation]
})
export class SidebarComponent implements OnInit {

  private _bodyElement: ElementRef;

  public btnValue: BtnSidebarInterface[] = [
    { value: 'List Users', route: 'users' },
    { value: 'Rooms Management', route: 'rooms-management' },
    { value: 'Rooms Management', route: 'rooms-management' },
    { value: 'Rooms Management', route: 'rooms-management' }
  ]

  get isVisibleSidebar() {
    this.scrollVisible(this.sidebarServices.isVisible);
    return this.sidebarServices.isVisible;
  }

  constructor(
    private sidebarServices: SidebarServices,
    private elRef: ElementRef, private renderer: Renderer2) {
  }

  closeSidebar(event): void {
    if(event.target.id === 'component' || event.target.id === 'btnSidebar') {
     this.sidebarServices.onClick();
    }
  }

  ngOnInit(): void {
    this._bodyElement = this.elRef.nativeElement.offsetParent;
  }

  scrollVisible(flag: boolean): void {
    if(flag) {
      this.renderer.setStyle(this._bodyElement, 'overflow-y', 'hidden');
    } else {
      this.renderer.removeStyle(this._bodyElement, 'overflow-y');
    }
  }

}

