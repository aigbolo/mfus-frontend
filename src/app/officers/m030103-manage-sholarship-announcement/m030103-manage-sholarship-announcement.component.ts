import { Severity } from './../../enum';
import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { CalendarModel } from './../../models/calendar-model';
import { SmScholarship } from './../../models/sm-scholarship';
import { SmSponsors } from './../../models/sm-sponsors';
import { ScholarshipAnnouncementForm } from './../../forms/scholarship-announcement-form';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { ReferenceService } from './../../services/general/reference.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { RftSchool } from '../../models/rft-school';
import { RftMajor } from '../../models/rft-major';
import { DatePipe } from '@angular/common';
import { M030103ScholarshipAnnouncementService } from '../../services/officers/m030103-scholarship-announcement.service';

@Component({
  selector: 'app-m030103-manage-sholarship-announcement',
  templateUrl: './m030103-manage-sholarship-announcement.component.html',
  styleUrls: ['./m030103-manage-sholarship-announcement.component.css']
})
export class M030103ManageSholarshipAnnouncementComponent extends CalendarModel implements OnInit {
  updateMode:boolean  = false;
  pageRender = false;
  user = localStorage.getItem('username');
  manageForm: ScholarshipAnnouncementForm = new ScholarshipAnnouncementForm;
  manageFormGroup: FormGroup;
  sponsors: SmSponsors[] = [];
  sponsor: SmSponsors = new SmSponsors;
  scholarships: SmScholarship[] = [];
  scholarship: SmScholarship = new SmScholarship;
  rftSchools: RftSchool[] = [];
  rftMajors: RftMajor[] = [];

  selectedCollageYears = [];
  selectedSchools = [];
  selectedMajors = [];

  image: string = null;
  imageName: string = "";
  uploadedFiles: any[] = [];

  constructor(private layoutService: LayoutService,
    private referenceService: ReferenceService,
    private scholarshipAnnouncementService: M030103ScholarshipAnnouncementService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress) {
      super();
     }

  ngOnInit() {
    this.ngProgress.start();
    this.layoutService.setPageHeader('บันทึกข้อมูลการประกาศทุนการศึกษา');
    this.initialReferences();
    this.validatorForm();

    if (this.route.snapshot.params["id"] != null) {
      this.manageForm.scholarships_announcement.announcement_ref = this.route.snapshot.params["id"];
      this.onUpdatePageSetup();
      this.updateMode = true;
    } else {
      this.ngProgress.done();
      this.pageRender = true;
    }

  }

  validatorForm() {
    this.manageFormGroup = new FormGroup({
      autocomplete_sponsors: new FormControl(this.sponsor, Validators.compose([Validators.required])),
      document_ref_no: new FormControl(this.manageForm.scholarships_announcement.document_ref_no),
      year: new FormControl(this.manageForm.scholarships_announcement.year, Validators.compose([Validators.required])),
      autocomplete_scholarships: new FormControl(this.scholarship, Validators.compose([Validators.required])),
      round: new FormControl(this.manageForm.scholarships_announcement.round),
      scholarship_type: new FormControl(this.manageForm.scholarships_announcement.scholarship_ref),
      unit: new FormControl(this.manageForm.scholarships_announcement.unit, Validators.compose([Validators.required])),
      financial_aid: new FormControl(this.manageForm.scholarships_announcement.financial_aid, Validators.compose([Validators.required,Validators.max(99999.99)])),
      min_gpax: new FormControl(this.manageForm.scholarships_announcement.min_gpax, Validators.compose([Validators.required, Validators.max(4.00),Validators.pattern('[0-4]+(\.?[0-9]{0,2})')])),
      collage_year: new FormControl(this.manageForm.scholarships_announcement.collage_year),
      schools: new FormControl(this.manageForm.scholarships_announcement.schools),
      majors: new FormControl(this.manageForm.scholarships_announcement.majors),
      announce_date: new FormControl(this.manageForm.scholarships_announcement.announce_date, Validators.compose([Validators.required])),
      registration_start_date: new FormControl(this.manageForm.scholarships_announcement.registration_start_date, Validators.compose([Validators.required])),
      registration_end_date: new FormControl(this.manageForm.scholarships_announcement.registration_end_date, Validators.compose([Validators.required])),
      announce_interview_date: new FormControl(this.manageForm.scholarships_announcement.announce_interview_date, Validators.compose([Validators.required])),
      interview_start_date: new FormControl(this.manageForm.scholarships_announcement.interview_start_date),
      interview_end_date: new FormControl(this.manageForm.scholarships_announcement.interview_end_date),
      announce_result_date: new FormControl(this.manageForm.scholarships_announcement.announce_result_date, Validators.compose([Validators.required])),

    });
  }

