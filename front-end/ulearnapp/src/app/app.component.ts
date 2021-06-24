import { CourseService } from './course.service';
import { Course } from './course';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{

  title = 'ulearnapp';
  public courses: Course[];
  public editCourse: Course | null | undefined;
  public deleteCourse: Course | null | undefined;
  public isBackgroundDark: Boolean = false;

  constructor(private courseService: CourseService){
    this.courses = [];
  }

  ngOnInit(){
    this.getCourses();
  }

  public getCourses(): void {
    this.courseService.getCourses().subscribe(
       (respone: Course[]) => {
         this.courses = respone;
         console.log(this.courses);
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
    );
  }

  public getSortedCourses(e : any): void {
    if(e.target.checked){
      this.courseService.getSortedCourses().subscribe(
        (respone: Course[]) => {
          this.courses = respone;
          console.log(this.courses);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }else{
      this.getCourses();
    }
  }

  public onOpenModal(course: Course | null, mode: string): void{

    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal')

    if(mode === 'add'){
      button.setAttribute('data-target', '#addCourseModal');
    }

    if(mode === 'delete'){
      this.deleteCourse = course;
      button.setAttribute('data-target', '#deleteCourseModal');
    }

    if(mode === 'edit'){
      this.editCourse = course;
      button.setAttribute('data-target', '#updateCourseModal');
    }

    container?.appendChild(button);
    button.click();

  }

  public onAddCourse(addForm: NgForm): void{
    document.getElementById('add-course-form')?.click();
    this.courseService.addCourse(addForm.value).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourses();
        addForm.reset();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateCourse(course: Course): void {
    this.courseService.updateCourse(course).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCourse(courseId: number): void{

    this.courseService.deleteCourse(courseId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCourses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public changeBackgroud(): void{
    if(!this.isBackgroundDark){
      document.body.style.background = '#2b202a';
    }else{
      document.body.style.background = '#eeeeee';
    }

    this.isBackgroundDark = !this.isBackgroundDark;
  }

  public searchCourses(key: string) : void{
      const results: Course[] = [];
      for(const course of this.courses){
        if(course.courseTag.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || course.courseTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(course);
        }
      }

      this.courses = results;
      if(results.length === 0 || !key){
        this.getCourses();
      }
  }

  public getClassForCourseColor(courseTag: string): string{

    var courseColorClass = '';

    switch(courseTag) {
      case 'Java': {
         courseColorClass = 'red';
         break;
      }
      case "C#": {
         courseColorClass = 'purple';
         break;
      }
      case "JavaScript":{
        courseColorClass = 'yellow';
        break;
      }
      case "PHP": {
        courseColorClass = 'blue';
        break;
      }
      case "HTML/CSS": {
        courseColorClass = 'pink';
        break;
      }
      default: {
        courseColorClass = 'green'
        break;
      }
   }
    return courseColorClass;
  }

}
