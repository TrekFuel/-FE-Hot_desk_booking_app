import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { CANVAS_OPTION } from './canvas-option';
import { EDITOR_NAMES, editorBlocks, PLACES_TITLES } from './editorBlocksInfo';
import { EditorBlock } from './models/editor-blocks.model';
import { CanvasSize } from './models/canvas-size.model';
import { PlaceRole } from './models/place-role';
import { Canvas } from 'fabric/fabric-impl';
import { PlaceData } from './models/place-data.model';

@Component({
  selector: 'app-rooms-management-edit',
  templateUrl: './rooms-management-edit.component.html',
  styleUrls: ['./rooms-management-edit.component.scss']
})
export class RoomsManagementEditComponent implements OnInit, OnDestroy {

  @ViewChild('htmlCanvas', { static: true }) htmlCanvas: ElementRef;
  @ViewChild('clone', { static: true, read: ElementRef }) btnClone: ElementRef;
  @ViewChild('close', { static: true, read: ElementRef }) btnClose: ElementRef;
  public canvasSize: CanvasSize = {
    width: 500,
    height: 500,
    zoom: 100
  };
  editorBlocks: EditorBlock[] = editorBlocks;
  blockedElements: string[] = [];
  placeId: string = '';
  placeDisable: boolean = true;
  activeElementOnCanvas: { clone: boolean, close: boolean } = { clone: false, close: false };
  private canvas: Canvas;

  constructor(private renderer: Renderer2) {
  }

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  @HostListener('window:resize') onResize() {
    this.activeElementOnCanvas.clone = this.activeElementOnCanvas.close = false;
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.FOR_EDIT);

    this.doCanvasZoom();
    this.canvas.on({
      'object:added': (e) => {
      },
      'object:selected': (e) => {
        // console.log('object:selected');
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
        }
      },
      'selection:cleared': (e) => this.activeElementOnCanvas.clone = this.activeElementOnCanvas.close = false,
      'mouse:over': (e) => {
        const actObj: fabric.Object = e.target;
        if (actObj?.name === EDITOR_NAMES.place) {
          console.log(actObj.data);
        }
      },
      'mouse:out': (e) => {
        // const actObj: fabric.Object = e.target;
      },
      'mouse:down:before': (e) => this.blockedElements.includes(e.target?.name) ? this.discardActObj()
        : this.positioningCloneAndClose(e.target)
    });
  }

  doCanvasZoom(zoom: number = this.canvasSize.zoom): void {
    this.canvasSize.zoom = zoom;
    this.canvas.setWidth(this.canvasSize.width * this.curZoom);
    this.canvas.setHeight(this.canvasSize.height * this.curZoom);
    this.canvas.setZoom(this.curZoom);
    const actObj = this.canvas.getActiveObject();
    if (actObj) {
      this.positioningCloneAndClose(actObj);
    }
  }

  addElementOnCanvas(event: MouseEvent, type: string): void {
    const el: HTMLImageElement = (event.target as HTMLImageElement);
    fabric.loadSVGFromURL(el.src, (objects, options) => {
      const addedObj: fabric.Object = fabric.util.groupSVGElements(objects, options);
      this.objSetStyle(addedObj);
      if (type === EDITOR_NAMES.place) {
        this.extendObj(addedObj, true);
        this.createNewDataForPlace(addedObj, el.alt);
      } else {
        this.extendObj(addedObj, false);
      }
      addedObj.name = type;
      this.canvas.add(addedObj);
      this.canvas.setActiveObject(addedObj);
      this.positioningCloneAndClose(addedObj);
      this.canvas.renderAll();
    });
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
  createNewDataForPlace(obj: fabric.Object, type: string): void {
    let typeOfPlace: string = Object.keys(PLACES_TITLES).filter((key: string) => PLACES_TITLES[key] === type)[0];
    let role: PlaceRole = PlaceRole[typeOfPlace];
    this.addDataForPlace(obj, role);
  }

  addDataForPlace(obj, role, isFree = true) {
    let id: string = this.generateId();
    let placeData: PlaceData = { id, role, isFree };
    if (role === PlaceRole.confroom) {
      placeData.maxQuantity = 25;
    }
    obj.data = placeData;
    console.log(obj.data);
  }

  // ToDo need more secure id
  generateId(): string {
    return `BEGR-${Date.now().toString()}-${(Math.round(Math.random() * 899) + 100).toString()}`;
  }

  // UI method
  onClone(): void {
    const activeObj: fabric.Object = this.canvas.getActiveObject();
    if (activeObj.type === 'activeSelection') {
      return;
    }
    activeObj.clone((clonedObj: fabric.Object) => {
      let role: PlaceRole = activeObj.data?.role;
      this.canvas.discardActiveObject();
      this.objSetStyle(clonedObj, clonedObj.left + 10, clonedObj.top + 10);
      // add data for place
      if (clonedObj.name === EDITOR_NAMES.place) {
        clonedObj.data.id = this.generateId();
        clonedObj.data.role = role;
        clonedObj.data.isFree = true;
        if (role === PlaceRole.confroom) {
          clonedObj.data.maxQuantity = 25;
        }
      }
      this.canvas.add(clonedObj);
      this.canvas.setActiveObject(clonedObj);
      this.canvas.requestRenderAll();
    });
  }

  onClose(): void {
    const actObjs: fabric.Object[] = this.canvas.getActiveObjects();
    if (actObjs) {
      actObjs.forEach((actObj: fabric.Object) => {
        if (!this.blockedElements.includes(actObj.name)) {
          this.canvas.remove(actObj);
        }
      });
      this.discardActObj();
      this.canvas.requestRenderAll();
    }
  }

  objSetStyle(obj: fabric.Object, left: number = 20, top: number = 20): void {
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

  onSelected(value: string | undefined): void {
    console.log(value);
  }

  onSaveClick(): void {
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

  inputPlaceId(value: string): void {
    this.placeId = value;
  }

  doLockElements(): void {
    this.canvas.forEachObject((obj: fabric.Object) => {
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
    this.canvas.requestRenderAll();
  }

  discardActObj(): void {
    this.canvas.discardActiveObject();
    this.activeElementOnCanvas.clone = this.activeElementOnCanvas.close = false;
  }

  ngOnDestroy(): void {
    this.canvas.off();
  }
}
