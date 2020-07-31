import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MyErrorStateMatcher, ValidateSameName } from '../validators/same-name.validator';
import { SelectorsName } from './selectors-name';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-office-choosing',
  templateUrl: './office-choosing.component.html',
  styleUrls: ['./office-choosing.component.scss']
})
export class OfficeChoosingComponent implements OnInit {
  SelectorsName = SelectorsName;
  selectOfficeForm: FormGroup;
  currentFocus: string = SelectorsName.country;
  checkingInputNames: string[] = ['Belarus', 'Ukraine', 'Russia'];

  // variables for edit only here
  matcher = new MyErrorStateMatcher();
  newSelected: string | null = null;
  // ------------------

  // temporary variables
  @Output() showMap: EventEmitter<boolean> = new EventEmitter<boolean>();
  isShowMap: boolean = false;
  buttonsDisable: { edit: boolean, delete: boolean } = { edit: true, delete: true };

  countryArr: string[] = ['Belarus', 'Ukraine', 'Russia'];
  cityArr: string[] = ['Grodno', 'Minsk'];
  cityArr2: string[] = ['Kiev', 'Lvov'];
  cityArr3: string[] = ['Moskva', 'St-Peterburg'];
  addressArr: string[] = ['Sverdlova str.2', 'Koroleva str.34', 'Svetlova str. 30'];
  floorArr: string[] = ['1', '2'];
  // -------------------

  canEditMode = true;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public get countryOptions(): string[] {
    const country = [...this.countryArr];
    if (this.canEditMode) {
      this.addNewToSelect(country);
    }
    return country;
  }

  public get cityOptions(): string[] {
    const city = [...this.cityArr];
    if (this.canEditMode) {
      this.addNewToSelect(city);
    }
    return city;
  }

  public get addressOptions(): string[] {
    const address = [...this.addressArr];
    if (this.canEditMode) {
      this.addNewToSelect(address);
    }
    return address;
  }

  public get floorOptions(): string[] {
    const floor = [...this.floorArr];
    if (this.canEditMode) {
      this.addNewToSelect(floor);
    }
    return floor;
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

  public get floor(): AbstractControl {
    return this.selectOfficeForm?.get('floor');
  }

  public get inputNew(): AbstractControl {
    return this.selectOfficeForm?.get('inputNew');
  }

  ngOnInit() {
    this._initChoosingForm();
  }

  // ToDo in some case when you back your choice on selects, validators don`t turn off
  toggleInputValidators(enable: boolean): void {
    const inputValidators: ValidatorFn[] = [
      Validators.required,
      ValidateSameName(this.checkingInputNames)
    ];
    enable ? this.inputNew.setValidators(inputValidators) : this.inputNew.clearValidators();
    this.inputNew.updateValueAndValidity();
  }

  onOpenSelect(source: string): void {
    // for correct work of double click on same select to (selectionChange) work
    switch (source) {
      case this.SelectorsName.country:
        this.selectOfficeForm.patchValue({ country: null });
        break;
      case this.SelectorsName.city:
        this.selectOfficeForm.patchValue({ city: null });
        break;
      case this.SelectorsName.address:
        this.selectOfficeForm.patchValue({ address: null });
        break;
      case this.SelectorsName.floor:
        this.selectOfficeForm.patchValue({ floor: null });
        break;
      default:
        break;
    }

    this.currentFocus = null;
    if (this.canEditMode) {
      this.resetInput();
    }

    if (source !== SelectorsName.floor) {
      this.selectOfficeForm.patchValue({ floor: null });
      this.floor.disable();
      if (source !== SelectorsName.address) {
        this.selectOfficeForm.patchValue({ address: null });
        this.address.disable();
        if (source !== SelectorsName.city) {
          this.selectOfficeForm.patchValue({ city: null });
          this.city.disable();
        }
      }
    }
  }

  onSelected(selection: MatSelectChange): void {
    let value: string = selection.value.toString().toLowerCase() || '';
    let source: string = selection.source.ngControl.name.toString().toLowerCase() || '';


    if (value === SelectorsName.new && this.canEditMode) {
      this.newSelected = source;
      this.inputNew.enable();
      this.currentFocus = SelectorsName.new;
      this.toggleInputValidators(true);
    } else {
      this.enableNextSelection();
    }
  }

  enableNextSelection(): void {
    if (this.country?.value && this.country.value.toLowerCase() !== SelectorsName.new) {
      this.city.enable();
      this.currentFocus = SelectorsName.city;
      if (this.city?.value && this.city.value.toLowerCase() !== SelectorsName.new) {
        this.address.enable();
        this.currentFocus = SelectorsName.address;
        if (this.address?.value && this.address.value.toLowerCase() !== SelectorsName.new) {
          this.floor.enable();
          this.currentFocus = SelectorsName.floor;
        }
      }
    }
  }

  onInputMessage(source: string): void {
    const value = this.inputNew?.value;
    if (this.selectOfficeForm.valid) {
      switch (source) {
        case this.SelectorsName.country:
          this.countryArr.push(value);
          this.selectOfficeForm.patchValue({ country: null });
          break;
        case this.SelectorsName.city:
          this.cityArr.push(value);
          this.selectOfficeForm.patchValue({ city: null });
          break;
        case this.SelectorsName.address:
          this.addressArr.push(value);
          this.selectOfficeForm.patchValue({ address: null });
          break;
        case this.SelectorsName.floor:
          this.floorArr.push(value);
          this.selectOfficeForm.patchValue({ floor: null });
          break;
        default:
          break;
      }
      this.enableNextSelection();
      this.resetInput();
    }
  }

  resetInput(): void {
    this.inputNew.disable();
    this.inputNew.reset(null);
    this.toggleInputValidators(false);
    this.newSelected = null;
  }

  addNewToSelect(arr: string[]): void {
    arr.unshift(SelectorsName.new[0].toUpperCase() + SelectorsName.new.substring(1));
  }

  onClickShowHide() {
    this.isShowMap = !this.isShowMap;
    this.showMap.emit(this.isShowMap);
  }

  onSubmit() {
    if (this.selectOfficeForm.valid && !this.newSelected) {
      const queryParams = { ...this.selectOfficeForm.value };
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

  private _initChoosingForm(): void {
    this.selectOfficeForm = new FormGroup({
      country: new FormControl({ value: null, disabled: false }, Validators.required),
      city: new FormControl({ value: null, disabled: true }, Validators.required),
      address: new FormControl({ value: null, disabled: true }, Validators.required),
      floor: new FormControl({ value: null, disabled: true }, Validators.required),
      inputNew: new FormControl({ value: null, disabled: true })
    });
    if (!this.canEditMode) {
      this.selectOfficeForm.removeControl('inputNew');
    }
  }
}
