import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms-management-entry-container',
  template: `
    <app-rooms-management-entry [$blockSelection]="blockSelection$ | async"></app-rooms-management-entry>`,
  styleUrls: ['./rooms-management-entry.component.scss']
})
export class RoomsManagementEntryContainer {
  blockSelection$: Observable<boolean>;

  // blockSelection$ = true;

  constructor(public router: ActivatedRoute, private store$: Store<AppState>) {
    this.initStore();
  }

  initStore(): void {
    console.log('store');
    this.blockSelection$ = this.store$.select(getBlockSelection).pipe(
      tap(console.log)
    );

  }

}
