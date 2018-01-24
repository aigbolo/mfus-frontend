import { M030101SponsorsService } from './../../services/officers/m030101-sponsors.service';
import { M030102ScholarshipService } from './../../services/officers/m030102-scholarship.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  searchFormGroup: FormGroup;
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
    private sponsorsService: M030101SponsorsService,
    private scholarshipService: M030102ScholarshipService,
    private activateRoute: ActivatedRoute,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลประกาศทุนการศึกษา');
    this.referenceService.initialSponsors();
    this.searchForm.search_criteria.year = new Date().getFullYear();
    this.validatorForm();
    if(JSON.stringify(this.activateRoute.snapshot.queryParams) != '{}'){
    this.searchForm.search_criteria = this.utilsService.castToObject(this.searchForm.search_criteria,this.activateRoute.snapshot.queryParams);
      if(this.searchForm.search_criteria.year != null
        || this.searchForm.search_criteria.round != null
        || this.searchForm.search_criteria.document_ref_no != null
        || this.searchForm.search_criteria.sponsors_ref != null
        || this.searchForm.search_criteria.scholarship_ref != null){
        this.doSearch();
        if(this.searchForm.search_criteria.sponsors_ref != null){
          let sponser = new SmSponsors;
          sponser.sponsors_ref = this.searchForm.search_criteria.sponsors_ref;
          this.sponsorsService.onRowSelect(sponser).subscribe(
            data=>{
              this.sponsor = data;
            },err=>{
              console.log(err);
            },
            ()=>{
              this.referenceService.initialScholarships(this.sponsor.sponsors_ref);
            }
          );
        }

        if(this.searchForm.search_criteria.scholarship_ref != null){
          let scholarship = new SmScholarship;
          scholarship.scholarship_ref = this.searchForm.search_criteria.scholarship_ref;
          this.scholarshipService.selectScholarship(scholarship).subscribe(
            data=>{
              this.scholarship = data;
            },err=>{
              console.log(err);
            }
          );
        }
      }
    }
  }

  validatorForm() {
    this.searchFormGroup = new FormGroup({

      year: new FormControl(this.searchForm.search_criteria.year, Validators.compose([Validators.required])),
      round: new FormControl(this.searchForm.search_criteria.round),
      document_ref_no: new FormControl(this.searchForm.search_criteria.document_ref_no),
      sponsors_name: new FormControl(this.searchForm.search_criteria.sponsors_ref),
      scholarship_name: new FormControl(this.searchForm.search_criteria.scholarship_ref),


    });
  }

  onSearch(){
    this.utilsService.goToPageWithQueryParam('search-scholarship-announcement',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){
    if (this.searchFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.searchFormGroup);
    }else{
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


  }

  onRowSelect(event){
    this.utilsService.goToPage('manage-scholarship-announcement/'+this.scholarshipAnnouncement.announcement_ref)
  }

  onReset(){
    this.searchForm = new ScholarshipAnnouncementForm;
    this.scholarshipAnnouncementList = [];
    this.sponsor = new SmSponsors;
    this.scholarship = new SmScholarship;
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
