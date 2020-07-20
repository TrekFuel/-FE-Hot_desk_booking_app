import { EditorBlocks } from './models/editor-blocks.model';

export const EDITOR_NAMES: { [key: string]: string } = {
  room: 'Room`s elements',
  wall: 'Walls',
  doorAndWindow: 'Doors & windows',
  place: 'Places',
  confRoom: 'Confroom',
  other: 'Others elements'
};

export const editorBlocks: EditorBlocks[] = [
  {
    name: EDITOR_NAMES.room,
    urls: [
      {
        title: 'Small rectangle room',
        src: '../assets/editor-images/room-elements/rect-room.svg',
      },
      {
        title: 'Small square room',
        src: '../assets/editor-images/room-elements/square-room.svg',
      },
    ],
  },
  {
    name: EDITOR_NAMES.wall,
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
    name: EDITOR_NAMES.doorAndWindow,
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
        title: 'Horizontal window',
        src: '../assets/editor-images/door&window/window-horiz.svg'
      },
      {
        title: 'Vertical window',
        src: '../assets/editor-images/door&window/window-vert.svg'
      }
    ],
  },
  {
    name: EDITOR_NAMES.place,
    urls: [
      {
        title: 'Cowork place',
        src: '../assets/editor-images/places/cowork-place.svg'
      },
      {
        title: 'Cowork place var2',
        src: '../assets/editor-images/places/cowork-place2.svg'
      },
      {
        title: 'Cowork place var3',
        src: '../assets/editor-images/places/cowork-place3.svg'
      },
      {
        title: 'Cowork place var4',
        src: '../assets/editor-images/places/cowork-place4.svg'
      },
      {
        title: 'Cowork place var5',
        src: '../assets/editor-images/places/cowork-place5.svg'
      }
    ],
  },
  {
    name: EDITOR_NAMES.confRoom,
    urls: [
      {
        title: 'Confroom var1',
        src: '../assets/editor-images/confroom/confroom-sm.svg'
      },
      {
        title: 'Confroom var2',
        src: '../assets/editor-images/confroom/confroom-big.svg'
      }
    ]
  },
  {
    name: EDITOR_NAMES.other,
    urls: [
      {
        title: 'Water boiler',
        src: '../assets/editor-images/others/boiler.svg'
      },
      {
        title: 'Cupboard',
        src: '../assets/editor-images/others/cupboard.svg'
      },
      {
        title: 'WC',
        src: '../assets/editor-images/others/wc.svg'
      },
      {
        title: 'Plant',
        src: '../assets/editor-images/others/plant.svg'
      }
    ]
  }
];
