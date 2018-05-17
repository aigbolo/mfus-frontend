import { ApApplication } from './../../models/ap-application';
import { ApFamilyFinancial } from './../../models/ap-family-financial';
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
  activeIndex:number;

  user: AcUser =  this.authService.getUser();


  constructor(
    private layoutService: LayoutService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private ngProgress: NgProgress,
    private authService: AuthenticationService,
    private activateRoute: ActivatedRoute,
    private reference:ReferenceService,
    private familyAndAddress: M020103FamilyAndAddressService
  ) { }

  ngAfterViewInit() {
    this.layoutService.setPageHeader('ยื่นความจำนงขอทุนการศึกษา');


  }
  async ngAfterContentInit() {

    this.applyApplicationForm = new ApplyScholarshipForm;
    this.applyApplicationForm.apApplication.student_ref = this.user.account_ref;
    this.applyApplicationForm.apApplication.create_user = this.user.account_ref;
    this.applyApplicationForm.apApplication.update_user = this.user.account_ref;
    this.getApplicationStep();
    this.findFamilyAndAddress();
    this.findScholarshipHistory();
    this.findStudentLoanFund();
    if (this.activateRoute.snapshot.params["id"] != null) {
      await new Promise((resolve)=>{
        this.applyScholarshipService.initialApApplication(this.activateRoute.snapshot.params["id"]).subscribe(
          data=>{
            this.applyApplicationForm.apApplication = data;
            resolve()
          }
        )
      })
      await new Promise((resolve)=>{
      this.reference.getAnnouncementByRef(this.applyApplicationForm.apApplication.announcement_ref).subscribe(
          async (announce)=>{

            this.applyApplicationForm.smScholarshipAnnouncement = announce;

            await this.reference.getScholarshipByRef(announce.scholarship_ref).toPromise().then(sc=>{
              console.log('scholarship: ',sc)
              this.applyApplicationForm.smScholarshipAnnouncement.scholarship_name = sc.scholarship_name
              this.applyApplicationForm.smScholarshipAnnouncement.detail = sc.detail
              this.applyApplicationForm.smScholarshipAnnouncement.scholarship_type_name = sc.scholarship_type

              this.reference.getSponsorsByRef(sc.sponsors_ref).subscribe(
                sp=>{
                  this.applyApplicationForm.smScholarshipAnnouncement.sponsors_name = sp.sponsors_name
                }
              )

            })
            console.log('finished sc')
            resolve();
          }
        )
      })

      this.findFamilyFinancial();
      this.findDocumentUpload();
    }
    this.activeIndex = 0;
    this.pageRender = true;

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
    if(data.currentIndex == 0){
      Object.assign(this.applyApplicationForm.apApplication,data.apApplication);
    }
    if(data.currentIndex == 1){
      Object.assign(this.applyApplicationForm.apApplication,data.apApplication);
      this.applyApplicationForm.smScholarshipAnnouncement = data.smScholarshipAnnouncement;
      this.applyApplicationForm.apScholarshipHistorys = data.apScholarshipHistorys;
      this.applyApplicationForm.apStudentLoanFunds = data.apStudentLoanFunds;
    }
    if(data.currentIndex == 2){
      this.applyApplicationForm.apFamilyFinancial = data.apFamilyFinancial;
      this.applyApplicationForm.apFamilyDebt = data.apFamilyDebts
    }
    if(data.currentIndex == 3){


    }
    if(data.currentIndex == 4){
      this.applyApplicationForm.apDocumentUpload = data.apDocumentUpload
    }


    if(data.newIndex != 5){
      this.activeIndex = data.newIndex;
    }else{
      console.log(this.applyApplicationForm)
      this.onSubmitApplication()
    }
  }


  findScholarshipHistory(){
    this.applyScholarshipService.initialScholarshipHistory(this.user.account_ref).subscribe(
      data=>{
        this.applyApplicationForm.apScholarshipHistorys = data;
      }
    )
  }

  findStudentLoanFund(){
    this.applyScholarshipService.initialStudentLoanFund(this.user.account_ref).subscribe(
      data=>{
        this.applyApplicationForm.apStudentLoanFunds = data;
      }
    )
  }
  findFamilyFinancial(){
    this.applyScholarshipService.initialFamilyFinancial(this.applyApplicationForm.apApplication.application_ref).subscribe(
      data=>{
        console.log('financial: ',data)
        this.applyApplicationForm.apFamilyFinancial = data.ap_family_financial;
        this.applyApplicationForm.apFamilyDebt = [...data.ap_family_debt]
      }
    )
  }

  findFamilyAndAddress(){
    this.familyAndAddress.doGetParent(this.user.account_ref).subscribe(
      data=>{
        this.applyApplicationForm.acParent = data;
      }
    )
    this.familyAndAddress.doGetSiblings(this.user.account_ref).subscribe(
      data=>{
        this.applyApplicationForm.acSiblings = [...data]
      }

    )
    this.familyAndAddress.doGetAddress(this.user.account_ref).subscribe(
      data=>{
        this.applyApplicationForm.acAddress = data;
      }
    )
  }

  findDocumentUpload(){
    this.applyScholarshipService.initialDocumentUpload(this.applyApplicationForm.apApplication.application_ref).subscribe(
      data=>{
        console.log('document upload: ',data);
        this.applyApplicationForm.apDocumentUpload = [...data]
      }
    )
  }



  async onSubmitApplication(){
    let response = null;

    if(!this.applyApplicationForm.apApplication.application_ref){
      response = await this.applyScholarshipService.applyScholarship(this.applyApplicationForm)
    }else{
      response = await this.applyScholarshipService.updateApply(this.applyApplicationForm)
    }

    console.log(response)
  }




}
