import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { CANVAS_OPTION } from './canvas-option';
import { EDITOR_NAMES, editorBlocks } from './editorBlocksInfo';
import { CanvasSize } from './models/canvas-size.model';
import { EditorBlocks } from './models/editor-blocks.model';
import { PlaceData } from './models/place-data.model';
import { PlaceRole } from './models/place-role';

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
  editorBlocks: EditorBlocks[] = editorBlocks;
  blockedElements: string[] = [];
  placeId: string = '';
  placeDisable: boolean = true;
  activeElementOnCanvas: boolean = true;

  private canvas: fabric.Canvas;

  constructor(private renderer: Renderer2) {
  }

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.FOR_EDIT);
    this.doCanvasZoom();
    this.canvas.on({
      'object:selected': (e) => {
        console.log('object:selected');
        const selectedObject = e.target;
        if (this.blockedElements.includes(selectedObject?.name)) {
          this.discardActiveObject();
          return;
        }
        this.activeElementOnCanvas = true;
        this.positioningCloneAndClose(selectedObject);
      },
      'object:moving': (e) => {
        // console.log('object:moving');
      },
      'mouse:over': (e) => {
        const obj = e.target;
        if (obj?.name === EDITOR_NAMES.place || obj?.name === EDITOR_NAMES.confRoom)
          console.log(obj?.data.id);
      },
      'mouse:out': (e) => {
        const obj = e.target;
      },
      'mouse:down:before': (e) => {
        // console.log('mousedown:before');
        const curObj = e.target;
        if (this.blockedElements.includes(curObj?.name)) {
          this.discardActiveObject();
          return;
        }
      }
    });
  }

  doCanvasZoom(zoom: number = this.canvasSize.zoom): void {
    this.canvasSize.zoom = zoom;
    this.canvas.setWidth(this.canvasSize.width * this.curZoom);
    this.canvas.setHeight(this.canvasSize.height * this.curZoom);
    this.canvas.setZoom(this.curZoom);
  }

  addElementOnCanvas(event: MouseEvent, type: string): void {
    const el: HTMLImageElement = (event.target as HTMLImageElement);
    fabric.loadSVGFromURL(el.src, (objects, options) => {
      const image = fabric.util.groupSVGElements(objects, options);
      image.set({
        left: 20,
        top: 20,
        cornerSize: 8,
        cornerStyle: 'circle',
        cornerColor: 'blue',
        transparentCorners: false
      });


      let isPlaces: boolean = (type === EDITOR_NAMES.place || type === EDITOR_NAMES.confRoom);
      this.extendObj(image, isPlaces);
      image.name = type;
      if (isPlaces) {
        console.log(el.alt);
        this.addDataToPlace(image);
      }
      this.canvas.add(image);
      this.canvas.setActiveObject(image);
      this.activeElementOnCanvas = true;
      // console.log(this.canvas.getActiveObject());
      this.canvas.renderAll();
    });
  }

  extendObj(obj: fabric.Object, full: boolean = false) {
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
  addDataToPlace(obj: fabric.Object) {
    const placeData: PlaceData = {
      id: 'some_Id',
      role: PlaceRole.cowork
    };
    obj.data = placeData;
  }

  // UI method
  positioningCloneAndClose(obj: fabric.Object) {
    let coords = obj.getCoords(true);
    console.log(this.btnClone.nativeElement);
    console.log(this.htmlCanvas.nativeElement);
    // this.renderer.setStyle(this.btnClone?.nativeElement, 'left', 100 + 'px');


    // this.btnClone.style.left = (absCoords.left - btnWidth / 2) + 'px';
    // this.btnClone.style.top = (absCoords.top - btnHeight / 2) + 'px';
  }

  onSelected(value: string | undefined) {
    console.log(value);
  }

  inputPlaceId(value: string) {
    this.placeId = value;
  }

  doLockElements() {
    this.canvas.forEachObject(obj => {
      let isCurrentObjLocked: boolean = this.blockedElements.includes(obj.name);
      obj.lockMovementX = isCurrentObjLocked;
      obj.lockMovementY = isCurrentObjLocked;
      obj.hasControls = !isCurrentObjLocked;
      obj.hasBorders = !isCurrentObjLocked;
    });
    if (this.blockedElements.includes(this.canvas.getActiveObject()?.name)) {
      this.activeElementOnCanvas = false;
      this.canvas.discardActiveObject();
    }
    this.canvas.renderAll();
  }

  onLockClick(element: string) {
    if (!!element) {
      if (this.blockedElements.includes(element)) {
        this.blockedElements.splice(this.blockedElements.indexOf(element), 1);
      } else {
        this.blockedElements.push(element);
        this.activeElementOnCanvas = false;
      }
    }
    this.doLockElements();
  }

  discardActiveObject() {
    this.canvas.discardActiveObject();
    this.activeElementOnCanvas = false;
    this.canvas.renderAll();
  }

  ngOnDestroy(): void {
    this.canvas.off();
  }
}
