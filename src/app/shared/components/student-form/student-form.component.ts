import { Component, Inject, Input, OnInit } from '@angular/core';
import { formValues, studentFormTypes } from '../../models/studentFormTypes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  formType: string;
  @Input() sutdentId?: number;

  student?: Student;
  studentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      formType: studentFormTypes,
      student?: Student
    }) {
    // console.log(data);
    this.formType = data.formType
    this.student = data.student

    this.studentForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ])
    })
  }

  ngOnInit(): void {
    if (this.formType === formValues.Edit) {
      if (this.student) {
        // this.studentService.getStudent(this.sutdentId).subscribe(
        //   (response: Student) => {
        //     this.student = response;
        this.studentForm = new FormGroup({
          name: new FormControl(this.student.studentDetails.name, [
            Validators.required
          ]),
          email: new FormControl(this.student.studentDetails.email, [
            Validators.required,
            Validators.email
          ]),
          phone: new FormControl(this.student.studentDetails.phone, [
            Validators.required,
            Validators.pattern(/^\d{10}$/)
          ])
        })
        //   }
        // );
      } else {
        console.error("No or invalid student id");
        this.formType = formValues.Register;
        this.createBlankForm();
      }
    }
    // else {
    //   this.createBlankForm();
    // }
  }

  createBlankForm(): void {
    this.studentForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ])
    })
  }

  onSubmit() {
    if (this.formType === formValues.Register) {
      const student: Student = new Student(1, this.studentForm.value, []);
      this.studentService.addStudent(student).subscribe(
        (response: Student) => {
          console.log(response);
          this.onClose(true);
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (this.formType === formValues.Edit) {
      if (this.student) {
        this.student.studentDetails = this.studentForm.value;
        this.studentService.updateStudent(this.student).subscribe(
          (response: Student) => {
            // console.log(response);
            this.onClose(true);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }

  }

  onClose(shouldClose: boolean): void {
    this.dialogRef.close(shouldClose);
  }
}
