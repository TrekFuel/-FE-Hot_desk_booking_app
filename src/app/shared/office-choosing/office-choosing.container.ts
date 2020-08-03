import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectorsModel } from '../models/selectors.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { officeChoosingStartAction } from '../../store/actions/officeChoosing.action';
import { selectorsData } from '../../store/selectors/officeChosing.selectors';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { ChooseOffice } from '../models/choose-office.model';

@Component({
  selector: 'office-choosing-container',
  template: `
    <app-office-choosing [canEditMode]="canEditMode"
                         (onChooseOffice)="onChooseOffice($event)"
                         [selectorsModel]="selectorsModel$ | async">
    </app-office-choosing>
  `
})
export class OfficeChoosingContainer {
  public selectorsModel$: Observable<SelectorsModel>;
  canEditMode: boolean = false;
  @Output() roomEdit: EventEmitter<ChooseOffice> = new EventEmitter<ChooseOffice>();

  constructor(private store$: Store<AppState>, private router: Router, private route: ActivatedRoute) {
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

  onChooseOffice(event: ChooseOffice) {
    const queryParams = event.data;
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge' // remove to replace all query params by provided
      // replaceUrl: true // If we want to replace it in the history instead of adding new value there
    });
    console.log(queryParams);
    this.roomEdit.emit(event);
  }

  // here all you need to retrieve the data
  initStore(): void {
    this.store$.dispatch(new officeChoosingStartAction());
  }
}