  initialReferences(){
    this.referenceService.getSchools().subscribe(
      data =>{
        this.rftSchools = data;

      },
      err=>{
        console.log(err);
      }
    );

    this.referenceService.initialSponsors();
    this.referenceService.initialScholarships(null);
  }

  onUpdatePageSetup(){

    this.layoutService.setPageHeader("แก้ไขข้อมูลการประกาศทุนการศึกษา");


    setTimeout(() => {
      this.scholarshipAnnouncementService.getScholarshipAnnouncement(this.manageForm.scholarships_announcement).subscribe(
        val=>{
          this.manageForm.scholarships_announcement = new SmScholarshipAnnouncement;
          this.manageForm.scholarships_announcement = val;
        },
        err=>{
          console.log(err);
        },
        ()=>{
          this.image = this.manageForm.scholarships_announcement.poster_file;
          this.imageName = this.manageForm.scholarships_announcement.poster_name;
          this.setupCollageSchoolsAndMajors();
          this.setupDate();
          setTimeout(() => {
            if(this.manageForm.scholarships_announcement.scholarship_ref != null){
              this.scholarships =  this.referenceService.getScholarships();
              for (let obj of this.scholarships){
                if(obj.scholarship_ref == this.manageForm.scholarships_announcement.scholarship_ref){
                    this.scholarship = obj;
                }
              }
            }
            setTimeout(()=>{
              if(this.scholarship.sponsors_ref != null){
                    this.sponsor = this.referenceService.getSponsor(this.scholarship.sponsors_ref)
                    this.pageRender = true;
                    this.ngProgress.done();
              }
            },1500);

          },1000);


        }
      )

      }, 500);
  }

  setupDate(){
    if(this.manageForm.scholarships_announcement.announce_date != null)
      this.manageForm.scholarships_announcement.announce_date = new Date(this.manageForm.scholarships_announcement.announce_date);
    if(this.manageForm.scholarships_announcement.registration_start_date != null)
      this.manageForm.scholarships_announcement.registration_start_date = new Date(this.manageForm.scholarships_announcement.registration_start_date);
    if(this.manageForm.scholarships_announcement.registration_end_date != null)
      this.manageForm.scholarships_announcement.registration_end_date = new Date(this.manageForm.scholarships_announcement.registration_end_date);
    if(this.manageForm.scholarships_announcement.announce_interview_date != null)
      this.manageForm.scholarships_announcement.announce_interview_date = new Date(this.manageForm.scholarships_announcement.announce_interview_date);
    if(this.manageForm.scholarships_announcement.interview_start_date != null)
      this.manageForm.scholarships_announcement.interview_start_date = new Date(this.manageForm.scholarships_announcement.interview_start_date);
    if(this.manageForm.scholarships_announcement.interview_end_date != null)
      this.manageForm.scholarships_announcement.interview_end_date = new Date(this.manageForm.scholarships_announcement.interview_end_date);
    if(this.manageForm.scholarships_announcement.announce_result_date != null)
      this.manageForm.scholarships_announcement.announce_result_date = new Date(this.manageForm.scholarships_announcement.announce_result_date);

  }

