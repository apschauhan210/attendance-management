import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/student';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiBaseUrl}/students/`);
  }

  public getStudent(id: any): Observable<Student> {
    return this.http.get<Student>(`${this.apiBaseUrl}/students/${id}`)
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiBaseUrl}/students/`, student, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiBaseUrl}/students/${student.id}`, student, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public deleteStudent(id: any): Observable<Student> {
    return this.http.delete<Student>(`${this.apiBaseUrl}/students/${id}`);
  } 

}
