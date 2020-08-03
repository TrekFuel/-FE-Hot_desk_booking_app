import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectorsModel } from '../models/selectors.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { officeChoosingStartAction } from '../../store/actions/officeChoosing.action';
import { selectorsData } from '../../store/selectors/officeChosing.selectors';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'office-choosing-container',
  template: `
    <app-office-choosing [canEditMode]="canEditMode" [selectorsModel]="selectorsModel$ | async"></app-office-choosing>
  `
})
export class OfficeChoosingContainer {
  public selectorsModel$: Observable<SelectorsModel>;
  canEditMode: boolean = false;

  constructor(private store$: Store<AppState>, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
      map((url: string) => url.split('?')[0]),
      map((url: string) => url.split('#')[0]),
      map((route: string) => route.split('/')[1]),
      tap(route => this.canEditMode = (route === 'rooms-management'))
    ).subscribe();
    this.selectorsModel$ = this.store$.select(selectorsData);
    // Start action
    this.initStore();
  }

  // here all you need to retrieve the data
  initStore(): void {
    this.store$.dispatch(new officeChoosingStartAction());
  }
}
