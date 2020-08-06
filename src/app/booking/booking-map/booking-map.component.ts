import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasSize } from '../../rooms-management/rooms-management-edit/models/editor-blocks.models';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { CANVAS_DEFAULT, CANVAS_OPTION } from '../../rooms-management/rooms-management-edit/canvas-option';
import { MOCK_OFFICE } from '../../shared/mock-office';

@Component({
  selector: 'app-booking-map',
  templateUrl: './booking-map.component.html',
  styleUrls: ['./booking-map.component.scss']
})
export class BookingMapComponent implements OnInit {

  @ViewChild('htmlCanvasBooking', { static: true }) htmlCanvas: ElementRef;
  public canvasSize: CanvasSize = CANVAS_DEFAULT;
  private canvas: Canvas;

  constructor() {
  }

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  ngOnInit(): void {
    this._initCanvas();
    this.loadMap();
  }

  doCanvasZoom(zoom: number = this.canvasSize.zoom) {
    this.canvasSize.zoom = zoom;
    this.canvas.setWidth(this.canvasSize.width * this.curZoom);
    this.canvas.setHeight(this.canvasSize.height * this.curZoom);
    this.canvas.setZoom(this.curZoom);
  }

  loadMap() {
    const dataJSON: string = MOCK_OFFICE;
    this.canvas.loadFromJSON(dataJSON, () => {
      this.canvas.renderAll();
    });
    this.doLockElements();
  }

  doLockElements(): void {
    this.canvas.forEachObject((obj: fabric.Object) => {
      obj.lockMovementX = true;
      obj.lockMovementY = true;
      obj.hasControls = false;
      obj.hasBorders = false;
      obj.selectable = false;
    });
  }

  private _initCanvas(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.READ_ONLY);
    this.doCanvasZoom();
  }


}
