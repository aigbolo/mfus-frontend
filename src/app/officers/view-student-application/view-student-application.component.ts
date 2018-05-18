import { LayoutService } from './../../services/utils/layout.service';
import { ApplyScholarshipForm } from './../../forms/apply-scholarship-form';
import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { ApplicationService } from '../../services/students/application.service';
import { AuthenticationService } from '../../services/general/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from '../../services/general/reference.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { AcUser } from '../../models/ac-user';
import { M040101ApplyScholarshipService } from '../../services/students/m040101-apply-scholarship.service';
import { M020103FamilyAndAddressService } from '../../services/students/m020103-family-and-address.service';
import { M010101StudentService } from '../../services/students/m010101-student.service';
import { M030103ScholarshipAnnouncementService } from '../../services/officers/m030103-scholarship-announcement.service';

@Component({
  selector: 'app-view-student-application',
  templateUrl: './view-student-application.component.html',
  styleUrls: ['./view-student-application.component.css']
})
export class ViewStudentApplicationComponent implements AfterViewInit{
  pageRender: boolean = false
  applyApplicationForm: ApplyScholarshipForm = new ApplyScholarshipForm();
  items: MenuItem[] = [];
  activeIndex:number;
  applicationRef:string;
  index:number = 0;
  constructor(
    private layoutService: LayoutService,
    private ngProgress: NgProgress,
    private activateRoute: ActivatedRoute,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private familyAndAddress: M020103FamilyAndAddressService,
    private studentService: M010101StudentService,
    private announcementService:M030103ScholarshipAnnouncementService
  ) { }

  ngAfterViewInit() {
    this.layoutService.setPageHeader('รายละเอียดข้อมูลผู้ขอทุนการศึกษา');


  }
  async ngAfterContentInit() {
    this.ngProgress.start();
    this.applyApplicationForm = new ApplyScholarshipForm;
    this.applicationRef = this.activateRoute.snapshot.params["id"];
    this.getApplicationStep();
    await new Promise((resolve)=>{
        this.applyScholarshipService.initialApApplication(this.applicationRef).subscribe(
          data=>{
            this.applyApplicationForm.apApplication = data;
            resolve()
          }
        )
      })
      await new Promise((resolve)=>{
        this.studentService.doView(this.applyApplicationForm.apApplication.student_ref).subscribe(
          data=>{
            this.applyApplicationForm.acStudent = data[0];
            resolve()
          }
        )
      })

      //tab 2
      this.findAnnouncement();
      this.findScholarshipHistory();
      this.findStudentLoanFund();


      this.findFamilyAndAddress();
      
      this.findFamilyFinancial();
      this.findDocumentUpload();
    this.ngProgress.done();
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

  onChangeTabIndex(input:number){
    this.activeIndex = this.activeIndex+input;
  }



  findAnnouncement(){
    const announcement = {announcement_ref:this.applyApplicationForm.apApplication.announcement_ref}
    this.announcementService.viewScholarshipAnnouncement(announcement).subscribe(
      data=>{
        this.applyApplicationForm.smScholarshipAnnouncement = data[0];
      }
    )
  }

  findScholarshipHistory(){
    this.applyScholarshipService.initialScholarshipHistory(this.applyApplicationForm.apApplication.student_ref).subscribe(
      data=>{
        this.applyApplicationForm.apScholarshipHistorys = data;
      }
    )
  }

  findStudentLoanFund(){
    this.applyScholarshipService.initialStudentLoanFund(this.applyApplicationForm.apApplication.student_ref).subscribe(
      data=>{
        this.applyApplicationForm.apStudentLoanFunds = data;
      }
    )
  }
  findFamilyFinancial(){
    this.applyScholarshipService.initialFamilyFinancial(this.applicationRef).subscribe(
      data=>{
        this.applyApplicationForm.apFamilyFinancial = data.ap_family_financial;
        this.applyApplicationForm.apFamilyDebt = [...data.ap_family_debt]
      }
    )
  }

  findFamilyAndAddress(){
    this.familyAndAddress.doGetParent(this.applyApplicationForm.apApplication.student_ref).subscribe(
      data=>{
        this.applyApplicationForm.acParent = data;
      }
    )
    this.familyAndAddress.doGetSiblings(this.applyApplicationForm.apApplication.student_ref).subscribe(
      data=>{
        this.applyApplicationForm.acSiblings = [...data]
      }

    )
    this.familyAndAddress.doGetAddress(this.applyApplicationForm.apApplication.student_ref).subscribe(
      data=>{
        this.applyApplicationForm.acAddress = data;
      }
    )
  }

  findDocumentUpload(){
    this.applyScholarshipService.initialDocumentUpload(this.applyApplicationForm.apApplication.application_ref).subscribe(
      data=>{
        this.applyApplicationForm.apDocumentUpload = [...data]
      }
    )
  }

}
