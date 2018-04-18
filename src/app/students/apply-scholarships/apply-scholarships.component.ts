import { M040102ManageScholarshipInfoComponent } from './m040102-manage-scholarship-info/m040102-manage-scholarship-info.component';
import { M010101StudentService } from './../../services/students/m010101-student.service';
import { ActivatedRoute } from '@angular/router';
import { RftEducationLevel } from './../../models/rft-education-level';
import { AddressService } from './../../services/utils/address.service';
import { AcOfficer } from './../../models/ac-officer';
import { AcStudent } from './../../models/ac-student';
import { AcUser } from './../../models/ac-user';
import { AuthenticationService } from './../../services/general/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LayoutService } from "./../../services/utils/layout.service";
import { UtilsService } from "./../../services/utils/utils.service";
import { MenuItem } from "primeng/primeng";
import { Component, ViewEncapsulation, ViewChild, AfterViewInit } from "@angular/core";
import { ApplyScholarshipForm } from "../../forms/apply-scholarship-form";
import { M040101ApplyScholarshipService } from "../../services/students/m040101-apply-scholarship.service";
import { ReferenceService } from "../../services/general/reference.service";
import { NgProgress } from 'ngx-progressbar';
import { M020103FamilyAndAddressService } from '../../services/students/m020103-family-and-address.service';
import { M040101ManageApplicantInfoComponent } from './m040101-manage-applicant-info/m040101-manage-applicant-info.component';

@Component({
  selector: "app-apply-scholarships",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./apply-scholarships.component.html",
  styleUrls: ["./apply-scholarships.component.css"]
})
export class ApplyScholarshipsComponent implements AfterViewInit{
  pageRender: boolean = false
  applyApplicationForm: ApplyScholarshipForm = new ApplyScholarshipForm();
  items: MenuItem[] = [];
  activeIndex:number = 0;

  user: AcUser =  this.authService.getUser();


  constructor(
    private layoutService: LayoutService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    public utilsService: UtilsService,
    private referenceService: ReferenceService,
    private ngProgress: NgProgress,
    private authService: AuthenticationService,
  ) { }

  ngAfterViewInit() {
    this.layoutService.setPageHeader('ยื่นความจำนงขอทุนการศึกษา');

    setTimeout(()=>{
      this.pageRender = true;

    },1000);
  }
  ngAfterContentInit() {
    this.activeIndex = 0;
    this.applyApplicationForm = new ApplyScholarshipForm;
    this.getApplicationStep();
  }

  getApplicationStep(){
    this.items = [
      { label: "ข้อมูลผู้ขอทุน", command: (event: any) => { this.activeIndex = 0;} },
      { label: "ข้อมูลทุนการศึกษา", command: (event: any) => {this.activeIndex = 1;}},
      { label: "ข้อมูลสถานะทางการเงินของครอบครัว", command: (event: any) => {this.activeIndex = 2;}},
      { label: "ข้อมูลครอบครัวและที่อยู่", command: (event: any) => {this.activeIndex = 3;}},
      { label: "ข้อมูลเอกสาร/หลักฐาน",command: (event: any) => {this.activeIndex = 4;}}
    ];
  }
  onChangeTabIndex(data){
    console.log(data);
    if(data.newIndex == 0){
      Object.assign(this.applyApplicationForm.apApplication,data.apApplication);
      console.log('updated application: ',this.applyApplicationForm.apApplication)
    }
    if(data.newIndex == 1){
        Object.assign(this.applyApplicationForm.apApplication,data.apApplication);
        console.log('updated application: ',this.applyApplicationForm.apApplication)

    }
    if(data.newIndex == 2){
        Object.assign(this.applyApplicationForm.apApplication,data.apApplication);
        this.applyApplicationForm.smScholarshipAnnouncement = data.smScholarshipAnnouncement;
        this.applyApplicationForm.apScholarshipHistorys = data.apScholarshipHistorys;
        this.applyApplicationForm.apStudentLoanFunds = data.apStudentLoanFunds;
        console.log('updated application: ',this.applyApplicationForm.apApplication)

    }

    this.activeIndex = data.newIndex;
  }


}
