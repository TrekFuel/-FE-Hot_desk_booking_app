import { AbstractControl } from '@angular/forms';

export const ValidateSameName = (existingName: string[]) => function(control: AbstractControl) {
  if (existingName.includes(control.value)) {
    return { sameName: true };
  }
  return null;
};
