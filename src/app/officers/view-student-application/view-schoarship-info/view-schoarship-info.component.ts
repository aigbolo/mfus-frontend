import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ViewStudentApplicationComponent } from '../view-student-application.component';
import { ApplicationService } from '../../../services/students/application.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-view-schoarship-info',
  templateUrl: './view-schoarship-info.component.html',
  styleUrls: ['./view-schoarship-info.component.css']
})
export class ViewSchoarshipInfoComponent implements OnInit {

  pageRender: boolean = false;

  constructor(private referenceService: ReferenceService,
    private utilsService: UtilsService,
    public applicationView: ViewStudentApplicationComponent,
    private applicationService: ApplicationService,
    private ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
    this.initialScholarshipAnnouncement();
    this.initialScholarshiphistory();
  }

  onPrevious() {
  }
  onNext() {
  }

  initialScholarshipAnnouncement() {
    this.applicationService.initialScholarshipAnnouncement(this.applicationView.applyScholarshipViewForm.apApplication.announcement_ref).subscribe(
      data => {
        console.log(data)

      }, error => {

      }, () => {
      }
    )
  }

  initialScholarshiphistory() {
    this.applicationService.initialScholarshipHistory(this.applicationView.applyScholarshipViewForm.acStudent.student_ref).subscribe(
      data => {
        // this.applicationView.applyScholarshipViewForm.apScholarshipHistory = data
      }, error => {
        console.log(error)
      }, () => {
        this.initialStudentLoanFund();

      }
    )
  }

  initialStudentLoanFund() {
    this.applicationService.initialStudentLoanFund(this.applicationView.applyScholarshipViewForm.acStudent.student_ref).subscribe(
      data => {
        // this.applicationView.applyScholarshipViewForm.apStudentLoanFund = data
      }, error => {
        console.log(error)
      }, () => {
        this.ngProgress.done();
        this.pageRender = true;
      }
    )
  }

}
