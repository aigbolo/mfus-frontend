import { ScholarshipEarnCheckService } from './../../services/officers/scholship-earn-check.service';
import { SmScholarship } from './../../models/sm-scholarship';
import { RftMajor } from './../../models/rft-major';
import { RftSchool } from './../../models/rft-school';
import { ScholarshipEarnCheckForm } from "./../../forms/scholarship-earn-check";
import { UtilsService } from "./../../services/utils/utils.service";
import { LayoutService } from "./../../services/utils/layout.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SmScholarshipAnnouncement } from "../../models/sm-scholarship-announcement";
import { CalendarModel } from "../../models/calendar-model";
import { ReferenceService } from "./../../services/general/reference.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgProgress } from "ngx-progressbar";

@Component({
  selector: "app-check-scholarship-earning",
  templateUrl: "./check-scholarship-earning.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./check-scholarship-earning.component.css"]
})
export class CheckScholarshipEarningComponent implements OnInit {
  pageRender = false;
  searchForm: ScholarshipEarnCheckForm = new ScholarshipEarnCheckForm();
  searchFormGroup: FormGroup;

  scholarshipAnnouncementList: any[] = [];
  studentEarnList: any[] = [];
  scholarshipAnnouncement: any;
  schoolList: RftSchool[];
  majorsList: RftMajor[];
  rftSchool: RftSchool = new RftSchool;
  rftMajor: RftMajor = new RftMajor;

  scholarships: SmScholarship[] = [];
  scholarship: SmScholarship = new SmScholarship;

  onLoad = false;

  constructor(
    private layoutService: LayoutService,
    private utilsService: UtilsService,
    private scholarshipEarnCheckService: ScholarshipEarnCheckService,
    private referenceService: ReferenceService,
    private activateRoute: ActivatedRoute,
    public ngProgress: NgProgress
  ) {}

  ngOnInit() {
    this.layoutService.setPageHeader("ตรวจสอบนักศึกษาที่ได้รับทุน");
    this.ngProgress.start();
    this.validatorForm();
    this.referenceService.initialSchools();

    this.searchForm.search_criteria = this.utilsService.castToObject(
      this.searchForm.search_criteria,
      this.activateRoute.snapshot.queryParams
    );
    if (this.searchForm.search_criteria.year && this.searchForm.search_criteria.scholarship_ref != null) {
      setTimeout(() => {
        this.referenceService.initialScholarships(null);
        if(this.searchForm.search_criteria.school_ref != null){
          this.referenceService.initialMajors(this.searchForm.search_criteria.school_ref);
           this.referenceService.getSchoolByRef(this.searchForm.search_criteria.school_ref).subscribe(
            data=>{
              this.rftSchool = data;
            },
            err=>{
              console.log(err);
            }
          );
        }
        if(this.searchForm.search_criteria.major_ref != null){
          this.referenceService.getMajorByRef(this.searchForm.search_criteria.major_ref).subscribe(
            data=>{
              this.rftMajor = data;
            },
            err=>{
              console.log(err);
            }
          )
        }
      }, 500);
      setTimeout(
        ()=>{
          this.scholarships = this.referenceService.getScholarships();
          this.ngProgress.done();
          this.pageRender = true;

      }, 1000);
      setTimeout(
        ()=>{
          this.doSearch();
      },1100);
    } else {
      this.searchForm = new ScholarshipEarnCheckForm();
      this.searchForm.search_criteria.year = new Date().getFullYear();
      this.referenceService.initialScholarships(
        this.searchForm.search_criteria.scholarship_ref
      );
      this.utilsService.goToPage('check-scholarship-earning');
      this.ngProgress.done();
      this.pageRender = true;
    }
  }
//////////// search critiria ////////////////////
  validatorForm() {

    this.searchFormGroup = new FormGroup({
      year: new FormControl(this.searchForm.search_criteria.year, Validators.compose([Validators.required])),
      scholarship_name: new FormControl(this.searchForm.search_criteria.scholarship_ref),
      school_ref: new FormControl(this.searchForm.search_criteria.school_ref),
      major_ref: new FormControl(this.searchForm.search_criteria.major_ref),
      round: new FormControl(this.searchForm.search_criteria.round),
      student_id: new FormControl(this.searchForm.search_criteria.student_id)
    });
  }

  onSearch(){
    localStorage.setItem('currentSearchParam', JSON.stringify(this.searchForm.search_criteria));
    this.utilsService.goToPageWithQueryParam('check-scholarship-earning',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){
    if (this.searchFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.searchFormGroup);
    }else{
      this.onLoad = true;

      this.scholarshipEarnCheckService.doSearch(this.searchForm).subscribe(data=>{
        this.studentEarnList = data;
      },
      error =>{
        console.log(error);
      },
      ()=>{
        this.onLoad = false;
      });
    }
  }


  onReset(){
    this.searchForm = new ScholarshipEarnCheckForm;
    this.studentEarnList = [];

    this.scholarships = [];
    this.scholarship = null;
    this.searchForm.search_criteria.year = null;
    this.searchForm.search_criteria.round = null;
    this.searchForm.search_criteria.student_id = null;
    this.schoolList = [];
    this.majorsList = [];
    this.rftSchool =null;
    this.rftMajor = null;

    this.utilsService.goToPage('check-scholarship-earning');
  }



/////////////////////////////////////// auotocompleate here ////////////////////////



autocompleteScholarships(event) {
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

  setTimeout(() => {
    this.scholarships = this.referenceService.getScholarships();
  }, 100);
}

onSelectScholarship(){
  this.searchForm.search_criteria.scholarship_ref = this.scholarship.scholarship_ref;
}


  autoCompleteSchools(event) {
    let query = event.query;
    let e = event.originalEvent;
    this.schoolList = [];

    if (e.type == "input") {
      this.searchForm.search_criteria.school_ref = null;
      this.searchForm.search_criteria.major_ref = null;
      this.rftMajor = null;
    }
    let objList: RftSchool[];
    objList = this.referenceService.getSchool();
    for (let obj of objList) {
      if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.schoolList.push(obj);
      }
    }
  }

  handleCompleteClickSchools() {
    setTimeout(() => {
      this.schoolList = this.referenceService.getSchool();
    }, 100);
  }

  selectSchool() {
    this.referenceService.initialMajors(this.rftSchool.school_ref);
    this.searchForm.search_criteria.school_ref = this.rftSchool.school_ref;
    this.rftMajor = new RftMajor();
    this.searchForm.search_criteria.major_ref = null;
  }

  autoCompleteMajor(event) {
    let query = event.query;
    let e = event.originalEvent;
    this.majorsList = [];

    if (e.type == "input") {
      this.searchForm.search_criteria.major_ref = null;
    }
    let objList: RftMajor[];
    objList = this.referenceService.getMajors();
    console.log(objList);
    for (let obj of objList) {
      if (obj.major_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.majorsList.push(obj);
      }
    }
  }

  handleCompleteClickMajor() {
    setTimeout(() => {
      this.majorsList = this.referenceService.getMajors();
    }, 100);
  }

  selectMajor() {
    this.searchForm.search_criteria.major_ref = this.rftMajor.major_ref;
  }
/////////////////////////////// End of autocompleate ////////////////////////////////////////
}
