import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';



@Injectable()
export class PasswordValidator {

    static passwordMatch(control: AbstractControl): ValidationErrors | null {

        const password = control.get('password').value;
        const passwordConfirm = control.get('passwordConfirm').value;

        if (password === passwordConfirm) {
            return null;
        }

        return { passwordMatch: true };
    }
}
