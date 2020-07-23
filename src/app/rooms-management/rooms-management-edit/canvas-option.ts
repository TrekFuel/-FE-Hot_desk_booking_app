export const CANVAS_OPTION = {
  FOR_EDIT: {
    hoverCursor: 'move',
    selection: true,
    selectionBorderColor: 'blue',
    allowTouchScrolling: true,
    backgroundColor: 'white',
  },
  READ_ONLY: {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor: 'transparent',
    allowTouchScrolling: true,
    backgroundColor: 'white',
    hasControls: false,
    hasBorders: false,
    lockMovementX: true,
    lockMovementY: true,
    evented: true
  },
};
