import {
  animate,
  query,
  sequence,
  style,
  transition,
  trigger
} from "@angular/animations";

export const sidebarAnimation =

  trigger('sidebarAnimation', [

    transition(':enter', [
      sequence([
        query('div', [
          style({left: '-16%'})
        ]),
        style({ opacity: 0 }),
        animate('160ms ease'),
        query('div', [
          animate('170ms ease', style({left: '0'}))
        ]),
      ]),
    ]),

    transition(':leave', [
      sequence([
        query('div', [
          animate('200ms ease-out', style({ left: '-16%' }))
        ]),
        animate('170ms ease'),
        style({ opacity: 0 }),
      ]),
    ])

  ])
