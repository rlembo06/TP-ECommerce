import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS,Validator, Validators,AbstractControl,ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[equalValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
    ]
})

export class EqualValidatorDirective implements Validator {

    constructor(
        @Attribute('equalValidator') public validateEqual: string
    ) { }

    validate(ac: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        let value1 = ac.value;

        // control value (e.g. password)
        let value2 = ac.root.get(this.validateEqual);

        // value not equal
        if (value1 && value2 !== value2.value) return {
            validateEqual: false
        }
        return null;
    }

}
