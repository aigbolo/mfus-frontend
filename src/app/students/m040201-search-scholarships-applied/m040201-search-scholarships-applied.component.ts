import { ReferenceService } from './../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { SmScholarship } from './../../models/sm-scholarship';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApplyScholarshipForm } from '../../forms/apply-scholarship-form';

@Component({
  selector: 'app-m040201-search-scholarships-applied',
  templateUrl: './m040201-search-scholarships-applied.component.html',
  styleUrls: ['./m040201-search-scholarships-applied.component.css']
})
export class M040201SearchScholarshipsAppliedComponent implements OnInit {
  searchForm:ApplyScholarshipForm = new ApplyScholarshipForm;
  searchFormGroup: FormGroup;
  scholarshipAnnouncementList: any[] = [];
  scholarship: SmScholarship = new SmScholarship;
  onLoad = false;


  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activateRoute: ActivatedRoute,
    private applyScholarship: ApplyScholarshipForm,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ตรวจสอบสถานะทุนการศึกษา');
    this.referenceService.initialSponsors();
    this.searchForm.search_criteria.year = new Date().getFullYear();
    this.validatorForm();
  }

  validatorForm() {
    this.searchFormGroup = new FormGroup({

      year: new FormControl(this.searchForm.search_criteria.year, Validators.compose([Validators.required])),
      application_code: new FormControl(this.searchForm.search_criteria.application_code),
      process_status: new FormControl(this.searchForm.search_criteria.process_status),
      scholarship_name: new FormControl(this.searchForm.search_criteria.scholarship_ref),


    });
  }

  onSearch(){
    this.utilsService.goToPageWithQueryParam('search-sholarships-applied',this.searchForm.search_criteria);
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
