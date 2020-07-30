import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const ValidateSameName = (existingName: string[]) => function(control: AbstractControl) {
  if (existingName.includes(control.value)) {
    return { sameName: true };
  }
  return null;
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
