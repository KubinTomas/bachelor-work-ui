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


    getDifferenceInMilliseconds(date1: Date, date2: Date): number {
        console.log(date1);
        console.log(date2);
        return date1.getTime() - date2.getTime();
    }

    appendTimeToDate(date: Date, milliseconds: number): Date {
        return new Date(date.getTime() + milliseconds);
    }

    // d.M.yyyy HH:mm
    getDateFormatV1(date: Date): string {
        return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    }
}

