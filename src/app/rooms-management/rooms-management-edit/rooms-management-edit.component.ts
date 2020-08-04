import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { fabric } from 'fabric';
import { CANVAS_OPTION } from './canvas-option';
import { EDITOR_NAMES, editorBlocks, PLACES_TITLES } from './editor-blocks-info';
import { PlaceData, PlaceRole } from '../../shared/models/map-data.model';
import { Canvas } from 'fabric/fabric-impl';
import { environment } from '../../../environments/environment';
import { CanvasSize, Confroom, CurrentPlaceInEditor, EditorBlock } from './models/editor-blocks.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms-management-edit',
  templateUrl: './rooms-management-edit.component.html',
  styleUrls: ['./rooms-management-edit.component.scss'],
})
export class RoomsManagementEditComponent implements OnInit, OnDestroy {

  private static canvas: Canvas;

  @ViewChild('htmlCanvas', { static: true }) htmlCanvas: ElementRef;
  @ViewChild('clone', { static: true, read: ElementRef }) btnClone: ElementRef;
  @ViewChild('close', { static: true, read: ElementRef }) btnClose: ElementRef;
  @ViewChild('cardForPlace', { static: true }) cardForPlace: ElementRef;
  public canvasSize: CanvasSize = {
    width: 500,
    height: 500,
    zoom: 100
  };
  placesData: PlaceData[] = [];
  placeRole = PlaceRole;
  editorBlocks: EditorBlock[] = editorBlocks;
  blockedElements: string[] = [];
  activeElementOnCanvas: { clone: boolean, close: boolean } = { clone: false, close: false };
  confroom: Confroom = {
    default: environment.places.MAX_DEFAULT_QUANTITY_IN_CONFROOM,
    min: environment.places.MIN_QUANTITY_IN_CONFROOM,
    max: environment.places.MAX_QUANTITY_IN_CONFROOM
  };
  currentPlace: CurrentPlaceInEditor = {
    isPlaceHovered: false,
    isPlaceClickedToClose: false,
    placeData: null
  };
  formMaxQuantity: FormGroup;
  currentNumber: number = 0;

  // variables for container
  @Output() handlePlaces: EventEmitter<PlaceData[]> = new EventEmitter<PlaceData[]>();

  constructor(private renderer: Renderer2) {
  }

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  get maxQuantityState() {
    return this.formMaxQuantity.get('maxQuantity');
  }

  static putDataReturnMap(placeDataArr: PlaceData[]): string {
    RoomsManagementEditComponent.canvas.forEachObject((obj: fabric.Object) => {
      if (obj?.name === EDITOR_NAMES.place) {
        let oldId: string = obj.data.id;
        let placeWithOldId: PlaceData = placeDataArr.find((item: PlaceData) => item.oldId === oldId);
        obj.data.id = placeWithOldId.id;
      }
    });
    return JSON.stringify(this.canvas);
  }

