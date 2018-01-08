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

@Component({
  selector: 'app-m030103-manage-sholarship-announcement',
  templateUrl: './m030103-manage-sholarship-announcement.component.html',
  styleUrls: ['./m030103-manage-sholarship-announcement.component.css']
})
export class M030103ManageSholarshipAnnouncementComponent extends CalendarModel implements OnInit {
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
  constructor(private layoutService: LayoutService,
    private referenceService: ReferenceService,
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
  }

  validatorForm() {
    this.manageFormGroup = new FormGroup({
      autocomplete_sponsors: new FormControl(this.sponsor, Validators.compose([Validators.required])),
      document_ref_no: new FormControl(this.manageForm.scholarships_announcement.document_ref_no, Validators.compose([Validators.required])),
      year: new FormControl(this.manageForm.scholarships_announcement.year, Validators.compose([Validators.required])),
      autocomplete_scholarships: new FormControl(this.scholarship, Validators.compose([Validators.required])),
      round: new FormControl(this.manageForm.scholarships_announcement.round),
      scholarship_type: new FormControl(this.manageForm.scholarships_announcement.scholarship_ref),
      unit: new FormControl(this.manageForm.scholarships_announcement.unit, Validators.compose([Validators.required])),
      financial_aid: new FormControl(this.manageForm.scholarships_announcement.financial_aid, Validators.compose([Validators.required])),
      min_gpax: new FormControl(this.manageForm.scholarships_announcement.min_gpax, Validators.compose([Validators.required])),
      collage_year: new FormControl(this.manageForm.scholarships_announcement.collage_year),
      schools: new FormControl(this.selectedSchools),
      majors: new FormControl(this.selectedMajors),
      announce_date: new FormControl(this.manageForm.scholarships_announcement.announce_date, Validators.compose([Validators.required])),
      registration_start_date: new FormControl(this.manageForm.scholarships_announcement.registration_start_date, Validators.compose([Validators.required])),
      registration_end_date: new FormControl(this.manageForm.scholarships_announcement.registration_end_date, Validators.compose([Validators.required])),
      announce_interview_date: new FormControl(this.manageForm.scholarships_announcement.announce_interview_date, Validators.compose([Validators.required])),
      interview_start_date: new FormControl(this.manageForm.interview_start_date),
      interview_end_date: new FormControl(this.manageForm.interview_end_date),
      announce_result_date: new FormControl(this.manageForm.announce_result_date, Validators.compose([Validators.required])),

    });
  }

  initialReferences(){
    this.referenceService.getSchools().subscribe(
      data =>{
        this.rftSchools = data;
        console.log(this.rftSchools);
      },
      err=>{
        console.log(err);
      }
    );

    this.referenceService.initialSponsors();
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

  onChangeSchools(){
    let schools = '';
    let isFirst = true;
    this.selectedMajors = [];
    setTimeout(() => {
      for (let obj of this.selectedSchools){
        if(!isFirst){
          schools = schools+','
        }
        schools = schools+obj;
        isFirst = false;
      }
      console.log(schools)
    }, 100);

    setTimeout(() => {
      if(schools != ''){
      this.referenceService.getMajorBySchoolRef(schools).subscribe(
        data=>{
          this.rftMajors = data;
          console.log(this.rftMajors )
        },
        err=>{
          console.log(err);
        }
      )
      }
    }, 1000);

  }


  onSubmit(){

  }

}
