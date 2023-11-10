import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Student } from 'src/app/shared/models/student';
import { StudentService } from 'src/app/shared/services/student.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { studentFormTypes, formValues } from 'src/app/shared/models/studentFormTypes';
import { StudentFormComponent } from 'src/app/shared/components/student-form/student-form.component';
import { MarkAttendanceComponent } from '../mark-attendance/mark-attendance.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  studentList: Array<Student> = [];
  formValues = formValues

  constructor(private studentService: StudentService, public dialog: MatDialog) {
    this.updateStudents();
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

  public deleteStudent(id: any) {
    this.studentService.deleteStudent(id).subscribe(
      (response: Student) => {
        // console.log(response);
        this.updateStudents();
      },
      (error) => {
        console.error(error);
      }
    )
  }

  public openDialog(type: studentFormTypes, student?: Student) {
    const dialogRef = this.dialog
      .open(StudentFormComponent, {
        width: '500px',
        height: '90%',
        data: { formType: type, student: student }
      })
      .afterClosed().subscribe((shouldRefresh: boolean) => {
        if (shouldRefresh)
          this.updateStudents();
      });
  }

  public openAttendanceDialog(student?: Student) {
    const dialogRef = this.dialog
      .open(MarkAttendanceComponent, {
        width: '500px',
        height: '90%',
        data: { student: student }
      })
      .afterClosed().subscribe((shouldRefresh: boolean) => {
        if (shouldRefresh)
          this.updateStudents();
      });
  }
}
