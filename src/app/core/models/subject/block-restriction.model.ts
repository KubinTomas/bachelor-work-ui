export class BlockRestrictionModel {
    blockId: number;

    // user which is not stag student
    allowExternalUsers: boolean;

    // allow stag students join the action
    allowStagStudents: boolean;

    // povoli pristup jen studentum na whitelistu
    allowOnlyStudentsOnWhiteList: boolean;

    // limit kolikrat student musi splnit akce k absolvovani bloku, zaroven pokud jiz splnil dany pocet, tak nemuze navstivit dalsi akci daneho bloku
    // 0 - muze akce navstevovat bez omezeni
    actionAttendLimit: number;

    constructor() {
        this.allowExternalUsers = false;
        this.allowStagStudents = false;
        this.allowOnlyStudentsOnWhiteList = true;
        this.actionAttendLimit = 0;
    }
}
