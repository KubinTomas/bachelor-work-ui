import { ActionPersonModel } from "../persons/action-person.model";
import { BlockActionRestriction } from "./block-acion-restriction.model";

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

    studentCount: number;

    blockActionRestriction: BlockActionRestriction;

    signedUsersCount: number;
    usersInQueueCount: number;

    signedUsers: ActionPersonModel[];
    signedUsersInQueue: ActionPersonModel[];

    constructor() {
        this.visible = true;
        this.blockActionRestriction = new BlockActionRestriction();
    }
}
