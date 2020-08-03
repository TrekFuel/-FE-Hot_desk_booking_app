import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const messageStateAnimation = trigger('messageStateAnimation', [
  state('start', style({ top: '3.9375rem' })),
  state('end', style({ top: '-3.9375rem' })),
  transition('start <=> *', animate('750ms ease-in-out')),
]);
