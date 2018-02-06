import { NgProgress } from 'ngx-progressbar';
import { M050101ScholarshipsScreeningService } from './../../services/officers/m050101-scholarships-screening.service';
import { SelectItem } from 'primeng/primeng';
import { RftMajor } from './../../models/rft-major';
import { RftSchool } from './../../models/rft-school';
import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { ReferenceService } from './../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScholarshipScreeningForm } from '../../forms/scholarship-screening-form';

@Component({
  selector: 'app-m050101-search-scholarships-screening',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m050101-search-scholarships-screening.component.html',
  styleUrls: ['./m050101-search-scholarships-screening.component.css']
})
export class M050101SearchScholarshipsScreeningComponent implements OnInit {
  pageRender = false;
  searchForm: ScholarshipScreeningForm = new ScholarshipScreeningForm;
  searchFormGroup: FormGroup;

  scholarshipScreeningList: any[] = [];
  scholarshipScreening: any;

  scholarshipAnnouncementList: any[] = [];
  scholarshipAnnouncement: any;
  schoolList: RftSchool[];
  majorsList: RftMajor[];
  rftSchool: RftSchool = new RftSchool;
  rftMajor: RftMajor = new RftMajor;
  documentScreeningFlag: SelectItem[] = [];


  onLoad = false;

  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activateRoute: ActivatedRoute,
    private referenceService: ReferenceService,
    private scholarshipScreeningService: M050101ScholarshipsScreeningService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกคัดกรองเอกสาร");
    this.ngProgress.start();
    this.validatorForm();
    this.referenceService.initialSchools();
    this.setDocumentScreeningFlag();


      this.searchForm.search_criteria = this.utilsService.castToObject(this.searchForm.search_criteria,this.activateRoute.snapshot.queryParams);
        if(this.searchForm.search_criteria.year != null && this.searchForm.search_criteria.announcement_ref != null){
          setTimeout(
            ()=>{
            this.referenceService.initialScholarshipAnnouncementForSearch(this.searchForm.search_criteria.year);
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
          },500);
          setTimeout(
            ()=>{
              this.scholarshipAnnouncement = this.referenceService.getOneScholarshipAnnouncementForSearch(this.searchForm.search_criteria.announcement_ref);
              this.ngProgress.done();
              this.pageRender = true;

          },1000);
          setTimeout(
            ()=>{
              this.doSearch();
          },1100);

        }else{
          this.searchForm = new ScholarshipScreeningForm;
          this.searchForm.search_criteria.year = new Date().getFullYear();
          this.referenceService.initialScholarshipAnnouncementForSearch(this.searchForm.search_criteria.year);
          this.utilsService.goToPage('search-scholarship-screening');
          this.ngProgress.done();
          this.pageRender = true;
        }

  }

  setDocumentScreeningFlag(){
    this.documentScreeningFlag = [
      {value:null,label:'ไม่ระบุ'},
      {value:'1',label:'รอดำเนินการ'},
      {value:'2',label:'รอเอกสาร'},
      {value:'3',label:'ผ่าน'},
    ]
  }

  validatorForm() {

    this.searchFormGroup = new FormGroup({

      year: new FormControl(this.searchForm.search_criteria.year, Validators.compose([Validators.required])),
      announcement_ref: new FormControl(this.searchForm.search_criteria.announcement_ref, Validators.compose([Validators.required])),
      school_ref: new FormControl(this.searchForm.search_criteria.school_ref),
      major_ref: new FormControl(this.searchForm.search_criteria.major_ref),
      screening_status: new FormControl(this.searchForm.search_criteria.document_screening_flag),


    });
  }

  onSearch(){
    localStorage.setItem('currentSearchParam', JSON.stringify(this.searchForm.search_criteria));
    this.utilsService.goToPageWithQueryParam('search-scholarship-screening',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){
    if (this.searchFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.searchFormGroup);
    }else{
      this.onLoad = true;

      this.scholarshipScreeningService.doSearch(this.searchForm).subscribe(data=>{
        console.log(data)
        this.scholarshipScreeningList = data;
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
    this.utilsService.goToPage('manage-scholarship-screening/'+this.scholarshipScreening.application_ref);
  }

  onReset(){
    this.searchForm = new ScholarshipScreeningForm;
    this.scholarshipScreeningList = [];
    this.scholarshipScreening = null;
    this.scholarshipAnnouncementList = [];
    this.scholarshipAnnouncement = null;
    this.schoolList = [];
    this.majorsList = [];
    this.rftSchool =null;
    this.rftMajor = null;

    this.utilsService.goToPage('search-scholarship-screening');
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

  autoCompleteSchools(event) {
    let query = event.query;
    let e = event.originalEvent;
    this.schoolList = [];

    if(e.type == 'input'){
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

    if(e.type == 'input'){
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

  selectMajor(){
    this.searchForm.search_criteria.major_ref = this.rftMajor.major_ref;
  }

}
