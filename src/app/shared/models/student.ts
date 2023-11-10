export class Student {
    id: any
    studentId: number
    studentDetails: {
        email: string,
        name: string,
        phone: string
    }
    attendanceDetails?: Array<Attendance>

    constructor(studentId: number, studentDetails: {email: string, name: string, phone: string}, attendanceDetails: Array<Attendance>) {
        this.studentId = studentId;
        this.studentDetails = studentDetails;
        this.attendanceDetails = attendanceDetails;
    }
}

export interface Attendance {
    status: Status,
    date: Date
}

export enum Status {
    PRESENT,
    ABSENT
}