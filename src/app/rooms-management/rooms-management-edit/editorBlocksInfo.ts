import { EditorBlocks } from './models/editor-blocks.model';

export const editorBlocks: EditorBlocks[] = [
  {
    name: 'Room elements',
    urls: [
      {
        title: 'Big rectangle room',
        src: '../assets/editor-images/room-elements/rect-room.svg',
      },
      {
        title: 'Big square room',
        src: '../assets/editor-images/room-elements/square-room.svg',
      },
    ],
  },
  {
    name: 'Walls',
    urls: [
      {
        title: 'wall',
        src: '../assets/editor-images/room-elements/wall.svg',
      },
      {
        title: 'L-wall',
        src: '../assets/editor-images/room-elements/l-wall.svg',
      },
      {
        title: 'P-wall',
        src: '../assets/editor-images/room-elements/p-wall.svg',
      },
    ],
  },
  {
    name: 'Doors & windows',
    urls: [
      {
        title: 'Door',
        src: '../assets/editor-images/door&window/door.svg',
      },
      {
        title: 'Double door',
        src: '../assets/editor-images/door&window/door_x_2.svg',
      },
      {
        title: 'Window',
        src: '../assets/editor-images/door&window/window-big.svg',
      },
    ],
  },
];
