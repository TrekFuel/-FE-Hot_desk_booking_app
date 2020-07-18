import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { CANVAS_OPTION } from './canvas-option';
import { BehaviorSubject } from 'rxjs';
import { editorBlocks } from './editorBlocksInfo';
import { CanvasSize } from './models/canvas-size.model';
import { EditorBlocks } from './models/editor-blocks.model';

@Component({
  selector: 'app-rooms-management-edit',
  templateUrl: './rooms-management-edit.component.html',
  styleUrls: ['./rooms-management-edit.component.scss'],
})
export class RoomsManagementEditComponent implements OnInit, OnDestroy {

  @ViewChild('htmlCanvas', {static: true}) htmlCanvas: ElementRef;
  private canvas: fabric.Canvas;
  public canvasSize: CanvasSize = {
    width: 500,
    height: 500,
    zoom: 100,
  };

  get curZoom() {
    return this.canvasSize.zoom / 100;
  }

  editorBlocks: EditorBlocks[] = editorBlocks;
  blockedElements: string[] = [];

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, CANVAS_OPTION.FOR_EDIT);
    this.doCanvasZoom();
    this.canvas.on({
      'object:selected': (e) => {
        // console.log('object:selected');
        const selectedObject = e.target;
        if (this.blockedElements.includes(selectedObject?.name)) {
          console.log('lock-obj-detected');
          this.canvas.discardActiveObject();
          this.canvas.renderAll();
          return;
        }
      },
      'object:moving': (e) => {
        // console.log('object:moving');
      },
      'mouse:over': (e) => {
        const obj = e.target;
      },
      'mouse:out': (e) => {
        const obj = e.target;
      },
      'mouse:down:before': (e) => {
        // console.log('mousedown:before');
        const obj = e.target;
        if (this.blockedElements.includes(obj?.name)) {
          console.log('lock-obj-detected');
          this.canvas.discardActiveObject();
          this.canvas.renderAll();
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
      });
      this.extendObj(image, type === 'Places');
      image.name = type;
      this.canvas.add(image);
      this.canvas.renderAll();
    });
  }

  extendObj(obj, full = false) {
    obj.toObject = ((toObject) => {
      return function () {
        return full
          ? fabric.util.object.extend(toObject.call(this), {
            name: this.name,
            data: this.data
          })
          : fabric.util.object.extend(toObject.call(this), {
            name: this.name,
          });
      };
    })(obj.toObject);
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
      this.canvas.discardActiveObject();
    }
    this.canvas.renderAll();
  }


  // UI methods
  onBlockElementClick(element: string) {
    if (!!element) {
      if (this.blockedElements.includes(element)) {
        this.blockedElements.splice(this.blockedElements.indexOf(element), 1);
      } else {
        this.blockedElements.push(element);
      }
    }
    this.doLockElements();
  }

  ngOnDestroy(): void {
    this.canvas.off();
  }
}
