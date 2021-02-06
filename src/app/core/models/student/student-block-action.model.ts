
export class StudentBlockActionModel {
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
    maxCapacity: number;
    signedUsersCount: number;
    usersInQueueCount: number;
    isUserSignedIn: boolean;
    isUserSignedInQueue: boolean;
    canSignIn: boolean;
    blockAttendanceRestrictionAllowSignIn: boolean;
    canSignInQueue: boolean;

    constructor() {
    }
}