  @HostListener('window:resize') onResize() {
    this.activeElementOnCanvas.clone = this.activeElementOnCanvas.close = false;
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.discardActObj();
        RoomsManagementEditComponent.canvas.requestRenderAll();
        break;
      case 'Delete':
        this.onDelete();
        break;
      default:
        return;
    }
  }

  ngOnInit(): void {
    RoomsManagementEditComponent.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.FOR_EDIT);
    this.doCanvasZoom();

    RoomsManagementEditComponent.canvas.on({
      'object:added': (e) => {
        this.hidePlaceData();
      },
      'object:selected': (e) => {
        const actObj: fabric.Object = e.target;
        if (!this.blockedElements.includes(actObj?.name)) {
          this.positioningCloneAndClose(actObj);
        }

      },
      'object:moving': (e) => this.positioningCloneAndClose(e.target),
      'object:scaling': (e) => this.positioningCloneAndClose(e.target),
      'object:rotating': (e) => this.positioningCloneAndClose(e.target),
      'selection:created': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj) {
          this.objSetStyle(actObj, actObj.left, actObj.top);
          this.positioningCloneAndClose(actObj);
          this.hidePlaceData();
        }
      },
      'selection:cleared': (e) => this.activeElementOnCanvas.clone = this.activeElementOnCanvas.close = false,
      'mouse:over': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place && RoomsManagementEditComponent.canvas.getActiveObjects().length <= 1) {
          this.currentPlace.isPlaceHovered = true;
          this.currentPlace.placeData = actObj.data;
        }
      },
      'mouse:out': (e) => {
        // const actObj: fabric.Object = e.target;
      },
      'mouse:down': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          this.currentPlace.isPlaceClickedToClose = false;
          this.currentPlace.placeData = actObj.data;
        } else {
          this.hidePlaceData();
        }
      },
      'mouse:down:before': (e) => this.blockedElements.includes(e.target?.name) ? this.discardActObj()
        : this.positioningCloneAndClose(e.target)
    });

    this._initForm();
  }

  doCanvasZoom(zoom: number = this.canvasSize.zoom): void {
    this.canvasSize.zoom = zoom;
    RoomsManagementEditComponent.canvas.setWidth(this.canvasSize.width * this.curZoom);
    RoomsManagementEditComponent.canvas.setHeight(this.canvasSize.height * this.curZoom);
    RoomsManagementEditComponent.canvas.setZoom(this.curZoom);
    const actObj = RoomsManagementEditComponent.canvas.getActiveObject();
    if (actObj) {
      this.positioningCloneAndClose(actObj);
    }
  }

  onClickAddElementOnCanvas(event: MouseEvent, type: string, title: string): void {
    const el: HTMLImageElement = (event.target as HTMLImageElement);
    fabric.loadSVGFromURL(el.src, (objects, options) => {
      const addedObj: fabric.Object = fabric.util.groupSVGElements(objects, options);
      let role: PlaceRole;
      if (type === EDITOR_NAMES.place) {
        let typeOfPlace: string = Object.keys(PLACES_TITLES).filter((key: string) => PLACES_TITLES[key] === title)[0];
        role = PlaceRole[typeOfPlace];
      }
      this.addElementOnCanvas(addedObj, type, role);
    });
  }

  addElementOnCanvas(obj: fabric.Object,
                     type: string,
                     typeOfPlace?: PlaceRole,
                     adjustStyle?: number): void {
    // add style
    !adjustStyle ? this.objSetStyle(obj) : this.objSetStyle(obj, obj.left + adjustStyle, obj.top + adjustStyle);
    // extend object with additional object name and data
    if (type === EDITOR_NAMES.place) {
      this.extendObj(obj, true);
      obj.data = { ...this.createNewDataForPlace(obj, typeOfPlace) };
    } else {
      this.extendObj(obj, false);
    }
    obj.name = type;
    // add clone&close and add element on canvas
    this.positioningCloneAndClose(obj);
    this.addAndRender(obj);
  }

  extendObj(obj: fabric.Object, full: boolean = false): void {
    obj.toObject = ((toObject) => {
      return function() {
        return full
          ? fabric.util.object.extend(toObject.call(this), {
            name: this.name,
            data: this.data
          })
          : fabric.util.object.extend(toObject.call(this), {
            name: this.name
          });
      };
    })(obj.toObject);
  }

  // logik with place data
  createNewDataForPlace(newObj: fabric.Object, role: PlaceRole): PlaceData {
    let number: number = this.generateNumber();
    let id = this.generateId();
    const placeData: PlaceData = { id, placeType: role, number };
    if (role === PlaceRole.confroom) {
      placeData.maxQuantity = environment.places.MAX_DEFAULT_QUANTITY_IN_CONFROOM;
    } else {
      // default value
      placeData.maxQuantity = 1;
    }
    this.placesData.push(placeData);
    return placeData;
  }

  generateNumber(): number {
    return ++this.currentNumber;
  }

  generateId(): string {
    return `${Date.now().toString()}-${(Math.round(Math.random() * 899) + 100).toString()}`;
  }

  // UI method
  onClone(): void {
    const activeObj: fabric.Object = RoomsManagementEditComponent.canvas.getActiveObject();
    if (activeObj.type === 'activeSelection') {
      return;
    }
    activeObj.clone((clonedObj: fabric.Object) => {
      let type: string = clonedObj.name;
      let placeRole: PlaceRole = clonedObj.data?.placeType;
      this.addElementOnCanvas(clonedObj, type, placeRole, 10);
    });
  }

  onDelete(): void {
    const actObjs: fabric.Object[] = RoomsManagementEditComponent.canvas.getActiveObjects();
    if (actObjs) {
      actObjs.forEach((actObj: fabric.Object) => {
        if (!this.blockedElements.includes(actObj.name)) {
          if (actObj.name === EDITOR_NAMES.place) {
            this.placesData = this.placesData.filter((place: PlaceData) => place.id !== actObj.data.id);
          }
          RoomsManagementEditComponent.canvas.remove(actObj);
        }
      });
      this.discardActObj();
      RoomsManagementEditComponent.canvas.requestRenderAll();
    }
  }

  objSetStyle(obj: fabric.Object, left: number = 30, top: number = 30): void {
    let borderColor: string, padding: number;
    obj.type === 'activeSelection' ? [borderColor, padding] = ['red', 3] : [borderColor, padding] = ['lightblue', 1];
    obj.set({
      left,
      top,
      cornerSize: 8,
      cornerStyle: 'circle',
      cornerColor: 'blue',
      transparentCorners: false,
      perPixelTargetFind: true,
      borderColor,
      padding
    });
  }

  addAndRender(obj: fabric.Object): void {
    RoomsManagementEditComponent.canvas.add(obj);
    RoomsManagementEditComponent.canvas.setActiveObject(obj);
    this.currentPlace.placeData = obj.data;
    RoomsManagementEditComponent.canvas.requestRenderAll();
  }

  positioningCloneAndClose(obj: fabric.Object): void {
    if (obj) {
      if (obj.type === 'activeSelection') {
        this.activeElementOnCanvas.clone = false;
        this.activeElementOnCanvas.close = true;
      } else {
        this.activeElementOnCanvas.clone = this.activeElementOnCanvas.close = true;
      }
      // top left absolute position of canvas
      let { x: canvasX, y: canvasY } = this.htmlCanvas.nativeElement.getBoundingClientRect();
      // do adjustment on window scroll
      canvasX += window.scrollX;
      canvasY += window.scrollY;
      obj.setCoords();
      // top left absolute position of object
      let { left: objX, top: objY, width: objWidth } = obj.getBoundingRect();
      // adjustment if thin object
      let adjustment: number = 0;
      if (objWidth < 25) {
        adjustment = 25 - objWidth;
      }
      // move icons a little left and up
      objX -= 12;
      objY -= 35;
      // calculate and set position of icons
      this.renderer.setStyle(this.btnClone?.nativeElement, 'left', (canvasX + objX - adjustment) + 'px');
      this.renderer.setStyle(this.btnClone?.nativeElement, 'top', (canvasY + objY) + 'px');
      this.renderer.setStyle(this.btnClose?.nativeElement, 'left', (canvasX + (objX + objWidth) + adjustment) + 'px');
      this.renderer.setStyle(this.btnClose?.nativeElement, 'top', (canvasY + objY) + 'px');
    }
  }

  onSubmitMaxQuantity(): void {
    let maxQuantity: number = this.formMaxQuantity.value.maxQuantity;
    this.currentPlace.placeData['maxQuantity'] = maxQuantity;
    this.placesData.some((place: PlaceData) => place.id === this.currentPlace.placeData.id
      ? place['maxQuantity'] = maxQuantity : false);
  }

  onSaveClick(): void {
    // const mapData: string = JSON.stringify(this.canvas);
    // const officeFull: OfficeFullModel = {
    //   officeAddress: {
    //     country: 'Belarus',
    //     city: 'Grodno',
    //     address: 'Somewhere str. 1'
    //   },
    //   map: {
    //     mapData,
    //     placesData: this.placesData
    //   }
    // };

    // console.log(officeFull);
    // -------------- NEW ---------

    console.log(this.placesData);
    this.handlePlaces.emit(this.placesData);


    // // const obj = this.canvas.toObject();
    // const dataJSON: string = JSON.stringify(this.canvas);
    // // console.log(JSON.stringify(datalessJSON));
    // // console.log(JSON.stringify(this.canvas));
    // console.log(dataJSON);
    // this.canvas.clear();
    //
    // setTimeout(() => {
    //   this.canvas.loadFromJSON(dataJSON, () => {
    //     this.canvas.renderAll();
    //     console.log('this.canvas.item(0).name: ' + (this.canvas as any).item(0)?.name);
    //     console.log('this.canvas.item(0).data: ' + (this.canvas as any).item(0)?.data?.id);
    //   });
    // }, 3000);
  }

  doLockElements(): void {
    RoomsManagementEditComponent.canvas.forEachObject((obj: fabric.Object) => {
      let isCurrentObjLocked: boolean = this.blockedElements.includes(obj.name);
      obj.lockMovementX = isCurrentObjLocked;
      obj.lockMovementY = isCurrentObjLocked;
      obj.hasControls = !isCurrentObjLocked;
      obj.hasBorders = !isCurrentObjLocked;
      obj.selectable = !isCurrentObjLocked;
    });
  }

  onLockClick(element: string): void {
    if (!!element) {
      if (this.blockedElements.includes(element)) {
        this.blockedElements.splice(this.blockedElements.indexOf(element), 1);
      } else {
        this.blockedElements.push(element);
        this.discardActObj();
      }
    }
    this.doLockElements();
    RoomsManagementEditComponent.canvas.requestRenderAll();
  }

  discardActObj(): void {
    RoomsManagementEditComponent.canvas.discardActiveObject();
    this.hidePlaceData();
    this.activeElementOnCanvas.clone = this.activeElementOnCanvas.close = false;
  }

  hidePlaceData(): void {
    this.currentPlace.placeData = null;
    this.currentPlace.isPlaceHovered = false;
  }

  ngOnDestroy(): void {
    RoomsManagementEditComponent.canvas.off();
  }

  private _initForm() {
    this.formMaxQuantity = new FormGroup({
      maxQuantity: new FormControl(this.confroom.default, [
        Validators.min(this.confroom.min),
        Validators.max(this.confroom.max)
      ])
    });
  }
}
