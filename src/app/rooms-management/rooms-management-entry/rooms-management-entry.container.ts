import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms-management-entry-container',
  template: `
    <app-rooms-management-entry [$blockSelection]="blockSelection$ | async"></app-rooms-management-entry>`,
  styleUrls: ['./rooms-management-entry.component.scss']
})
export class RoomsManagementEntryContainer {
  blockSelection$: Observable<boolean>;

  constructor(public router: ActivatedRoute, private store$: Store<AppState>) {
    this.initStore();
  }

  initStore(): void {
    this.blockSelection$ = this.store$.select(getBlockSelection);
  }

}
