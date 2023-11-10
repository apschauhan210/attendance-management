import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentFormComponent } from 'src/app/shared/components/student-form/student-form.component';
import { Student, Status, Attendance } from 'src/app/shared/models/student';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent {

  selected: boolean = false;

  studentList: Array<Student> = [];
  attendanceStatuses = Status;

  attendanceForm: FormGroup;
  inputStudent: Student;

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      student: Student
    }
  ) {

    this.updateStudents();

    // console.log(data);
    
    this.inputStudent = this.data.student;
    console.log(this.inputStudent);
    

    this.attendanceForm = new FormGroup({
      student: new FormControl('', [
        Validators.required
      ]),
      date: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      status: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ])
    })

  }

  public updateStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (response: Array<Student>) => {
        // console.log(response);
        this.studentList = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    const inputDate = new Date(this.attendanceForm.get('date')?.value);
    if(!this.inputStudent?.attendanceDetails?.find((attendance) => attendance.date === inputDate)) {
      this.inputStudent?.attendanceDetails?.push({date: inputDate, status: this.attendanceForm.get('status')?.value});
    }

    this.studentService.updateStudent(this.inputStudent).subscribe(
      (response: Student) => {
        console.log(response);
        this.onClose(true);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  onClose(shouldClose: boolean): void {
    this.dialogRef.close(shouldClose);
  }

}
