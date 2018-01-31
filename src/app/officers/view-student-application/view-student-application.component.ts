import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-view-student-application',
  templateUrl: './view-student-application.component.html',
  styleUrls: ['./view-student-application.component.css']
})
export class ViewStudentApplicationComponent implements OnInit {

  constructor(public utilsService: UtilsService) { }

  ngOnInit() {
  }

}
