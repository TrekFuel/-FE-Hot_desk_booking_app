import { Component } from '@angular/core';
import { CanvasSize } from '../../rooms-management/rooms-management-edit/models/editor-blocks.models';

@Component({
  selector: 'app-booking-map',
  templateUrl: './booking-map.component.html',
  styleUrls: ['./booking-map.component.scss']
})
export class BookingMapComponent {


  public canvasSize: CanvasSize = {
    width: 500,
    height: 500,
    zoom: 100
  };

  constructor() {
  }

  doCanvasZoom(event) {

  }

}
