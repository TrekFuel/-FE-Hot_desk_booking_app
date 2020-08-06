import { CanvasSize } from './models/editor-blocks.models';

export const CANVAS_OPTION = {
  FOR_EDIT: {
    hoverCursor: 'move',
    selection: true,
    selectionBorderColor: 'blue',
    allowTouchScrolling: true,
    backgroundColor: 'white',
  },
  READ_ONLY: {
    hoverCursor: 'default',
    selection: false,
    selectionBorderColor: 'white',
    allowTouchScrolling: true,
    backgroundColor: 'white',
  },
};

export const CANVAS_DEFAULT: CanvasSize = {
  width: 500,
  height: 500,
  zoom: 100
};
