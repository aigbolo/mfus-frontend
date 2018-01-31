import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmScholarshipAnnouncement } from '../../models/sm-scholarship-announcement';
import { M050102OfficerInterviewSelectingService } from '../../services/officers/m050102-officer-interview-selecting.service';
import { InterviewForm } from '../../forms/interview-form';


@Component({
  selector: 'app-m050102-search-officer-interview-selecting',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m050102-search-officer-interview-selecting.component.html',
  styleUrls: ['./m050102-search-officer-interview-selecting.component.css']
})
export class M050102SearchOfficerInterviewSelectingComponent implements OnInit {
  searchForm: InterviewForm = new InterviewForm();
  announceList: SmScholarshipAnnouncement[] = [];
  announce: SmScholarshipAnnouncement = new SmScholarshipAnnouncement();
  onLoad = false;
  sub: any;
  page: any;

  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private searchInterviewService: M050102OfficerInterviewSelectingService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลผู้ให้ทุนการศึกษา');
    if (JSON.stringify(this.activateRoute.snapshot.queryParams) != '{}') {
      this.searchForm.search_criteria = this.utilsService.castToObject(this.searchForm.search_criteria, this.activateRoute.snapshot.queryParams);
      if (this.searchForm.search_criteria.year != null ||
        this.searchForm.search_criteria.scholarship_ref != null ||
        this.searchForm.search_criteria.interview_start_date != null ||
        this.searchForm.search_criteria.interview_end_date != null) {
        this.doSearch();
      }
    }
  }

  onSearch() {
    //this.utilsService.goToPageWithQueryParam('search-sponsors',this.searchForm.search_criteria);
    //this.doSearch();
  }

  doSearch() {
    this.onLoad = true;
    this.searchInterviewService.doSearch(this.searchForm).subscribe(data => {
      this.announceList = data;
    },
      error => {
        console.log('error..............');
      },
      () => {
        this.onLoad = false;
      });

  }

  onRowSelect(event) {
    console.log('onRowSelect..............');
    //this.utilsService.goToPage('manage-sponsors/'+this.sponsor.sponsors_ref)
  }

  onReset() {
    this.searchForm = new InterviewForm();
    this.announceList = [];
    //this.utilsService.goToPage('search-sponsors');
  }

}
