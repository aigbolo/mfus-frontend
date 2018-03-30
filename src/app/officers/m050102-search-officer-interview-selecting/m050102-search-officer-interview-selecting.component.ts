import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmScholarshipAnnouncement } from '../../models/sm-scholarship-announcement';
import { M050102OfficerInterviewSelectingService } from '../../services/officers/m050102-officer-interview-selecting.service';
import { InterviewForm } from '../../forms/interview-form';
import { CalendarModel } from '../../models/calendar-model';
import { ReferenceService } from './../../services/general/reference.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-m050102-search-officer-interview-selecting',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m050102-search-officer-interview-selecting.component.html',
  styleUrls: ['./m050102-search-officer-interview-selecting.component.css']
})
export class M050102SearchOfficerInterviewSelectingComponent extends CalendarModel
implements OnInit {
  pageRender = false;
  searchForm: InterviewForm = new InterviewForm();
  announceList: SmScholarshipAnnouncement[] = [];
  announce: SmScholarshipAnnouncement = new SmScholarshipAnnouncement();
  onLoad = false;
  scholarshipList: any;
  scholarship: any;
  scholarshipAnnouncementList: any;
  scholarshipAnnouncement: any;


  //vadidation
  manageForm: InterviewForm = new InterviewForm();
  manageFormGroup: FormGroup;

  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private searchInterviewService: M050102OfficerInterviewSelectingService,
    private activateRoute: ActivatedRoute,
    public ngProgress: NgProgress) {
      super();
     }

  async ngOnInit() {
    this.layoutService.setPageHeader('บันทึกผู้มีสิทธิ์สัมภาษณ์');
    this.validatorForm();
    this.searchForm.search_criteria = await this.utilsService.castToObject(this.searchForm.search_criteria,this.activateRoute.snapshot.queryParams);

    this.scholarshipList = await this.referenceService.autocompleteScholarshipAnnouncementForSearch('');
    if(this.searchForm.search_criteria.announcement_ref!){
      var scholarship = await this.scholarshipList.filter((data)=>{
        if(data.announcement_ref == this.searchForm.search_criteria.announcement_ref){
          return data;
        }
      });
      this.scholarship = (scholarship.length == 1?scholarship[0]:null);
    }

    this.searchForm.search_criteria.interview_start_date = (this.searchForm.search_criteria.interview_start_date!?new Date(this.searchForm.search_criteria.interview_start_date):null);
    this.searchForm.search_criteria.interview_end_date = (this.searchForm.search_criteria.interview_end_date!?new Date(this.searchForm.search_criteria.interview_end_date):null);
    this.ngProgress.done();
    this.pageRender = true;
    if(this.searchForm.search_criteria.year!){
      this.doSearch();
    }
  }


  validatorForm() {
    this.manageFormGroup = new FormGroup({
      year: new FormControl(this.manageForm.search_criteria.year,Validators.compose([Validators.required])),
      announcement_ref: new FormControl(this.scholarship),
      interview_start_date: new FormControl(this.manageForm.search_criteria.interview_start_date),
      interview_end_date: new FormControl(this.manageForm.search_criteria.interview_end_date),
    });
  }

  onSearch() {
    this.utilsService.goToPageWithQueryParam('search-interview-selecting',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch() {
    this.onLoad = true;
    this.searchInterviewService.doSearch(this.searchForm).subscribe(data => {
      this.announceList = data;
    },
      error => {
        console.log(error);
      },
      () => {
        this.onLoad = false;
      });

  }

  onRowSelect(event) {
    console.log('onRowSelect..............');
    this.utilsService.goToPage('manage-interview-selecting/'+this.announce.announcement_ref)
  }

  onReset() {
    this.searchForm = new InterviewForm();
    this.announceList = [];
    this.scholarshipList = [];
    this.scholarship = null;
    this.searchForm.search_criteria.year = new Date().getFullYear();
    this.scholarshipAnnouncementList = [];
    this.scholarshipAnnouncement = null;
    this.utilsService.goToPage('search-interview-selecting');
  }


  autocompleteScholarshipAnnouncement(event) {
    console.log("autocompleteScholarshipAnnouncement");
    let e = event.originalEvent;
    let query = event.query;
    this.scholarshipAnnouncementList = [];

    if(e.type == 'input'){
      this.searchForm.search_criteria.announcement_ref = null;
    }
    let objList = [];
    objList = this.referenceService.getScholarshipAnnouncementsForSearch();
    for (let obj of objList) {
      // Filter By string event
      if (
        obj.name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        this.scholarshipAnnouncementList.push(obj);
      }
    }
  }

  handleCompleteClickScholarshipAnnouncement() {
    console.log("handleCompleteClickScholarshipAnnouncement");

    setTimeout(() => {
      this.scholarshipAnnouncementList = this.referenceService.getScholarshipAnnouncementsForSearch();
    }, 100);
  }

  onSelectScholarshipAnnouncement(){
    this.searchForm.search_criteria.announcement_ref = this.scholarshipAnnouncement.announcement_ref;
  }

}
