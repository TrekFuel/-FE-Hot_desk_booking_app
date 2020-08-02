import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MyErrorStateMatcher, ValidateSameName } from '../validators/same-name.validator';
import { SelectorsName } from './selectors-name';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectorsAddress, SelectorsCity, SelectorsModel } from '../models/selectors.model';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-office-choosing',
  templateUrl: './office-choosing.component.html',
  styleUrls: ['./office-choosing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficeChoosingComponent implements OnInit, OnDestroy {

  @Input() selectorsModel: SelectorsModel;
  SelectorsName = SelectorsName;
  selectOfficeForm: FormGroup;
  countrySubscription: Subscription;
  citySubscription: Subscription;
  addressSubscription: Subscription;
  currentFocus: string = SelectorsName.country;
  checkingInputNames: string[] = [];

  // variables for edit only here
  matcher = new MyErrorStateMatcher();
  newSelected: string | null = null;
  newCountry: string[] = [];
  newCity: SelectorsCity[] = [];
  newAddress: SelectorsAddress[] = [];
  // ------------------

  canEditMode = false;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public get countryOptions(): string[] {
    return this.canEditMode ? [SelectorsName.new, ...this.selectorsModel.country, ...this.newCountry]
      : [...this.selectorsModel.country];
  }

  public get cityOptions(): string[] {
    const city = [];
    if (!!this.country.value) {
      const commonCity: SelectorsCity[] = [...this.selectorsModel.city, ...this.newCity];
      commonCity.forEach((item: SelectorsCity) => {
        if (item.country === this.country.value) {
          city.push(item.city);
        }
      });
      if (this.canEditMode && this.country.value !== SelectorsName.new) {
        city.unshift(SelectorsName.new);
      }
    }
    return Array.from(new Set(city));
  }

  public get addressOptions(): string[] {
    const address = [];
    if (!!this.city.value) {
      const commonAddress: SelectorsAddress[] = [...this.selectorsModel.address, ...this.newAddress];
      commonAddress.forEach((item: SelectorsAddress) => {
        if (item.city === this.city.value) {
          address.push(item.address);
        }
      });
      if (this.canEditMode && this.country.value !== SelectorsName.new && this.city.value !== SelectorsName.new) {
        address.unshift(SelectorsName.new);
      }
    }
    return Array.from(new Set(address));
  }

  public get country(): AbstractControl {
    return this.selectOfficeForm?.get('country');
  }

  public get city(): AbstractControl {
    return this.selectOfficeForm?.get('city');
  }

  public get address(): AbstractControl {
    return this.selectOfficeForm?.get('address');
  }

  public get inputNew(): AbstractControl {
    return this.selectOfficeForm?.get('inputNew');
  }

  ngOnInit() {
    this._initChoosingForm();

    this.countrySubscription = this.country.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => this.selectOfficeForm.patchValue({ city: null, address: null }))
    )
      .subscribe((country: string) => this.canEditMode ?
        this.onChoosing(SelectorsName.country, country === SelectorsName.new, this.countryOptions)
        : this.moveFocusFrom(SelectorsName.country));

    this.citySubscription = this.city.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => this.selectOfficeForm.patchValue({ address: null }))
    )
      .subscribe((city: string) => this.canEditMode ?
        this.onChoosing(SelectorsName.city, city === SelectorsName.new, this.cityOptions)
        : this.moveFocusFrom(SelectorsName.city));

    this.addressSubscription = this.address.valueChanges.pipe(
      distinctUntilChanged()
    )
      .subscribe((address: string) => this.canEditMode ?
        this.onChoosing(SelectorsName.address, address === SelectorsName.new, this.addressOptions)
        : this.moveFocusFrom(SelectorsName.address));
  }

  getAddressIdByAddress(): string {
    return (this.selectOfficeForm.valid && this.address.value !== SelectorsName.new) ?
      [...this.selectorsModel.address, ...this.newAddress]
        .filter((item: SelectorsAddress) => item?.city === this.city.value && item?.address === this.address.value)[0].addressId
      : environment.ERROR_ON_GETTING_ADDRESS_ID;
  }

  onChoosing(source: string, isNew: boolean, options: string[]): void {
    this.checkingInputNames = [...options];
    this.toggleInputValidators(isNew);
    if (isNew) {
      this.inputNew.enable();
      this.newSelected = source;
      this.currentFocus = SelectorsName.new;
    } else {
      this.checkingInputNames = [];
      this.inputNew.disable();
      this.newSelected = null;
      this.moveFocusFrom(source);
    }
  }

  moveFocusFrom(source: string): void {
    if (source === SelectorsName.country) this.currentFocus = SelectorsName.city;
    if (source === SelectorsName.city) this.currentFocus = SelectorsName.address;
    if (source === SelectorsName.address) this.currentFocus = SelectorsName.choose;
  }

  onInputMessage(source: string, event): void {
    event.preventDefault();
    let value: string = event.target.value;
    switch (source) {
      case this.SelectorsName.country:
        this.newCountry.push(value);
        this.selectOfficeForm.patchValue({ country: value, inputNew: '' });
        this.currentFocus = SelectorsName.city;
        break;
      case this.SelectorsName.city:
        const newCity: SelectorsCity = { city: value, country: this.country.value };
        this.newCity.push(newCity);
        this.selectOfficeForm.patchValue({ city: value, inputNew: '' });
        this.currentFocus = SelectorsName.address;
        break;
      case this.SelectorsName.address:
        const newAddress: SelectorsAddress = {
          city: this.city.value,
          address: value,
          addressId: environment.TEMP_ADDRESS_ID_FOR_NEW_OFFICE
        };
        this.newAddress.push(newAddress);
        this.selectOfficeForm.patchValue({ address: value, inputNew: '' });
        this.currentFocus = SelectorsName.choose;
        break;
      default:
        break;
    }
  }

  toggleInputValidators(enable: boolean): void {
    const inputValidators: ValidatorFn[] = [
      Validators.required,
      ValidateSameName(this.checkingInputNames)
    ];
    enable ? this.inputNew.setValidators(inputValidators) : this.inputNew.clearValidators();
    this.inputNew.updateValueAndValidity();
  }

  onSubmit() {
    let addressId = this.getAddressIdByAddress();
    console.log(addressId);
    if (this.selectOfficeForm.valid && addressId !== environment.ERROR_ON_GETTING_ADDRESS_ID) {
      const queryParams = { ...this.selectOfficeForm.value, addressId };
      if (addressId === environment.TEMP_ADDRESS_ID_FOR_NEW_OFFICE) {
        // new office here
        delete queryParams.inputNew;
      } else {
        // existing office here
      }

      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge' // remove to replace all query params by provided
        // replaceUrl: true // If we want to replace it in the history instead of adding new value there
      });
      console.log(queryParams);
    }
  }

  ngOnDestroy(): void {
    this.countrySubscription.unsubscribe();
    this.citySubscription.unsubscribe();
    this.addressSubscription.unsubscribe();
  }

  private _initChoosingForm(): void {
    this.selectOfficeForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
    });
    if (this.canEditMode) {
      this.selectOfficeForm.addControl('inputNew', new FormControl({ value: '', disabled: true }));
    }
  }
}
