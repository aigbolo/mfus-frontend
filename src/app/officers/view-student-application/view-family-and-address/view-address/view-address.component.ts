import { Component, OnInit } from '@angular/core';
import { ViewStudentApplicationComponent } from '../../view-student-application.component';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.css']
})
export class ViewAddressComponent implements OnInit {

  constructor(public applicationView: ViewStudentApplicationComponent) { }

  ngOnInit() {
  }

}
