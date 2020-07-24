import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent {
  @Input() zoom = 100;
  @Output() zoomChange = new EventEmitter();
  zoomMin: number = environment.zoomOptions.MIN;
  zoomMax: number = environment.zoomOptions.MAX;
  zoomStep: number = environment.zoomOptions.STEP;

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case '+':
        this.zoomIn();
        break;
      case '-':
        this.zoomOut();
        break;
      default:
        return;
    }
  }

  zoomIn() {
    if (this.zoom >= this.zoomMax) {
      this.zoom = this.zoomMax;
      return;
    }
    this.zoom += this.zoomStep;
    this.zoomChange.emit(this.zoom);
  }

  zoomOut() {
    if (this.zoom <= this.zoomMin) {
      this.zoom = this.zoomMin;
      return;
    }
    this.zoom -= this.zoomStep;
    this.zoomChange.emit(this.zoom);
  }
}
