import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ValidateSameName } from '../validators/same-name.validator';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-office-choosing',
  templateUrl: './office-choosing.component.html',
  styleUrls: ['./office-choosing.component.scss']
})
export class OfficeChoosingComponent implements OnInit {
  selectOfficeForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  @Output() showMap: EventEmitter<boolean> = new EventEmitter<boolean>();
  isShowMap: boolean = false;
  currentFocus: string = 'country';
  newSelected: string | null = null;
  buttonsDisable: { apply: boolean, edit: boolean, delete: boolean } = { apply: true, edit: true, delete: true };
  errorOnInput: { isShow: boolean, text: string } = { isShow: false, text: '' };
  checkingInputNames: string[] = ['Belarus', 'Ukraine', 'Russia'];
  countryArr: string[] = ['Belarus', 'Ukraine', 'Russia'];

  adminMode = true;

  constructor() {
  }

  public get country(): string {
    return this.selectOfficeForm?.get('country').value || '';
  }

  public get city(): string {
    return this.selectOfficeForm?.get('city').value || '';
  }

  public get address(): string {
    return this.selectOfficeForm?.get('address').value || '';
  }

  public get floor(): string {
    return this.selectOfficeForm?.get('floor').value || '';
  }

  public get inputNew(): string {
    return this.selectOfficeForm?.get('inputNew').value || '';
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

  onSelected(selection: MatSelectChange) {
    let value: string = selection.value.toString().toLowerCase() || '';
    let source: string = selection.source.ngControl.name.toString().toLowerCase() || '';
    this.enableNextSelection();
    if (value === 'new') {
      this.inputNewDataFor(source);
    }
    console.log(this.currentFocus);

  }

  inputNewDataFor(source: string): void {
    console.log('inputNewData');
    this.selectOfficeForm.controls['inputNew'].enable();
    this.currentFocus = 'new';
    this.newSelected = source;
    this.errorOnInput.isShow = false;
  }

  enableNextSelection(): void {
    if (!!this.country && this.country.toLowerCase() !== 'new') {
      this.selectOfficeForm.controls['city'].enable();
      this.currentFocus = 'city';
      if (!!this.city && this.city.toLowerCase() !== 'new') {
        this.selectOfficeForm.controls['address'].enable();
        this.currentFocus = 'address';
        if (!!this.address && this.address.toLowerCase() !== 'new') {
          this.selectOfficeForm.controls['floor'].enable();
          this.currentFocus = 'floor';
        }
      }
    }
  }

  onInputMessage(message: string): void {
    console.log('afterInputMessage');

  }

  checkInputErrors() {


  }

  addNewToSelect(arr: string[]): void {
    arr.unshift('New');
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
