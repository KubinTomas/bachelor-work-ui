export class BlockActionRestriction {
    actionId: number;

    // user which is not stag student
    allowExternalUsers: boolean;

    // povoli pristup jen studentum na whitelistu
    allowOnlyStudentsOnWhiteList: boolean;

    maxCapacity: number;

    constructor() {
        this.allowExternalUsers = false;
        this.allowOnlyStudentsOnWhiteList = true;
        this.maxCapacity = 0;
    }
}