  setupCollageSchoolsAndMajors(){
    this.selectedCollageYears = [];
    this.selectedSchools = [];
    this.selectedMajors = [];
    console.log(this.manageForm.scholarships_announcement);
    if(this.manageForm.scholarships_announcement.collage_year != null)
    this.selectedCollageYears = this.manageForm.scholarships_announcement.collage_year.split(',');

    if(this.manageForm.scholarships_announcement.schools != null)
    this.selectedSchools = this.manageForm.scholarships_announcement.schools.split(',');
    this.initMajors();

    if(this.manageForm.scholarships_announcement.majors != null)
    this.selectedMajors = this.manageForm.scholarships_announcement.majors.split(',');

    console.log(this.selectedMajors);

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

  onSelectScholarship(){
    this.manageForm.scholarships_announcement.scholarship_ref = this.scholarship.scholarship_ref;
    this.manageForm.scholarships_announcement.unit = this.scholarship.unit;
    this.manageForm.scholarships_announcement.financial_aid = this.scholarship.financial_aid;
    this.getRound();
  }

  getRound(){
    if(this.manageForm.scholarships_announcement.year != null && this.scholarship.scholarship_ref != null){
      this.referenceService.getRoundAnnouncement(this.manageForm.scholarships_announcement.year,this.scholarship.scholarship_ref).subscribe(
        data=>{
          this.manageForm.scholarships_announcement.round = data;
        },
        err=>{
          console.log(err)
        }
      )
    }

  }

  onSelectCollageYear(){
    let collages = '';
    let isFirst = true;
    this.manageForm.scholarships_announcement.collage_year = '';
    setTimeout(() => {
      for (let obj of this.selectedCollageYears){
        if(!isFirst){
          collages = collages+','
        }
        collages = collages+obj;
        isFirst = false;
      }
      this.manageForm.scholarships_announcement.collage_year = collages;
      console.log(collages)
    }, 100);
  }

  onSelectSchools(){
    let schools = '';
    let isFirst = true;
    this.selectedMajors = [];
    this.manageForm.scholarships_announcement.majors = '';
    setTimeout(() => {
      for (let obj of this.selectedSchools){
        if(!isFirst){
          schools = schools+','
        }
        schools = schools+obj;
        isFirst = false;
      }
      this.manageForm.scholarships_announcement.schools = schools;
      console.log(schools)
    }, 100);


    this.initMajors();
  }

  initMajors(){
    setTimeout(() => {
      if(this.manageForm.scholarships_announcement.schools != ''){
      this.referenceService.getMajorBySchoolRef(this.manageForm.scholarships_announcement.schools).subscribe(
        data=>{
          this.rftMajors = data;
          console.log(this.rftMajors )
        },
        err=>{
          console.log(err);
        }
      )
      }
    }, 500);
  }

  onSelectMajors(){
    let majors = '';
    let isFirst = true;
    this.manageForm.scholarships_announcement.majors = '';
    setTimeout(() => {
      for (let obj of this.selectedMajors){
        if(!isFirst){
          majors = majors+','
        }
        majors = majors+obj;
        isFirst = false;
      }
      this.manageForm.scholarships_announcement.majors = majors;
      console.log(majors)
    }, 100);
  }

  onUpload(event) {
    console.log(event.files);
    if (event.files != null)
    this.uploadedFiles = [];


      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
      this.image = this.uploadedFiles[0].objectURL;
      this.imageName = this.uploadedFiles[0].name;
      this.manageForm.scholarships_announcement.poster_name = this.uploadedFiles[0].name;

    this.utilsService.convertBlobToString(this.uploadedFiles[0].objectURL)
      .subscribe(
        val => {
          this.manageForm.scholarships_announcement.poster_file  = val;
        },
        err => {
          console.log(err);
        }

      );

  }

  onSubmit(){
    console.log('onSubmit')

    if (this.manageFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.manageFormGroup);
    } else {
      this.manageForm.scholarships_announcement.create_user = this.user;
      this.manageForm.scholarships_announcement.update_user = this.user;

      if(this.manageForm.scholarships_announcement.announcement_ref == null){
        this.scholarshipAnnouncementService.doInsert(this.manageForm).subscribe(
          data=>{
            this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกข้อมูลสำเร็จ","");
          },
          err=>{
            this.layoutService.setMsgDisplay(Severity.ERROR,"บันทึกข้อมูลไม่สำเร็จ","");
            console.log(err);
          },
          ()=>{
            this.onInsertComplete();
          }
        )
      }else{
        this.scholarshipAnnouncementService.doUpdate(this.manageForm).subscribe(
          data=>{
            this.layoutService.setMsgDisplay(Severity.SUCCESS,"แก้ไขข้อมูลสำเร็จ","");
          },
          err=>{
            this.layoutService.setMsgDisplay(Severity.ERROR,"แก้ไขข้อมูลไม่สำเร็จ","");
            console.log(err);
          },()=>{
            this.onPageSearch();
          }
        )
      }

    }
  }

  onReset() {
    window.location.reload();
  }

  onInsertComplete() {
    this.image = null;
    this.manageForm = new ScholarshipAnnouncementForm;
    this.ngOnInit();
  }
  onPageSearch() {
    this.utilsService.goToPage("search-scholarship-announcement");
  }

}
