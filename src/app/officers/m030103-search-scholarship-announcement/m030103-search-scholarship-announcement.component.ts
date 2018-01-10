import { ReferenceService } from './../../services/general/reference.service';
import { SmSponsors } from './../../models/sm-sponsors';
import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { ScholarshipAnnouncementForm } from './../../forms/scholarship-announcement-form';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { M030103ScholarshipAnnouncementService } from './../../services/officers/m030103-scholarship-announcement.service';
import { Component, OnInit } from '@angular/core';
import { SmScholarship } from '../../models/sm-scholarship';

@Component({
  selector: 'app-m030103-search-scholarship-announcement',
  templateUrl: './m030103-search-scholarship-announcement.component.html',
  styleUrls: ['./m030103-search-scholarship-announcement.component.css']
})
export class M030103SearchScholarshipAnnouncementComponent implements OnInit {
  searchForm:ScholarshipAnnouncementForm = new ScholarshipAnnouncementForm;
  scholarshipAnnouncements: SmScholarshipAnnouncement[] = [];
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
    this.utilsService.goToPageWithQueryParam('search-sponsors',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){
    this.onLoad = true;
    this.scholarshipAnnouncementService.doSearch(this.searchForm).subscribe(data=>{
      this.scholarshipAnnouncements = data;
    },
    error =>{
      console.log('error..............');
    },
    ()=>{
      this.onLoad = false;
    });

  }

  onRowSelect(event){
    console.log('onRowSelect..............');
    this.utilsService.goToPage('manage-sponsors/'+this.scholarshipAnnouncement.announcement_ref)
  }

  onReset(){
    this.searchForm = new ScholarshipAnnouncementForm;
    this.scholarshipAnnouncements = [];
    this.utilsService.goToPage('search-sponsors');
  }
  onPageInsert(){
    this.utilsService.goToPage('manage-sponsors');
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
    this.referenceService.initialScholarships(this.sponsor.sponsors_ref)
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


}
