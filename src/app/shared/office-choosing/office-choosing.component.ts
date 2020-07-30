import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MyErrorStateMatcher, ValidateSameName } from '../validators/same-name.validator';
import { SelectorsName } from './selectors-name';

@Component({
  selector: 'app-office-choosing',
  templateUrl: './office-choosing.component.html',
  styleUrls: ['./office-choosing.component.scss']
})
export class OfficeChoosingComponent implements OnInit {
  SelectorsName = SelectorsName;
  selectOfficeForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  @Output() showMap: EventEmitter<boolean> = new EventEmitter<boolean>();
  isShowMap: boolean = false;
  currentFocus: string = SelectorsName.country;
  newSelected: string | null = null;
  buttonsDisable: { apply: boolean, edit: boolean, delete: boolean } = { apply: false, edit: true, delete: true };
  checkingInputNames: string[] = ['Belarus', 'Ukraine', 'Russia'];
  countryArr: string[] = ['Belarus', 'Ukraine', 'Russia'];
  cityArr: string[] = ['Minsk', 'Grodno'];
  addressArr: string[] = ['Sverdlova str.2', 'Koroleva str.34', 'Svetlova str. 30'];
  floorArr: string[] = ['1', '2'];

  canEditMode = true;

  constructor() {
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

  toggleInputValidators(enable: boolean): void {
    const inputValidators: ValidatorFn[] = [
      Validators.required,
      ValidateSameName(this.checkingInputNames)
    ];
    enable ? this.inputNew.setValidators(inputValidators) : this.inputNew.clearValidators();
    this.inputNew.updateValueAndValidity();
  }

  onOpenselect(source: string): void {
    switch (source) {
      case this.SelectorsName.country:
        this.country.setValue(null);
        break;
      case this.SelectorsName.city:
        this.city.setValue(null);
        break;
      case this.SelectorsName.address:
        this.address.setValue(null);
        break;
      case this.SelectorsName.floor:
        this.floor.setValue(null);
        break;
      default:
        break;
    }

    this.currentFocus = null;
    this.resetInput();

    if (source !== SelectorsName.floor) {
      this.floor.setValue(null);
      this.floor.disable();
      if (source !== SelectorsName.address) {
        this.address.setValue(null);
        this.address.disable();
        if (source !== SelectorsName.city) {
          this.city.setValue(null);
          this.city.disable();
        }
      }
    }
  }

  onSelected(selection: MatSelectChange): void {
    let value: string = selection.value.toString().toLowerCase() || '';
    let source: string = selection.source.ngControl.name.toString().toLowerCase() || '';
    this.enableNextSelection();
    if (value === SelectorsName.new && this.canEditMode) {
      this.inputNewDataFor(source);
    }
  }

  inputNewDataFor(source: string): void {
    console.log('inputNewData');
    this.inputNew.enable();
    this.currentFocus = SelectorsName.new;
    this.newSelected = source;
    this.toggleInputValidators(true);
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
    console.log('onInput');
    const value = this.inputNew?.value;
    if (this.selectOfficeForm.valid) {
      switch (source) {
        case this.SelectorsName.country:
          this.countryArr.push(value);
          this.country.setValue(value);
          break;
        case this.SelectorsName.city:
          this.cityArr.push(value);
          this.city.setValue(value);
          break;
        case this.SelectorsName.address:
          this.addressArr.push(value);
          this.address.setValue(value);
          break;
        case this.SelectorsName.floor:
          this.floorArr.push(value);
          this.floor.setValue(value);
          break;
        default:
          break;
      }
      this.resetInput();

      this.enableNextSelection();
    }
  }

  resetInput(): void {
    this.newSelected = null;
    this.inputNew.disable();
    this.inputNew.reset(null);
    this.toggleInputValidators(false);
  }


  addNewToSelect(arr: string[]): void {
    arr.unshift(SelectorsName.new[0].toUpperCase() + SelectorsName.new.substring(1));
  }

  onClickShowHide() {
    this.isShowMap = !this.isShowMap;
    this.showMap.emit(this.isShowMap);
  }

  onSubmit() {
    console.log(this.selectOfficeForm.value);
  }

  private _initChoosingForm(): void {
    this.selectOfficeForm = new FormGroup({
      country: new FormControl({ value: null, disabled: false }),
      city: new FormControl({ value: null, disabled: true }),
      address: new FormControl({ value: null, disabled: true }),
      floor: new FormControl({ value: null, disabled: true }),
      inputNew: new FormControl({ value: null, disabled: true })
    });
    if (!this.canEditMode) {
      this.selectOfficeForm.removeControl('inputNew');
    }
  }
}
