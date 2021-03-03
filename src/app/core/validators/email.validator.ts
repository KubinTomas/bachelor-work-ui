import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class EmailValidators {

    constructor(private authenticationService: AuthenticationService) { }

    isAvailable(control: AbstractControl): any {

        return new Promise((resolve, reject) => {

            const email = control.value as string;

            if (!email) {
                return resolve(null);
            }

            return this.authenticationService.isEmailAvailable(email).subscribe(isEmailAvailable => {

                if (!isEmailAvailable) {
                    return resolve({ isEmailAvailable: true });
                }
                else {
                    return resolve(null);
                }
            });
        });

    }
}

