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
import { CanvasSize } from '../../rooms-management/rooms-management-edit/models/editor-blocks.models';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { CANVAS_DEFAULT, CANVAS_OPTION } from '../../rooms-management/rooms-management-edit/canvas-option';
import { EDITOR_NAMES } from '../../rooms-management/rooms-management-edit/editor-blocks-info';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';
import { map, takeWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { BookingStateOnUI, CurrentBookingPlace, DataForBooking } from './booking-state.models';
import { Observable, Subscription, timer } from 'rxjs';
import { UserDataInterface } from '../../auth/login/models/auth-response.model';
import { environment } from '../../../environments/environment';
import { PlaceRole } from '../../shared/models/map-data.model';

@Component({
  selector: 'app-booking-map',
  templateUrl: './booking-map.component.html',
  styleUrls: ['./booking-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingMapComponent implements OnInit, OnDestroy {

  @ViewChild('htmlCanvasBooking', { static: true }) htmlCanvas: ElementRef;
  @ViewChild('cardForBooking', { static: true }) cardForBooking: ElementRef;
  @Input() userData: UserDataInterface;
  canBookAdministration: boolean;
  @Input() mapData: string;
  @Input() bookingState$: Observable<BookingStateOnUI[]>;
  @Output() bookedPlaceForId: EventEmitter<DataForBooking> = new EventEmitter<DataForBooking>();
  @Output() informPlaceForId: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteBookingForPlace: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteMap: EventEmitter<boolean> = new EventEmitter<boolean>();
  bookingStateSubscription: Subscription;
  public canvasSize: CanvasSize = CANVAS_DEFAULT;
  currentBookingPlace: CurrentBookingPlace = {
    isPlaceClicked: false,
    placeData: null
  };
  currentBookingArr: BookingStateOnUI[] = [];
  // this for instant ui changing
  currentHoveredId: string | null;
  countDown: Observable<number>;
  checkToDelete: boolean;
  @ViewChild('checkboxForDelete', { static: true }) checkboxForDelete: ElementRef;

  private canvas: Canvas;

  constructor(private changeDetection: ChangeDetectorRef,
              private store$: Store<AppState>) {
  }

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  ngOnInit(): void {

    this.store$.select(getBlockSelection).pipe(tap((value: boolean) => value ? this.canvasSize.zoom = 100 : null))
      .subscribe();
    this.canBookAdministration = this.checkUserRole(this.userData);
    this._initCanvas();
    this.loadMap();
    this.createAllPlacesArr();
    console.log(this.canBookAdministration);

    this.bookingStateSubscription = this.bookingState$.pipe(
      tap((data) => this.changeDataOnPlaces(data))
    ).subscribe((data: BookingStateOnUI[]) => {
      this.drawBookingsOnPlaces();
      if (this.currentBookingPlace.isPlaceClicked || !!this.currentHoveredId) {
        this.canvas.forEachObject((obj: fabric.Object) => {
          if (this.currentBookingPlace.isPlaceClicked && !!this.currentBookingPlace.placeData && obj.data
            && obj.data.id === this.currentBookingPlace.placeData.placeId) this.setDataOfClickedPlace(obj);
          if (obj.data?.id === this.currentHoveredId && !!this.currentHoveredId) this.doShadowForPlace(obj);
        });
      }
    });

    this.canvas.on({
      'mouse:over': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          if (!(!this.canBookAdministration && actObj.data.placeType === PlaceRole.constant)) {
            this.canvas.hoverCursor = 'pointer';
            this.currentHoveredId = actObj.data.id;
            this.doShadowForPlace(actObj);
          }
        }
      },
      'mouse:out': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          this.canvas.hoverCursor = 'default';
          actObj.setShadow('0 0 0 rgba(255,255,255,0)');
          this.currentHoveredId = null;
          this.canvas.requestRenderAll();
        }
      },
      'mouse:down': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          if (!(!this.canBookAdministration && actObj.data.placeType === PlaceRole.constant)) {
            if (this.currentBookingPlace.isPlaceClicked && actObj.data.id !== this.currentBookingPlace.placeData.placeId) {
              this.onDeleteBooking(this.currentBookingPlace.placeData.placeId);
            }
            this.currentBookingPlace.isPlaceClicked = true;
            this.setDataOfClickedPlace(actObj);
            this.activateTimer();
            this.onBookingClick();
          }
        }
      },
      'mouse:down:before': (e) => {
      }
    });
  }

  onDeleteMap() {
    this.deleteMap.emit(true);
  }

  onClickAgreeToDelete() {
    this.checkToDelete = this.checkboxForDelete.nativeElement.checked;
  }

  checkUserRole(user: UserDataInterface): boolean {
    // ToDo check only first role of user
    return environment.ROLES_FOR_ADMINISTRATION.includes(user.roleNames[0]);
  }

  changeDataOnPlaces(data: any): void {
    console.log('handle data here :' + data);
  }

  onClosePlace(): void {
    if (!!this.currentBookingPlace.placeData) {
      let placeId: string = this.currentBookingPlace.placeData.placeId;
      this.currentBookingPlace.isPlaceClicked = false;
      this.onDeleteBooking(placeId);
    }
  }

  onDeleteBooking(placeId: string): void {
    this.deleteBookingForPlace.emit(placeId);
  }

  createAllPlacesArr(): void {
    this.canvas.forEachObject((obj: fabric.Object) => {
      if (obj?.name === EDITOR_NAMES.place) {
        let { id: placeId, placeType, number: placeNumber, maxQuantity } = obj.data;
        // let isDenied: boolean = !(!this.canBookAdministration && placeType === PlaceRole.constant);

        if (!(!this.canBookAdministration && placeType === PlaceRole.constant)) {
          const newPl: BookingStateOnUI = {
            placeId,
            placeNumber,
            placeType,
            maxQuantity,
            isFree: true,
            nameOfUser: null
          };
          this.currentBookingArr.push(newPl);
        }
      }
    });
  }

  activateTimer() {
    let start = environment.TIMER_ON_BOOKING;
    this.countDown = timer(0, 1000).pipe(
      map(count => start - count),
      tap(count => count === 0 ? this.onClosePlace() : null),
      takeWhile(count => count >= 0)
    );
    this.changeDetection.detectChanges();
  }

  setDataOfClickedPlace(obj: fabric.Object) {
    let { id: placeId, number: placeNumber } = obj.data;
    const currentBooking: BookingStateOnUI = this.getCurrentBookingPlaceData(placeId);
    if (currentBooking) {
      this.currentBookingPlace.placeData = { ...currentBooking, placeId, placeNumber };
      this.changeDetection.detectChanges();
    }
  }

  doShadowForPlace(obj: fabric.Object): void {
    const currentPlace: BookingStateOnUI = this.getCurrentBookingPlaceData(obj.data.id);
    if (currentPlace) {
      let shadow = currentPlace.isFree ? '3px 3px 12px rgba(0,255,0,0.7)' : '3px 3px 12px rgba(255,0,0,0.7)';
      obj.setShadow(shadow);
      this.canvas.requestRenderAll();
    }
  }

  getCurrentBookingPlaceData(id: string): BookingStateOnUI {
    return this.currentBookingArr.filter((item: BookingStateOnUI) => item.placeId === id)[0];
  }

  onInformClick(): void {

  }

  onBookingClick(): void {
    // ToDo need check place first is free
    if (!!this.currentBookingPlace.placeData) {
      let [placeId, userId] = [this.currentBookingPlace.placeData.placeId, this.userData.id];
      this.bookedPlaceForId.emit({ placeId, userId });
    }
  }

  drawBookingsOnPlaces(): void {
    this.clearMarkOnPlaces();

    this.canvas.forEachObject((obj: fabric.Object) => {
      if (obj?.name === EDITOR_NAMES.place) {
        const bound = obj.getBoundingRect();
        const currentPlace: BookingStateOnUI = this.getCurrentBookingPlaceData(obj.data.id);
        if (currentPlace) {
          let stroke = currentPlace.isFree ? 'lightgreen' : 'lightgrey';
          const rect = this.createBorderBoxForPlace(bound, stroke);

          rect.name = 'temp';
          this.canvas.add(rect);
        }
      }
      this.canvas.requestRenderAll();

    });
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
      selectable: false
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
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.READ_ONLY);
    this.doCanvasZoom();
  }
}
