import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  CanvasSize,
  CurrentBookingPlace
} from '../../rooms-management/rooms-management-edit/models/editor-blocks.models';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { CANVAS_DEFAULT, CANVAS_OPTION } from '../../rooms-management/rooms-management-edit/canvas-option';
import { EDITOR_NAMES } from '../../rooms-management/rooms-management-edit/editor-blocks-info';
import { OfficeChoosingServices } from '../../shared/office-choosing/office-choosing.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-map',
  templateUrl: './booking-map.component.html',
  styleUrls: ['./booking-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingMapComponent implements OnInit, OnDestroy {

  @ViewChild('htmlCanvasBooking', { static: true }) htmlCanvas: ElementRef;
  @ViewChild('cardForBooking', { static: true }) cardForBooking: ElementRef;
  @Input() mapData: string;
  @Output() bookPlaceForId: EventEmitter<string> = new EventEmitter<string>();
  public canvasSize: CanvasSize = CANVAS_DEFAULT;
  currentBookingPlace: CurrentBookingPlace = {
    isPlaceClicked: false,
    placeData: null
  };
  private ocsSubscription: Subscription;
  private canvas: Canvas;

  constructor(private ocs: OfficeChoosingServices, private changeDetection: ChangeDetectorRef) {
  }

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  ngOnInit(): void {
    this.ocsSubscription = this.ocs.blockSelection.subscribe((block: boolean) => {
      if (block) this.canvasSize.zoom = 100;
    });

    this._initCanvas();
    this.loadMap();
    this.checkBookingsOnPlaces();

    this.canvas.on({
      'mouse:over': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place && this.canvas.getActiveObjects().length <= 1) {
          this.canvas.hoverCursor = 'pointer';
          actObj.setShadow('3px 3px 12px rgba(0,255,0,0.7)');
          this.canvas.requestRenderAll();
        }
      },
      'mouse:out': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place && this.canvas.getActiveObjects().length <= 1) {
          this.canvas.hoverCursor = 'default';
          actObj.setShadow('0 0 0 rgba(255,255,255,0)');

          this.canvas.requestRenderAll();
        }
      },
      'mouse:down': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          this.currentBookingPlace.isPlaceClicked = true;
          this.currentBookingPlace.placeData = actObj.data;
          this.changeDetection.detectChanges();
          console.log(actObj.data.id);
        }
      },
      'mouse:down:before': (e) => {

      }
    });
  }

  onBookingClick(): void {
    console.log('click');
    // if (this.currentBookingPlace.placeData?.isFree) {}
    this.bookPlaceForId.emit(this.currentBookingPlace.placeData.id);
  }

  checkBookingsOnPlaces() {
    this.canvas.forEachObject((obj: fabric.Object) => {
      if (obj?.name === EDITOR_NAMES.place) {
        const bound = obj.getBoundingRect();

        const rect = new fabric.Rect({
          left: bound.left - 7,
          top: bound.top - 5,
          width: bound.width + 10,
          height: bound.height + 10,
          fill: 'transparent',
          stroke: 'lightgreen',
          strokeWidth: 4,
          opacity: 0.5,
          rx: 5,
          ry: 5,
          perPixelTargetFind: true,
          lockMovementX: true,
          lockMovementY: true,
          hasControls: false,
          hasBorders: false,
          selectable: false
        });

        rect.name = `temp|${obj.data.tempId}`;
        this.canvas.add(rect);

      }
      this.canvas.requestRenderAll();
    });
  }

  doCanvasZoom(zoom: number = this.canvasSize.zoom) {
    this.canvasSize.zoom = zoom;
    this.canvas.setWidth(this.canvasSize.width * this.curZoom);
    this.canvas.setHeight(this.canvasSize.height * this.curZoom);
    this.canvas.setZoom(this.curZoom);
  }

  loadMap() {
    // console.log(this.mapData);
    // this.changeDetection.detectChanges();
    const dataJSON: string = this.mapData;
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
    this.ocsSubscription.unsubscribe();
    this.canvas.off();
  }

  private _initCanvas(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.READ_ONLY);
    this.doCanvasZoom();
  }


}
