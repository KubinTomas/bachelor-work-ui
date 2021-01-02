import { Injectable } from '@angular/core';
import { StagYearModel } from '../../models/others/stag-year.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsYearService {

  getFormattedYearsComplex(currentYear: number = new Date().getFullYear()): StagYearModel[] {
    const years: StagYearModel[] = [];

    for (let year = currentYear + 1; year >= 1980; year--) {
      const formattedYear = this.getFormattedYear(year);
      years.push(new StagYearModel(year.toString(), formattedYear));
    }

    return years;
  }

  getFormattedYearComplex(year: number): StagYearModel {
    const formattedYear = year.toString() + ' - ' + year.toString() + '/' + (year + 1).toString();
    return new StagYearModel(year.toString(), formattedYear);
  }

  getFormattedYears(currentYear: number = new Date().getFullYear()): string[] {
    const years: string[] = [];

    for (let i = currentYear + 1; i >= 1980; i--) {
      const year = this.getFormattedYear(i);
      years.push(year);
    }

    return years;
  }

  getCurrentYear(currentYear: number = new Date().getFullYear()): string {
    return this.getFormattedYear(currentYear);
  }

  getFormattedYear(year: number): string {
    return year.toString() + ' - ' + year.toString() + '/' + (year + 1).toString();
  }
}
