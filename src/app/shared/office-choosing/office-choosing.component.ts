import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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
  buttonsDisable: { apply: boolean, edit: boolean, delete: boolean } = { apply: true, edit: true, delete: true };
  checkingInputNames: string[] = ['Belarus', 'Ukraine', 'Russia'];
  countryArr: string[] = ['Belarus', 'Ukraine', 'Russia'];

  adminMode = true;

  constructor() {
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

  public get inputNewState(): AbstractControl {
    return this.selectOfficeForm.get('inputNew');
  }

  public get countryOptions(): string[] {
    const country = [...this.countryArr];
    if (this.adminMode) {
      this.addNewToSelect(country);
    }
    return country;
  }

  public get cityOptions(): string[] {
    const city = ['Minsk', 'Grodno'];
    if (this.adminMode) {
      this.addNewToSelect(city);
    }
    return city;
  }

  public get addressOptions(): string[] {
    const address = ['Sverdlova str.2', 'Koroleva str.34', 'Svetlova str. 30'];
    if (this.adminMode) {
      this.addNewToSelect(address);
    }
    return address;
  }

  public get floorOptions(): string[] {
    const floor = ['1', '2'];
    if (this.adminMode) {
      this.addNewToSelect(floor);
    }
    return floor;
  }

  ngOnInit() {
    this._initChoosingForm();
  }

  onOpenselect(source: string) {
    console.log(source);
  }

  onSelected(selection: MatSelectChange) {
    let value: string = selection.value.toString().toLowerCase() || '';
    let source: string = selection.source.ngControl.name.toString().toLowerCase() || '';
    this.enableNextSelection();
    if (value === SelectorsName.new) {
      this.inputNewDataFor(source);
    }
    console.log(this.currentFocus);

  }

  inputNewDataFor(source: string): void {
    console.log('inputNewData');
    this.inputNewState.enable();
    this.currentFocus = SelectorsName.new;
    this.newSelected = source;
  }

  enableNextSelection(): void {
    console.log('1');
    if (this.country?.value && this.country.value.toLowerCase() !== SelectorsName.new) {
      this.selectOfficeForm.controls['city'].enable();
      this.currentFocus = SelectorsName.city;
      if (this.city?.value && this.city.value.toLowerCase() !== SelectorsName.new) {
        this.selectOfficeForm.controls['address'].enable();
        this.currentFocus = SelectorsName.address;
        if (this.address?.value && this.address.value.toLowerCase() !== SelectorsName.new) {
          this.selectOfficeForm.controls['floor'].enable();
          this.currentFocus = SelectorsName.floor;
        }
      }
    }
  }

  onInputMessage(message: string): void {
    console.log('afterInputMessage');

  }

  addNewToSelect(arr: string[]): void {
    arr.unshift(SelectorsName.new[0].toUpperCase() + SelectorsName.new.substring(1));
  }

  onClickShowHide() {
    this.isShowMap = !this.isShowMap;
    this.showMap.emit(this.isShowMap);
  }

  private _initChoosingForm() {
    this.selectOfficeForm = new FormGroup({
      country: new FormControl({ value: '', disabled: false }),
      city: new FormControl({ value: '', disabled: true }),
      address: new FormControl({ value: '', disabled: true }),
      floor: new FormControl({ value: '', disabled: true }),
      inputNew: new FormControl({ value: '', disabled: true }, [
        ValidateSameName(this.checkingInputNames)
      ])
    });
  }


}
