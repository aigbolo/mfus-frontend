import { ViewStudentApplicationComponent } from './../../view-student-application.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-sibling',
  templateUrl: './view-sibling.component.html',
  styleUrls: ['./view-sibling.component.css']
})
export class ViewSiblingComponent implements OnInit {

  constructor(
    public applicationView: ViewStudentApplicationComponent
  ) { }

  ngOnInit() {
  }

}
