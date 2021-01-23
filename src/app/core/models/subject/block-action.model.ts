export class BlockActionModel {
    id: number;
    blockId: number;
    name: string;
    location: string;
    description: string;
    color: string;
    startDate;
    endDate;
    attendanceAllowStartDate;
    attendanceAllowEndDate;
    attendanceSignOffEndDate;
    visible: boolean;
    groupId: number;

    dateIn: Date;
    startEndDate: Date;
    ucitelName: string;

    constructor() {
        this.visible = true;
    }
}
