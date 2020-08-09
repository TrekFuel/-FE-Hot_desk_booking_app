import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const messageStateAnimation = trigger('messageStateAnimation', [
  state('start', style({ top: '3.9rem' })),
  state('end', style({ top: '-3.9rem' })),
  transition('start <=> *', animate('750ms ease-in-out')),
]);
