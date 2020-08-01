import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectorsModel } from '../models/selectors.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { officeChoosingStartAction } from '../../store/actions/officeChoosing.action';
import { selectorsData } from '../../store/selectors/officeChosing.selectors';

@Component({
  selector: 'office-choosing-container',
  template: `
    <app-office-choosing [selectorsModel]="selectorsModel$ | async"></app-office-choosing>
  `
})
export class OfficeChoosingContainer {
  public selectorsModel$: Observable<SelectorsModel>;

  constructor(private store$: Store<AppState>) {
    this.selectorsModel$ = this.store$.select(selectorsData);
    // Start action
    this.initStore();
  }

  // here all you need to retrieve the data
  initStore(): void {
    this.store$.dispatch(new officeChoosingStartAction());
  }
}
