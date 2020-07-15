import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SidebarServices {

  private _isVisible = false;

  get isVisible(): boolean {
    return this._isVisible;
  }

  onClick() {
    this._isVisible = !this._isVisible;
  }

}
