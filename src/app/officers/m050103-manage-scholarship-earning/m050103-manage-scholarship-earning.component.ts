import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils/utils.service';
import { LayoutService } from '../../services/utils/layout.service';
import { M050103ScholarshipEarningService } from '../../services/officers/m050103-scholarship-earning.service';
import { NgProgress } from 'ngx-progressbar';
import { ScholarshipEarningForm } from '../../forms/scholarship-earning-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AcUser } from '../../models/ac-user';
import { SmScholarship } from '../../models/sm-scholarship';
import { SmSponsors } from '../../models/sm-sponsors';
import { RftMajor } from '../../models/rft-major';
import { RftSchool } from '../../models/rft-school';
import { ScholarshipAnnouncementForm } from '../../forms/scholarship-announcement-form';
import { AuthenticationService } from '../../services/general/authentication.service';
import { M030103ScholarshipAnnouncementService } from '../../services/officers/m030103-scholarship-announcement.service';
import { SmScholarshipAnnouncement } from '../../models/sm-scholarship-announcement';

@Component({
  selector: 'app-m050103-manage-scholarship-earning',
  templateUrl: './m050103-manage-scholarship-earning.component.html',
  styleUrls: ['./m050103-manage-scholarship-earning.component.css']
})
export class M050103ManageScholarshipEarningComponent implements OnInit {

  pageRender = false;

  searchForm: ScholarshipEarningForm = new ScholarshipEarningForm;
  searchFormGroup: FormGroup;
  scholarshipAnnouncementList: any[] = [];
  scholarshipAnnouncement: any;

  scholarshipEarningList: any[] = [];
  scholarshipEarning: any;
  onLoad:boolean = false;


  updateMode:boolean  = false;
  user: AcUser = new AcUser;
  manageFormGroup: FormGroup;
  manageForm: ScholarshipEarningForm = new ScholarshipEarningForm;
  sponsors: SmSponsors[] = [];
  sponsor: SmSponsors = new SmSponsors;
  scholarships: SmScholarship[] = [];
  scholarship: SmScholarship = new SmScholarship;
  rftSchools: RftSchool[] = [];
  rftMajors: RftMajor[] = [];

  selectedCollageYears = [];
  selectedSchools = [];
  selectedMajors = [];

  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activateRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private referenceService: ReferenceService,
    private scholarshipEarningService: M050103ScholarshipEarningService,
    private scholarshipAnnouncementService: M030103ScholarshipAnnouncementService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.layoutService.setPageHeader("บันทึกผู้ได้รับทุนการศึกษา");
    this.ngProgress.start();
    // this.validatorForm();
    this.ngProgress.done();
  }

  // validatorForm() {
  //   this.manageFormGroup = new FormGroup({
  //     autocomplete_sponsors: new FormControl(this.sponsor, Validators.compose([Validators.required])),
  //     document_ref_no: new FormControl(this.manageForm.scholarships_earning.document_ref_no),
  //     year: new FormControl(this.manageForm.scholarships_earning.year, Validators.compose([Validators.required])),
  //     autocomplete_scholarships: new FormControl(this.scholarship, Validators.compose([Validators.required])),
  //     round: new FormControl(this.manageForm.scholarships_earning.round),
  //     scholarship_type: new FormControl(this.manageForm.scholarships_earning.scholarship_ref),
  //     unit: new FormControl(this.manageForm.scholarships_earning.unit, Validators.compose([Validators.required])),
  //     financial_aid: new FormControl(this.manageForm.scholarships_earning.financial_aid, Validators.compose([Validators.required,Validators.max(99999.99)])),
  //     announce_interview_date: new FormControl(this.manageForm.scholarships_earning.announce_interview_date, Validators.compose([Validators.required])),
  //     });
  // }

  // setupDate(){
   
  //   if(this.manageForm.scholarships_earning.announce_interview_date != null)
  //     this.manageForm.scholarships_earning.announce_interview_date = new Date(this.manageForm.scholarships_earning.announce_interview_date);
  // }

  // autocompleteScholarships(event) {
  //   console.log("autocompleteSponsors");
  //   let query = event.query;
  //   this.scholarships = [];

  //   let objList: SmScholarship[];
  //   objList = this.referenceService.getScholarships();
  //   for (let obj of objList) {
  //     // Filter By string event
  //     if (
  //       obj.scholarship_name.toLowerCase().indexOf(query.toLowerCase()) == 0
  //     ) {
  //       this.scholarships.push(obj);
  //     }
  //   }
  // }

  // onSelectScholarship(){
  //   this.manageForm.scholarships_earning.scholarship_ref = this.scholarship.scholarship_ref;
  //   this.manageForm.scholarships_earning.unit = this.scholarship.unit;
  //   this.manageForm.scholarships_earning.financial_aid = this.scholarship.financial_aid;
  //   this.getRound();
  // }

  // getRound(){
  //   if(this.manageForm.scholarships_earning.year != null && this.scholarship.scholarship_ref != null){
  //     this.referenceService.getRoundAnnouncement(this.manageForm.scholarships_earning.year,this.scholarship.scholarship_ref).subscribe(
  //       data=>{
  //         this.manageForm.scholarships_earning.round = data;
  //       },
  //       err=>{
  //         console.log(err)
  //       }
  //     )
  //   }

  // }

  onSubmit() {
    console.log("onSubmit");
  }
  
  onBack() {
  this.utilsService.goToPage('search-scholarship-earning');
  }
  onReset(){
    window.location.reload();
  }

  ///////////////////
  onInsertComplete() {

    this.manageForm = new ScholarshipEarningForm;
  
    this.scholarships = [];
    this.scholarship = new SmScholarship;

    this.ngOnInit();
  }

}
