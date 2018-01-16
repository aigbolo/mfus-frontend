import { UtilsService } from './../../../services/utils/utils.service';
import { M040101ApplyScholarshipService } from './../../../services/students/m040101-apply-scholarship.service';
import { SmScholarshipAnnouncement } from './../../../models/sm-scholarship-announcement';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplyScholarshipsComponent } from '../apply-scholarships.component';
import { ApScholarshipHistory } from '../../../models/ap-scholarship-history';
import { ApStudentLoanFund } from '../../../models/ap-student-loan-fund';
import { ReferenceService } from '../../../services/general/reference.service';

@Component({
  selector: 'app-m040102-manage-scholarship-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040102-manage-scholarship-info.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040102ManageScholarshipInfoComponent implements OnInit {

  autocompleteScholarshipAnnouncementList: any[] = []
  initialList: any[] = []
  constructor(public applyApplication: ApplyScholarshipsComponent,
              private applyScholarshipService: M040101ApplyScholarshipService,
              private referenceService: ReferenceService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.initialScholarshipAnnouncement()
  }

  initialScholarshipAnnouncement() {
    console.log('initial Data')
    this.applyScholarshipService.initialScholarshipAnnouncement()
      .subscribe(data=> {
        this.initialList.push(...data);
        console.log('listScholarship' , this.initialList)
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

  selectedData(){
    console.log(this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement)
    this.applyApplication.applyApplicationForm.sponsors_name = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.sponsors_name
    this.applyApplication.applyApplicationForm.sctype_name = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.sctype_name
    this.applyApplication.applyApplicationForm.detail = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.detail
    this.applyApplication.applyApplicationForm.min_gpax = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.min_gpax
    this.applyApplication.applyApplicationForm.apApplication.annoucement_ref = this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.announcement_ref
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
    console.log(this.applyApplication.applyApplicationForm)
    this.referenceService.nextIndex(2)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
}
