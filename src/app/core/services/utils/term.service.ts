import { Injectable } from '@angular/core';
import { SelectOptionModel } from '../../models/others/select-option.model';

@Injectable({
    providedIn: 'root'
})
export class UtilsTermService {


    public get terms(): SelectOptionModel[] {
        return [
            new SelectOptionModel('LS (letní semestr)', 'LS'),
            new SelectOptionModel('ZS (zimní semestr)', 'ZS'),
            new SelectOptionModel('LS a ZS (letní a zimní semestr)', 'LS a ZS')];
    }

    public get termWholeYear(): string {
        return 'LS a ZS';
    }

    public getStagTermValue(term: string): string {
        return term === 'LS a ZS' ? '' : term;
    }
}

