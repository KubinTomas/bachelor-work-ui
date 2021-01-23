import { Injectable } from '@angular/core';
import { SelectOptionModel } from '../../models/others/select-option.model';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    private covertDateToISO(date: Date): string {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
        return (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);
    }

    covertDateToAPIFriendlyFormat(date: Date): string {
        return this.covertDateToISO(date);
    }
}

