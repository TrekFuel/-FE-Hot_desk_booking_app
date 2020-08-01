import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MyErrorStateMatcher, ValidateSameName } from '../validators/same-name.validator';
import { SelectorsName } from './selectors-name';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectorsAddress, SelectorsCity, SelectorsModel } from '../models/selectors.model';
import { MatSelectChange } from '@angular/material/select';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
  isOfficeNew: boolean = false;
  // ------------------

  canEditMode = true;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public get countryOptions(): string[] {
    return this.canEditMode ? [SelectorsName.new, ...this.selectorsModel.country] : [...this.selectorsModel.country];
  }

  public get cityOptions(): string[] {
    const city = [];
    if (!!this.country.value) {
      this.selectorsModel.city.forEach((item: SelectorsCity) => {
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
      this.selectorsModel.address.forEach((item: SelectorsAddress) => {
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
    ).subscribe((country: string) => this.canEditMode ?
      this.onChoosing(SelectorsName.country, country === SelectorsName.new) : null);

    this.citySubscription = this.city.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => this.selectOfficeForm.patchValue({ address: null }))
    ).subscribe((city: string) => this.canEditMode ?
      this.onChoosing(SelectorsName.city, city === SelectorsName.new) : null);

    this.addressSubscription = this.address.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((address: string) => this.canEditMode ?
      this.onChoosing(SelectorsName.address, address === SelectorsName.new) : null);
  }

  getAddressIdByAddress(): string {
    return (!!this.country.value && !!this.city.value && !!this.address.value) ? this.selectorsModel.address
      .filter((item: SelectorsAddress) => item.city === this.city.value && item.address === this.address.value)[0].addressId : '';
  }

  onChoosing(source: string, isNew: boolean): void {
    this.toggleInputValidators(isNew);
    if (isNew) {
      this.inputNew.enable();
      this.newSelected = source;
      this.currentFocus = SelectorsName.new;
    } else {
      this.inputNew.disable();
      this.newSelected = null;
    }
  }

  onInputMessage(source: string, event): void {
    event.preventDefault();
    let value: string = event.target.value;
    switch (source) {
      case this.SelectorsName.country:
        this.selectOfficeForm.patchValue({ country: value, inputNew: '' });
        break;
      case this.SelectorsName.city:
        this.selectOfficeForm.patchValue({ city: value, inputNew: '' });
        break;
      case this.SelectorsName.address:
        this.selectOfficeForm.patchValue({ address: value, inputNew: '' });
        break;
      default:
        break;
    }
  }

  toggleInputValidators(enable: boolean): void {
    console.log('Enable validator: ' + enable);
    const inputValidators: ValidatorFn[] = [
      Validators.required,
      ValidateSameName(this.checkingInputNames)
    ];
    enable ? this.inputNew.setValidators(inputValidators) : this.inputNew.clearValidators();
    this.inputNew.updateValueAndValidity();
  }

  onOpenSelect(source: string): void {

    // for correct work of double click on same select to (selectionChange) work
    // switch (source) {
    //   case this.SelectorsName.country:
    //     this.selectOfficeForm.patchValue({ country: null });
    //     break;
    //   case this.SelectorsName.city:
    //     this.selectOfficeForm.patchValue({ city: null });
    //     break;
    //   case this.SelectorsName.address:
    //     this.selectOfficeForm.patchValue({ address: null });
    //     break;
    //   case this.SelectorsName.floor:
    //     this.selectOfficeForm.patchValue({ floor: null });
    //     break;
    //   default:
    //     break;
    // }
    //
    // this.currentFocus = null;
    // if (this.canEditMode) {
    //   this.resetInput();
    // }
    //
    // if (source !== SelectorsName.floor) {
    //   this.selectOfficeForm.patchValue({ floor: null });
    //   this.floor.disable();
    //   if (source !== SelectorsName.address) {
    //     this.selectOfficeForm.patchValue({ address: null });
    //     this.address.disable();
    //     if (source !== SelectorsName.city) {
    //       this.selectOfficeForm.patchValue({ city: null });
    //       this.city.disable();
    //     }
    //   }
    // }
  }

  //
  onSelected(selection: MatSelectChange): void {
    //   let value: string = selection.value.toString().toLowerCase() || '';
    //   let source: string = selection.source.ngControl.name.toString().toLowerCase() || '';
    //
    //
    //   if (value === SelectorsName.new && this.canEditMode) {
    //     this.newSelected = source;
    //     this.inputNew.enable();
    //     this.currentFocus = SelectorsName.new;
    //     this.toggleInputValidators(true);
    //   } else {
    //     this.enableNextSelection();
    //   }
    // }
    //
    // enableNextSelection(): void {
    //   if (this.country?.value && this.country.value.toLowerCase() !== SelectorsName.new) {
    //     this.city.enable();
    //     this.currentFocus = SelectorsName.city;
    //     if (this.city?.value && this.city.value.toLowerCase() !== SelectorsName.new) {
    //       this.address.enable();
    //       this.currentFocus = SelectorsName.address;
    //       if (this.address?.value && this.address.value.toLowerCase() !== SelectorsName.new) {
    //         this.floor.enable();
    //         this.currentFocus = SelectorsName.floor;
    //       }
    //     }
    //   }
  }

  //
  onInputMessage2(source: string): void {
    //   const value = this.inputNew?.value;
    //   if (this.selectOfficeForm.valid) {
    //     switch (source) {
    //       case this.SelectorsName.country:
    //         this.countryArr.push(value);
    //         this.selectOfficeForm.patchValue({ country: null });
    //         break;
    //       case this.SelectorsName.city:
    //         this.cityArr.push(value);
    //         this.selectOfficeForm.patchValue({ city: null });
    //         break;
    //       case this.SelectorsName.address:
    //         this.addressArr.push(value);
    //         this.selectOfficeForm.patchValue({ address: null });
    //         break;
    //       case this.SelectorsName.floor:
    //         this.floorArr.push(value);
    //         this.selectOfficeForm.patchValue({ floor: null });
    //         break;
    //       default:
    //         break;
    //     }
    //     this.enableNextSelection();
    //     this.resetInput();
    //   }
    // }
    //
    // resetInput(): void {
    //   this.inputNew.disable();
    //   this.inputNew.reset(null);
    //   this.toggleInputValidators(false);
    //   this.newSelected = null;
    // }
    //
    // addNewToSelect(arr: string[]): void {
    //   arr.unshift(SelectorsName.new[0].toUpperCase() + SelectorsName.new.substring(1));
    // }
    //
    // onClickShowHide() {
    //   this.isShowMap = !this.isShowMap;
    //   this.showMap.emit(this.isShowMap);
  }

  onSubmit() {
    if (this.selectOfficeForm.valid) {
      const queryParams = { ...this.selectOfficeForm.value, addressId: this.getAddressIdByAddress() };
      if (this.canEditMode) {
        delete queryParams.inputNew;
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
