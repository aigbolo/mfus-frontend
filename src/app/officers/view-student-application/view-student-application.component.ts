import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { ApplyScholarshipForm } from '../../forms/apply-scholarship-form';
import { ApplicationService } from '../../services/students/application.service';
import { AuthenticationService } from '../../services/general/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from '../../services/general/reference.service';

@Component({
  selector: 'app-view-student-application',
  templateUrl: './view-student-application.component.html',
  styleUrls: ['./view-student-application.component.css']
})
export class ViewStudentApplicationComponent implements OnInit {

  applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm
  student_ref: string
  application_ref: string
  pageRender: boolean = false
  constructor(public utilsService: UtilsService,
    private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private referenceService: ReferenceService,
    private ngprogress: NgProgress) { }

  ngOnInit() {
    this.ngprogress.start()
    this.student_ref = 'Vg518d4wKwGFh19dDiMSkKE5a55fd0c6d816'
    this.application_ref = 'PbcZa1mhWyFiEBqVmkf983X5a68343de4b6f'
    this.utilsService.getApplicationStep();
    this.initialData()
  }

  initialData() {
    this.initialStudent()
  }

  initialStudent() {
    this.applicationService.initialAcStudentView(this.student_ref).subscribe(
      data => {
        console.log(data)
        this.applyScholarshipForm.acStudent = data
        this.applyScholarshipForm.student_name = this.applyScholarshipForm.acStudent.first_name_t + ' ' + this.applyScholarshipForm.acStudent.last_name_t
        this.referenceService.getSchoolByRef(this.applyScholarshipForm.acStudent.school_ref).subscribe(
          data => {
            this.applyScholarshipForm.rftSchool = data
          })
        this.referenceService.getMajorByRef(this.applyScholarshipForm.acStudent.major_ref).subscribe(
          data => {
            this.applyScholarshipForm.rftMajor = data
          })
      }, error => {

      }, () => {
        setTimeout(() => {
          this.applicationService.initialApApplicationView(this.application_ref).subscribe(
            data => {
              console.log(data)
              this.applyScholarshipForm.apApplication = data
            }
          )
        }, 100);
        setTimeout(() => {
          this.ngprogress.done()
          this.pageRender = true
        }, 1000);
      })
  }
}
