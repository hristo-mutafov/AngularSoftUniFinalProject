import { ValidatorFn } from '@angular/forms';
import { emailRegEx } from '../constants';

export const emailValidator: ValidatorFn = (control) => {
    const regex = emailRegEx;
    return !control.value || regex.test(control.value)
        ? null
        : { emailError: true };
};
