
export class StudentBlockActionModel {
    id: number;
    blockId: number;
    name: string;
    subjectName: string;
    subjectTerm: string;
    subjectYear: string;
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
    blockAttendanceRestrictionAllowSignInMessageCode: number;
    canSignInQueue: boolean;
    canSignOfTheAction: boolean;
    dateRestrictionCanSignIn: boolean;
    orderInQueue: number;
    isDeleted: boolean;

    constructor() {
    }
}
