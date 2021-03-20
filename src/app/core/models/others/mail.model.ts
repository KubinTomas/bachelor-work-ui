export class Mail {
    actionId: number;
    entitiesIds: number[];
    content: string;
    attendanceEntityFlag: boolean;
    subject: string;


    constructor(actionId: number, entitiesIds: number[], content: string, subject: string, attendanceEntityFlag: boolean) {
        this.actionId = actionId;
        this.entitiesIds = entitiesIds;
        this.content = content;
        this.subject = subject;
        this.attendanceEntityFlag = attendanceEntityFlag;
    }
}
