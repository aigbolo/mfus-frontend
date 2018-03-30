import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from './../../../services/utils/utils.service';
import { M040101ApplyScholarshipService } from './../../../services/students/m040101-apply-scholarship.service';
import { SmScholarshipAnnouncement } from './../../../models/sm-scholarship-announcement';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplyScholarshipsComponent } from '../apply-scholarships.component';
import { ApScholarshipHistory } from '../../../models/ap-scholarship-history';
import { ApStudentLoanFund } from '../../../models/ap-student-loan-fund';
import { ReferenceService } from '../../../services/general/reference.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-m040102-manage-scholarship-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040102-manage-scholarship-info.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040102ManageScholarshipInfoComponent implements OnInit {

  scholarshipFormGroup: FormGroup;
  autocompleteScholarshipAnnouncementList: any[] = [];
  apScholarshipHistory: ApScholarshipHistory;
  apStudentLoanFund: ApStudentLoanFund;
  initialList: any[] = [];
  constructor(public applyApplication: ApplyScholarshipsComponent,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private referenceService: ReferenceService,
    private utilsService: UtilsService,
    private ngProgress: NgProgress) { }

  ngOnInit() {
    this.apScholarshipHistory = new ApScholarshipHistory();

    this.ngProgress.start();
    this.initialScholarshipAnnouncement();
    this.validateForm();
  }

  validateForm() {
    this.scholarshipFormGroup = new FormGroup({
      scholarshipAnnouncementName: new FormControl(this.applyApplication.applyApplicationForm.smScholarshipAnnouncement,
        Validators.compose([Validators.required])),
      money_spend_plan: new FormControl(this.applyApplication.applyApplicationForm.apApplication.money_spend_plan,
        Validators.compose([Validators.required])),
    })
  }

  initialScholarshipAnnouncement() {
    this.applyScholarshipService.initialScholarshipAnnouncementList()
      .subscribe(data => {
        for (let obj of data) {
          if (this.applyApplication.applyApplicationForm.apApplication.gpax >= obj.min_gpax) {
              this.initialList.push(obj);
          }
        }
        this.applyApplication.pageRender = true;
        this.ngProgress.done();
      }, error => {
        console.log(error);
      })
  }

  autocompleteScholarship(event) {
    let query = event.query;
    this.autocompleteScholarshipAnnouncementList = []
    let objList: any[];
    objList = this.initialList;
    for (let obj of objList) {
      if (obj.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.autocompleteScholarshipAnnouncementList.push(obj);
      }
    }
  }

  handleCompleteClickautocompleteScholarship(event) {
    setTimeout(() => {
      this.autocompleteScholarshipAnnouncementList = []
      this.autocompleteScholarshipAnnouncementList = this.initialList
    }, 100)
  }

  selectedData() {
    this.applyApplication.applyApplicationForm.sponsors_name = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.sponsors_name
    this.applyApplication.applyApplicationForm.sctype_name = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.sctype_name
    this.applyApplication.applyApplicationForm.detail = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.detail
    this.applyApplication.applyApplicationForm.min_gpax = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.min_gpax
    this.applyApplication.applyApplicationForm.apApplication.announcement_ref = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.announcement_ref
  }

  addScholarship() {
    this.apScholarshipHistory = new ApScholarshipHistory()
    this.apScholarshipHistory.create_user = this.applyApplication.user_ref
    this.apScholarshipHistory.update_user = this.applyApplication.user_ref
    this.apScholarshipHistory.student_ref = this.applyApplication.account_ref
    this.applyApplication.applyApplicationForm.apScholarshipHistory.push(this.apScholarshipHistory)
  }

  deleteScholarship(obj: ApScholarshipHistory) {
    this.applyApplication.applyApplicationForm.apScholarshipHistory.splice(this.applyApplication.applyApplicationForm.apScholarshipHistory.indexOf(obj), 1);
  }

  addStdLoan() {
    console.log(this.apStudentLoanFund);
    this.apStudentLoanFund = new ApStudentLoanFund();
    this.apStudentLoanFund.create_user = this.applyApplication.user_ref;
    this.apStudentLoanFund.update_user = this.applyApplication.user_ref;
    this.apStudentLoanFund.student_ref = this.applyApplication.account_ref;
    this.applyApplication.applyApplicationForm.apStudentLoanFund.push(this.apStudentLoanFund);
    console.log(this.applyApplication.applyApplicationForm.apStudentLoanFund);
  }

  deleteStdLoan(obj: ApStudentLoanFund) {
    this.applyApplication.applyApplicationForm.apStudentLoanFund.splice(this.applyApplication.applyApplicationForm.apStudentLoanFund.indexOf(obj), 1)
  }

  onNext() {
    if (this.scholarshipFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.scholarshipFormGroup);
      return;
    }
    this.applyApplication.applyApplicationForm.apApplication.create_user = this.applyApplication.user_ref
    this.applyApplication.applyApplicationForm.apApplication.update_user = this.applyApplication.user_ref
    this.referenceService.nextIndex(2)
    this.utilsService.activeIndex = this.referenceService.getIndex()
    this.applyApplication.pageRender = false
  }

  onPrevious() {
    this.referenceService.nextIndex(0)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
}
