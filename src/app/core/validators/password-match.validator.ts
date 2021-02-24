import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';



@Injectable()
export class PasswordValidator {

    static passwordMatch(control: AbstractControl): ValidationErrors | null {

        console.log('asd');

        const password = control.get('password').value;
        const passwordConfirm = control.get('passwordConfirm').value;

        if (password === passwordConfirm) {
            return null;
        }

        control.get('passwordConfirm').setErrors({ passwordMatch: true });

        return { passwordMatch: true };
    }
}
