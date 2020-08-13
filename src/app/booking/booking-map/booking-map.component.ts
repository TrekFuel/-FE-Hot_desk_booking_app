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
  ViewChild,
} from '@angular/core';
import { CanvasSize } from '../../rooms-management/rooms-management-edit/models/editor-blocks.models';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import {
  CANVAS_DEFAULT,
  CANVAS_OPTION,
} from '../../rooms-management/rooms-management-edit/canvas-option';
import { EDITOR_NAMES } from '../../rooms-management/rooms-management-edit/editor-blocks-info';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { BookingStateOnUI, CurrentBookingPlace } from './booking-state.models';
import { Observable, Subscription } from 'rxjs';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';

@Component({
  selector: 'app-booking-map',
  templateUrl: './booking-map.component.html',
  styleUrls: ['./booking-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingMapComponent implements OnInit, OnDestroy {
  @ViewChild('htmlCanvasBooking', { static: true }) htmlCanvas: ElementRef;
  @ViewChild('cardForBooking', { static: true }) cardForBooking: ElementRef;
  @Input() userData: UserDataInterface;
  @Input() mapData: string;
  @Input() bookingState$: Observable<BookingStateOnUI[]>;
  @Output() bookedPlaceForId: EventEmitter<string> = new EventEmitter<string>();
  @Output() informPlaceForId: EventEmitter<string> = new EventEmitter<string>();
  bookingStateSubscription: Subscription;
  public canvasSize: CanvasSize = CANVAS_DEFAULT;
  currentBookingPlace: CurrentBookingPlace = {
    isPlaceClicked: false,
    placeData: null,
  };
  currentBookingArr: BookingStateOnUI[] = [];
  // this for instant ui changing
  currentHoveredId: string | null;
  private canvas: Canvas;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private store$: Store<AppState>
  ) {}

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  ngOnInit(): void {
    this.store$
      .select(getBlockSelection)
      .pipe(
        tap((value: boolean) => (value ? (this.canvasSize.zoom = 100) : null))
      )
      .subscribe();

    this._initCanvas();
    this.loadMap();

    this.bookingStateSubscription = this.bookingState$
      .pipe(
        tap((data: BookingStateOnUI[]) => (this.currentBookingArr = [...data]))
      )
      .subscribe((data: BookingStateOnUI[]) => {
        this.drawBookingsOnPlaces();
        if (
          this.currentBookingPlace.isPlaceClicked ||
          !!this.currentHoveredId
        ) {
          this.canvas.forEachObject((obj: fabric.Object) => {
            if (
              this.currentBookingPlace.isPlaceClicked &&
              obj.data?.id === this.currentBookingPlace.placeData.placeId
            )
              this.setDataOfClickedPlace(obj);
            if (
              obj.data?.id === this.currentHoveredId &&
              !!this.currentHoveredId
            )
              this.doShadowForPlace(obj);
          });
        }
      });

    this.canvas.on({
      'mouse:over': (e) => {
        const actObj: fabric.Object = e.target;
        if (
          actObj?.name === EDITOR_NAMES.place &&
          this.canvas.getActiveObjects().length <= 1
        ) {
          this.canvas.hoverCursor = 'pointer';
          this.currentHoveredId = actObj.data.id;
          this.doShadowForPlace(actObj);
        }
      },
      'mouse:out': (e) => {
        const actObj: fabric.Object = e.target;
        if (
          actObj?.name === EDITOR_NAMES.place &&
          this.canvas.getActiveObjects().length <= 1
        ) {
          this.canvas.hoverCursor = 'default';
          actObj.setShadow('0 0 0 rgba(255,255,255,0)');
          this.currentHoveredId = null;
          this.canvas.requestRenderAll();
        }
      },
      'mouse:down': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          this.currentBookingPlace.isPlaceClicked = true;
          this.setDataOfClickedPlace(actObj);
          // console.log(actObj.data.id);
        }
      },
      'mouse:down:before': (e) => {},
    });
  }

  setDataOfClickedPlace(obj: fabric.Object) {
    let { id: placeId, number: placeNumber } = obj.data;
    const currentBooking: BookingStateOnUI = this.getCurrentBookingPlaceData(
      placeId
    );
    if (currentBooking) {
      this.currentBookingPlace.placeData = {
        ...currentBooking,
        placeId,
        placeNumber,
      };
      this.changeDetection.detectChanges();
    }
  }

  doShadowForPlace(obj: fabric.Object): void {
    const currentPlace: BookingStateOnUI = this.getCurrentBookingPlaceData(
      obj.data.id
    );
    if (currentPlace) {
      let shadow = currentPlace.isFree
        ? '3px 3px 12px rgba(0,255,0,0.7)'
        : '3px 3px 12px rgba(255,0,0,0.7)';
      obj.setShadow(shadow);
      this.canvas.requestRenderAll();
    }
  }

  getCurrentBookingPlaceData(id: string): BookingStateOnUI {
    return this.currentBookingArr.filter(
      (item: BookingStateOnUI) => item.placeId === id
    )[0];
  }

  onInformClick(): void {
    this.bookedPlaceForId.emit(this.currentBookingPlace.placeData.placeId);
  }

  onBookingClick(): void {
    // if (this.currentBookingPlace.placeData?.isFree) {}
    this.bookedPlaceForId.emit(this.currentBookingPlace.placeData.placeId);
  }

  drawBookingsOnPlaces(): void {
    this.clearMarkOnPlaces();

    this.canvas.forEachObject((obj: fabric.Object) => {
      if (obj?.name === EDITOR_NAMES.place) {
        // // ToDo temporary here for uuid grab
        // this.bookings.push({ placeId: obj.data.id, isFree: true });
        const bound = obj.getBoundingRect();
        const currentPlace: BookingStateOnUI = this.getCurrentBookingPlaceData(
          obj.data.id
        );
        if (currentPlace) {
          let stroke = currentPlace.isFree ? 'lightgreen' : 'lightgrey';
          const rect = this.createBorderBoxForPlace(bound, stroke);

          rect.name = 'temp';
          this.canvas.add(rect);
        }
      }
      this.canvas.requestRenderAll();
    });
    // console.log(this.bookings);
  }

  clearMarkOnPlaces(): void {
    this.canvas.forEachObject((obj: fabric.Object) => {
      if (obj?.name === 'temp') this.canvas.remove(obj);
    });
  }

  createBorderBoxForPlace(
    bound: { left: number; top: number; width: number; height: number },
    stroke: string
  ): fabric.Object {
    let scale = 1 / this.curZoom;
    return new fabric.Rect({
      left: (bound.left - 7) * scale,
      top: (bound.top - 5) * scale,
      width: (bound.width + 10) * scale,
      height: (bound.height + 10) * scale,
      fill: 'transparent',
      stroke,
      strokeWidth: 4,
      opacity: 0.5,
      rx: 5,
      ry: 5,
      perPixelTargetFind: true,
      lockMovementX: true,
      lockMovementY: true,
      hasControls: false,
      hasBorders: false,
      selectable: false,
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
    this.bookingStateSubscription.unsubscribe();
    this.canvas.off();
  }

  private _initCanvas(): void {
    this.canvas = new fabric.Canvas(
      this.htmlCanvas.nativeElement,
      CANVAS_OPTION.READ_ONLY
    );
    this.doCanvasZoom();
  }
}
