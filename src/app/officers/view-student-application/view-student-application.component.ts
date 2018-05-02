import { LayoutService } from './../../services/utils/layout.service';
import { ApplyScholarshipForm } from './../../forms/apply-scholarship-form';
import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { ApplicationService } from '../../services/students/application.service';
import { AuthenticationService } from '../../services/general/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from '../../services/general/reference.service';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-view-student-application',
  templateUrl: './view-student-application.component.html',
  styleUrls: ['./view-student-application.component.css']
})
export class ViewStudentApplicationComponent implements OnInit {

  applyScholarshipViewForm: ApplyScholarshipForm = new ApplyScholarshipForm
  student_ref: string
  application_ref: string
  pageRender: boolean = false
  items: MenuItem[] = [];
  activeIndex = 0;
  constructor(public utilsService: UtilsService,
    private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private referenceService: ReferenceService,
    private ngprogress: NgProgress,
    private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('รายละเอียดข้อมูลการยื่นเจตจำนงขอทุนการศึกษา');
    this.ngprogress.start()
    this.application_ref = this.route.snapshot.params['id']
    this.getApplicationStep();
    this.initialData()
  }

  initialData() {
    this.initialApplication();
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

  initialStudent(ref: string) {
    this.applicationService.initialAcStudentView(ref).subscribe(
      data => {
        console.log(data)
        this.applyScholarshipViewForm.acStudent = data
        // this.applyScholarshipViewForm.student_name = this.applyScholarshipViewForm.acStudent.first_name_t + ' ' + this.applyScholarshipViewForm.acStudent.last_name_t
        // this.applyScholarshipViewForm.school_name_t = data.school_name
        // this.applyScholarshipViewForm.major_name_t = data.major_name
      }, error => {
      }, () => {
        this.ngprogress.done()
        this.pageRender = true
      })
  }

  initialApplication() {
    this.applicationService.initialApApplicationView(this.application_ref).subscribe(
      data => {
        console.log(data)
        this.applyScholarshipViewForm.apApplication = data
      }, error => {
      }, () => {
        this.initialStudent(this.applyScholarshipViewForm.apApplication.student_ref)
      }
    )
  }
}
