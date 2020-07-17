import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent {
  @Input() zoom = 100;
  @Output() zoomChange = new EventEmitter();

  zoomIn() {
    if (this.zoom >= 200) {
      return;
    }
    this.zoom += 10;
    this.zoomChange.emit(this.zoom);
  }

  zoomOut() {
    if (this.zoom <= 50) {
      return;
    }
    this.zoom -= 10;
    this.zoomChange.emit(this.zoom);
  }
}
