import { Directive } from '@angular/core';
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { emailValidator } from '../validators/email.validator';

@Directive({
    selector: '[appEmail]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailDirective,
            multi: true,
        },
    ],
})
export class EmailDirective implements Validator {
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return emailValidator(control);
    }
}
