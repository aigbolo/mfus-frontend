import { ReferenceService } from './../../services/general/reference.service';
import { SmSponsors } from './../../models/sm-sponsors';
import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { ScholarshipAnnouncementForm } from './../../forms/scholarship-announcement-form';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { M030103ScholarshipAnnouncementService } from './../../services/officers/m030103-scholarship-announcement.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SmScholarship } from '../../models/sm-scholarship';

@Component({
  selector: 'app-m030103-search-scholarship-announcement',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m030103-search-scholarship-announcement.component.html',
  styleUrls: ['./m030103-search-scholarship-announcement.component.css']
})
export class M030103SearchScholarshipAnnouncementComponent implements OnInit {
  searchForm:ScholarshipAnnouncementForm = new ScholarshipAnnouncementForm;
  scholarshipAnnouncementList: any[] = [];
  scholarshipAnnouncement: SmScholarshipAnnouncement = new SmScholarshipAnnouncement;
  onLoad = false;

  sponsors: SmSponsors[] = [];
  sponsor: SmSponsors = new SmSponsors;
  scholarships: SmScholarship[] = [];
  scholarship: SmScholarship = new SmScholarship;

  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private scholarshipAnnouncementService: M030103ScholarshipAnnouncementService,
    private activateRoute: ActivatedRoute,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลประกาศทุนการศึกษา');
    this.referenceService.initialSponsors();
  }


  onSearch(){
    this.utilsService.goToPageWithQueryParam('search-scholarship-announcement',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){
    this.onLoad = true;

    this.scholarshipAnnouncementService.doSearch(this.searchForm).subscribe(data=>{
      this.scholarshipAnnouncementList = data;
    },
    error =>{
      console.log(error);
    },
    ()=>{
      this.onLoad = false;
    });

  }

  onRowSelect(event){
    this.utilsService.goToPage('manage-scholarship-announcement/'+this.scholarshipAnnouncement.announcement_ref)
  }

  onReset(){
    this.searchForm = new ScholarshipAnnouncementForm;
    this.scholarshipAnnouncementList = [];
    this.utilsService.goToPage('search-scholarship-announcement');
  }
  onPageInsert(){
    this.utilsService.goToPage('manage-scholarship-announcement');
  }

  autocompleteSponsors(event) {
    console.log("autocompleteSponsors");
    let query = event.query;
    this.sponsors = [];

    let objList: SmSponsors[];
    objList = this.referenceService.getSponsors();
    for (let obj of objList) {
      // Filter By string event
      if (
        obj.sponsors_name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        this.sponsors.push(obj);
      }
    }
  }

  handleCompleteClickSponsors() {
    console.log("handleCompleteClickSponsors");

    setTimeout(() => {
      this.sponsors = this.referenceService.getSponsors();
    }, 100);
  }

  onSelectSponsors(){
    this.searchForm.search_criteria.sponsors_ref = this.sponsor.sponsors_ref;
    this.referenceService.initialScholarships(this.sponsor.sponsors_ref);
    this.scholarship = new SmScholarship;
  }

  autocompleteScholarships(event) {
    console.log("autocompleteSponsors");
    let query = event.query;
    this.scholarships = [];

    let objList: SmScholarship[];
    objList = this.referenceService.getScholarships();
    for (let obj of objList) {
      // Filter By string event
      if (
        obj.scholarship_name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        this.scholarships.push(obj);
      }
    }
  }

  handleCompleteClickScholarships() {
    console.log("handleCompleteClickSponsors");

    setTimeout(() => {
      this.scholarships = this.referenceService.getScholarships();
    }, 100);
  }

  onSelectScholarship(){
    this.searchForm.search_criteria.scholarship_ref = this.scholarship.scholarship_ref;
  }

}
