import { ViewStudentApplicationComponent } from './../../view-student-application.component';
import { Component, OnInit, Input } from '@angular/core';
import { AcSibling } from '../../../../models/ac-sibling';

@Component({
  selector: 'app-view-sibling',
  templateUrl: './view-sibling.component.html',
  styleUrls: ['./view-sibling.component.css']
})
export class ViewSiblingComponent implements OnInit {

  @Input() sibling: AcSibling[];
  constructor(
    public applicationView: ViewStudentApplicationComponent
  ) { }

  ngOnInit() {
    console.log('sibling: ',this.sibling)
  }

}
