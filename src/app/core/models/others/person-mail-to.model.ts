export class PersonMailTo {
    dbEntryId: number;
    isStudent: boolean;
    areDataValid: boolean;

    value: string;
    label: string;

    /**
     *
     */
    constructor(dbEntryId: number, isStudent: boolean, studentOsCislo: string, name: string, rocnik: string, fakulta: string,) {
        this.isStudent = isStudent;
        this.dbEntryId = dbEntryId;
        this.value = dbEntryId.toString();

        if (name) {
            this.label = name + (isStudent ? ' (' + studentOsCislo + ',' + rocnik + ',' + fakulta + ')' : '');
        } else {
            this.label = 'bez oprávnění';
        }


    }
}


// <td>
// <ng-container *ngIf="data.isStagStudent">
//     <i class="fas fa-user-graduate"></i>
// </ng-container>
// <ng-container *ngIf="!data.isStagStudent">
//     <i class="fas fa-user"></i>
// </ng-container>
// </td>
// <td>{{ data.studentOsCislo }} </td>
// <td>{{ data.fullname }}</td>
// <td>{{ data.rocnik }}</td>
// <td>{{ data.fakultaSp }}</td>
// <td>
// <ng-container *ngIf="data.evaluationDate">
//     <span nz-tooltip
//         [nzTooltipTitle]="data.fulfilled? 'Splnil (zúčastnil se)': 'Nesplnil (nezúčastnil se)'">
//         <i class="fa" [class.fa-check]="data.fulfilled" [class.fa-times]="!data.fulfilled"
//             [class.active-icon]="data.fulfilled" [class.fade-out-icon]="!data.fulfilled">
//         </i></span>
// </ng-container>
// <ng-container *ngIf="!data.evaluationDate">
//     čeká se na vyhodnocení..
// </ng-container>
// </td>