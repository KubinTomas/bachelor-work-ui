export class BlockActionModel {
    id: number;
    blockId: number;
    name: string;
    location: string;
    description: string;
    color: string;
    startDate: Date;
    endDate: Date;
    attendanceAllowStartDate: Date;
    attendanceAllowEndDate: Date;
    attendanceSignOffEndDate: Date;
    visible: boolean;
    groupId: number;

    startEndDate: Date;

    constructor() {
        this.visible = true;
    }
}
