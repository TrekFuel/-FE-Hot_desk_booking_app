import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CanvasSize } from '../../rooms-management/rooms-management-edit/models/editor-blocks.models';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { CANVAS_DEFAULT, CANVAS_OPTION } from '../../rooms-management/rooms-management-edit/canvas-option';
import { MOCK_OFFICE } from '../../shared/mock-office';
import { EDITOR_NAMES } from '../../rooms-management/rooms-management-edit/editor-blocks-info';

@Component({
  selector: 'app-booking-map',
  templateUrl: './booking-map.component.html',
  styleUrls: ['./booking-map.component.scss']
})
export class BookingMapComponent implements OnInit, OnDestroy {

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

    this.canvas.on({
      'mouse:over': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place && this.canvas.getActiveObjects().length <= 1) {
          this.canvas.hoverCursor = 'pointer';
          console.log('place under mouse');
          //   this.currentPlace.isPlaceHovered = true;
          //   this.currentPlace.placeData = actObj.data;
        }
      },
      'mouse:out': (e) => {
        this.canvas.hoverCursor = 'default';
        // const actObj: fabric.Object = e.target;
      },
      'mouse:down': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          console.log('click on place');
          //   this.currentPlace.isPlaceClickedToClose = false;
          //   this.currentPlace.placeData = actObj.data;
          // } else {
          //   this.hidePlaceData();
        }
      },
      'mouse:down:before': (e) => {
        // this.blockedElements.includes(e.target?.name) ? this.discardActObj()
        // : this.positioningCloneAndClose(e.target)
      }
    });
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

  ngOnDestroy(): void {
    this.canvas.off();
  }

  private _initCanvas(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.READ_ONLY);
    this.doCanvasZoom();
  }


}
