import { Directive, Input } from '@angular/core';
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { sameValueValidator } from '../validators/same-value.validator';

@Directive({
    selector: '[appEqualPassword]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EqualPasswordDirective,
            multi: true,
        },
    ],
})
export class EqualPasswordDirective implements Validator {
    @Input()
    appEqualPassword = '';

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        if (!control.value) return null;
        return sameValueValidator(control.value, this.appEqualPassword);
    }
}
