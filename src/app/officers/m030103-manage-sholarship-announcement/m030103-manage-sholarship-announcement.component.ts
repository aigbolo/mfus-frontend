import { CalendarModel } from './../../models/calendar-model';
import { SmScholarship } from './../../models/sm-scholarship';
import { SmSponsors } from './../../models/sm-sponsors';
import { ScholarshipAnnouncementForm } from './../../forms/scholarship-announcement-form';
import { FormGroup } from '@angular/forms';
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

    this.referenceService.initalSponsors();
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
