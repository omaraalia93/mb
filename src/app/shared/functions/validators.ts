import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

//some example of validators

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    // Regular expression for a basic email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(control.value)) {
      return null;
    } else {
      return { email: true };
    }
  };
}

export function noDigitsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    const digitChars = /[0-9]/;
    if (value && digitChars.test(value)) {
      return { noDigits: true };
    }
    return null;
  };
}

export function noSpecialCharsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (value && specialChars.test(value)) {
      return { noSpecialChars: true };
    }
    return null;
  };
}

export function notCheckedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isChecked = control.value === true;
    return isChecked ? null : { notChecked: true };
  };
}

export function matchPasswordValidator(passwordField,confirmPasswordField): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } | null => {
    const passwordControl = group.get(passwordField);
    const confirmPasswordControl = group.get(confirmPasswordField);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password === confirmPassword) {
      return null; // Passwords match, validation succeeds
    } else {
      return { passwordsNotMatch: true }; // Passwords do not match, validation fails
    }
  };
}

export function onlyNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const valueStr: string = control.value.toString();

    if (/^\d*\.?\d*$/.test(valueStr)) {
      return null;
    } else {
      return { invalidNumberOrDot: true };
    }
  };
}