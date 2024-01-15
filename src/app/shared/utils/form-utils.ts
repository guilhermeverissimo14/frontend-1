import { FormGroup } from '@angular/forms';

export function validateForm(form: FormGroup) {
  for (const control of Object.values(form.controls)) {
    if (control instanceof FormGroup) {
      validateForm(control);
    }

    control.markAsDirty();
    control.updateValueAndValidity();
  }
}

export function isFormInvalid(form: FormGroup) {
  validateForm(form);
  return form.invalid;
}
