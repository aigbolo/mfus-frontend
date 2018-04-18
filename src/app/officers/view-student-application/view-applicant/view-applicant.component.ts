import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils/utils.service';
import { ReferenceService } from '../../../services/general/reference.service';
import { ViewStudentApplicationComponent } from '../view-student-application.component';

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrls: ['./view-applicant.component.css']
})
export class ViewApplicantComponent implements OnInit {

  constructor(public utilsService: UtilsService,
    private referenceService: ReferenceService,
    public applicationView: ViewStudentApplicationComponent,
    private ngprogress: NgProgress) { }

  ngOnInit() {
  }


  onNext() {
  }


}
