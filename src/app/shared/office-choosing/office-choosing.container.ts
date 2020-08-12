import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SelectorsAddress, SelectorsModel } from '../models/selectors.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import {
  officeChoosingStartAction,
  officeChoosingStartCreateAddressAction
} from '../../store/actions/officeChoosing.action';
import { selectorsData } from '../../store/selectors/officeChosing.selectors';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { ChooseOffice, OfficeData } from '../models/choose-office.model';
import { OfficesDataSelectsInterface } from '../models/offices-data-selects.interface';
import {
  roomsManagementEditBlockSelectorsAction,
  roomsManagementEditUnblockSelectorsAction
} from '../../store/actions/roomsManagementEdit.action';
import { getBlockSelection } from '../../store/selectors/roomsManagementEdit.selector';

@Component({
  selector: 'office-choosing-container',
  template: `
    <app-office-choosing
        [canEditMode]="canEditMode"
        (onChooseOffice)="onChooseOffice($event)"
        [selectorsModel]="selectorsModel$ | async"
        [titleName]="titleName"
        [$blockSelection]="blockSelection$ | async"
        [$placeData]="placeData$ | async"
    >
    </app-office-choosing>
  `,
})
export class OfficeChoosingContainer implements OnInit, OnDestroy {
  public selectorsModel$: Observable<SelectorsModel> = this.store$.select(
    selectorsData
  );
  selectorsModelSubscription: Subscription;
  canEditMode: boolean = false;
  titleName: string;
  newOfficeData: OfficeData | null;
  blockSelection$: Observable<boolean>;
  placeData$: Observable<SelectorsAddress>;

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects),
        map((url: string) => url.split('?')[0]),
        map((url: string) => url.split('#')[0]),
        map((route: string) => route.split('/')[1]),
        tap(route => (this.canEditMode = route === 'rooms-management'))
      )
      .subscribe(route => this.setDataToRoute(route));

    this.placeData$ = this.route.queryParams.pipe(map((data: SelectorsAddress) => data));

    // Start action
    this.initStore();
  }

  ngOnInit() {
    this.store$.dispatch(new roomsManagementEditUnblockSelectorsAction({ blockSelection: false }));
    this.selectorsModelSubscription = this.selectorsModel$.subscribe(
      (data: SelectorsModel) => {
        if (!!data && !!this.newOfficeData) {
          const office: OfficeData = this.newOfficeData;
          // To PAVEL ---- if it is a new address we get addressId here!
          let addressId = this.getAddressIdByAddress(
            data.address,
            office.city,
            office.address
          );
          // console.log(`new address id  is: ${addressId}`);
          office[addressId] = addressId;
          this.existingOfficeHandle(office);
          this.newOfficeData = null;
        }
      }
    );
  }

  setDataToRoute(route: string) {
    switch (route) {
      case 'rooms-management':
        this.titleName = 'Create or edit office';
        break;
      case 'booking':
        this.titleName = 'Booking';
        break;
      default:
        this.titleName = 'Choosing';
        break;
    }
  }

  onChooseOffice(event: ChooseOffice): void {
    event.isNewObject
      ? this.newOfficeHandle(event.data)
      : this.existingOfficeHandle(event.data);
  }

  newOfficeHandle(officeData: OfficeData) {
    this.newOfficeData = { ...officeData };
    console.log(officeData);
    let [countryName, city, street]: string[] = [
      this.newOfficeData.country,
      this.newOfficeData.city,
      this.newOfficeData.address,
    ];
    const data: OfficesDataSelectsInterface = { countryName, city, street };
    this.store$.dispatch(
      new officeChoosingStartCreateAddressAction({ selectorData: data })
    );
    this.store$.dispatch(new roomsManagementEditBlockSelectorsAction({ blockSelection: true }));
  }

  existingOfficeHandle(officeData: OfficeData) {
    const queryParams: OfficeData = { ...officeData };
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams,
      // queryParamsHandling: 'merge', // remove to replace all query params by provided
      // replaceUrl: true // If we want to replace it in the history instead of adding new value there
    });
  }

  // return AddressId by City and Address from Array of Addresses
  getAddressIdByAddress(
    offices: SelectorsAddress[],
    city: string,
    address: string
  ): string {
    return offices.filter(
      (item: SelectorsAddress) =>
        item?.city === city && item?.address === address
    )[0].addressId;
  }

  // here all you need to retrieve the data
  initStore(): void {
    this.store$.dispatch(new officeChoosingStartAction());
    this.store$.dispatch(new roomsManagementEditUnblockSelectorsAction({ blockSelection: false }));

    this.blockSelection$ = this.store$.select(getBlockSelection);
  }

  ngOnDestroy(): void {
    this.selectorsModelSubscription.unsubscribe();
  }
}
