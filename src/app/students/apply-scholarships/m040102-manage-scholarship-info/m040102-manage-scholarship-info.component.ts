import { M040101ApplyScholarshipService } from './../../../services/students/m040101-apply-scholarship.service';
import { SmScholarshipAnnouncement } from './../../../models/sm-scholarship-announcement';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplyScholarshipsComponent } from '../apply-scholarships.component';
import { ApScholarshipHistory } from '../../../models/ap-scholarship-history';
import { ApStudentLoanFund } from '../../../models/ap-student-loan-fund';

@Component({
  selector: 'app-m040102-manage-scholarship-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040102-manage-scholarship-info.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040102ManageScholarshipInfoComponent implements OnInit {

  scholarshipList: SmScholarshipAnnouncement[] = [];
  listScholarship: SmScholarshipAnnouncement[] = [];
  constructor(public applyApplication: ApplyScholarshipsComponent,
              private applyScholarshipService: M040101ApplyScholarshipService) { }

  ngOnInit() {
  }

  searchScholarshipAnnouncementFromYear() {
    this.listScholarship = []
    this.scholarshipList = []
    this.applyScholarshipService.searchScholarshipAnnouncementFromYear(this.applyApplication.applyApplicationForm.year)
      .subscribe(
      (res: any[]) => {
        console.log(res)
        this.listScholarship.push(...res);
      })
  }

  selectedData(){

  }

  autocompleteScholarship(event) {
    let query = event.query;
    this.scholarshipList = [];
    let objList: SmScholarshipAnnouncement[];
    objList = this.listScholarship;
    for (let obj of objList) {
      if (obj.scholarship_ref.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.scholarshipList.push(obj);
      }
    }
    console.log(this.scholarshipList)
  }

  handleCompleteClickautocompleteScholarship(event) {
    this.scholarshipList = [];
    setTimeout(() => {
      this.scholarshipList = this.listScholarship;
      console.log(this.scholarshipList)
    }, 100)
  }

  addScholarship(){
    this.applyApplication.applyApplicationForm.apScholarshipHistory.push(new ApScholarshipHistory)
  }

  deleteScholarship(obj: ApScholarshipHistory){
    this.applyApplication.applyApplicationForm.apScholarshipHistory.splice(this.applyApplication.applyApplicationForm.apScholarshipHistory.indexOf(obj), 1);
  }

  addStdLoan(){
    this.applyApplication.applyApplicationForm.apStudentLoanFund.push(new ApStudentLoanFund)
  }

  deleteStdLoan(obj: ApStudentLoanFund){
    this.applyApplication.applyApplicationForm.apStudentLoanFund.splice(this.applyApplication.applyApplicationForm.apStudentLoanFund.indexOf(obj), 1)
  }

  onNext(){
    console.log(this.applyApplication.applyApplicationForm.apApplication.money_spend_plan)
  }
}
