import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils/utils.service';
import { LayoutService } from '../../services/utils/layout.service';
import { M050103ScholarshipEarningService } from '../../services/officers/m050103-scholarship-earning.service';
import { NgProgress } from 'ngx-progressbar';
import { ScholarshipEarningForm } from '../../forms/scholarship-earning-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScholarshipAnnouncementForm } from '../../forms/scholarship-announcement-form';
import { AuthenticationService } from '../../services/general/authentication.service';
import { M030103ScholarshipAnnouncementService } from '../../services/officers/m030103-scholarship-announcement.service';
import { SmScholarshipAnnouncement } from '../../models/sm-scholarship-announcement';
import { ApplicationService } from '../../services/students/application.service';
import { Severity } from '../../enum';

@Component({
  selector: 'app-m050103-manage-scholarship-earning',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m050103-manage-scholarship-earning.component.html',
  styleUrls: ['./m050103-manage-scholarship-earning.component.css']
})
export class M050103ManageScholarshipEarningComponent implements OnInit {

  pageRender = false;

  onLoad:boolean = false;

  updateMode:boolean  = false;
  manageFormGroup: FormGroup;
  manageForm: ScholarshipEarningForm = new ScholarshipEarningForm();

  studentEarningList: any[] = [];
  studentEarning: any;

  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activateRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private referenceService: ReferenceService,
    private scholarshipEarningService: M050103ScholarshipEarningService,
    private applicationService: ApplicationService,
    private scholarshipAnnouncementService: M030103ScholarshipAnnouncementService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกผู้ได้รับทุนการศึกษา");
    this.ngProgress.start();
    this.ngProgress.done();

    let announcement_ref = this.activateRoute.snapshot.params["id"];
    if (this.activateRoute.snapshot.params["id"] != null) {
      this.findInterviewees(announcement_ref);
      this.applicationService.initialScholarshipAnnouncement(announcement_ref).subscribe(
        data => {
          if(data){
          this.getScholarshipAnnouncementView(data.announcement_ref);
          }
          console.log(data)
        }
      )
    }

  }

  getScholarshipAnnouncementView(announcementRef: string) {
    this.applicationService
      .initialScholarshipAnnouncement(announcementRef)
      .subscribe(
        data => {
          this.manageForm.scholarshipAnnouncement = data;
        },
        err => {
          console.log(err);
        },
        () => {}
      );
  }

  findInterviewees(announcement_ref: string){
    this.scholarshipEarningService.doSearchInterviewees(announcement_ref)
    .subscribe(
      data => {
        this.studentEarningList = [];
        for(let student of data){
          student.isEarning  = (student.earn_flag == '2'?true:false);
          this.studentEarningList = this.studentEarningList.concat(student);

        }
      },
      err => {
        console.log(err);
      },
      () => {}
    );
  }

  onSubmit() {
    for(let data of this.studentEarningList){
      data.earn_flag = data.isEarning ? '2': '3';
    }

    this.scholarshipEarningService.doInsert(this.studentEarningList)
    .subscribe(
      data=> {
        this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกข้อมูลสำเร็จ","");
      },err=>{
        this.layoutService.setMsgDisplay(Severity.ERROR,"บันทึกข้อมูลไม่สำเร็จ","");
        console.log(err);
    },
    ()=>{
      this.onPageSearch();
    }
  );
  }

  onPageSearch(){
    window.history.back();
  }

  onReset(){
    window.location.reload();
  }

  onInsertComplete() {
    this.manageForm = new ScholarshipEarningForm;
    this.ngOnInit();
  }

  onSelectStudent(studentRef){
    console.log('student_ref: ',studentRef)
    const result = this.studentEarningList.filter(student => student.isEarning);
    console.log('total earn: ',result.length)
    if(result.length>this.manageForm.scholarshipAnnouncement.unit){
      this.studentEarningList.forEach(
        data=>{
          if(studentRef = data.student_ref){
            this.layoutService.setMsgDisplay(Severity.WARN,"ไม่สามารถเลือกได้","เนื่องจากเกินจำนวนทุนการศึกษา");
              data.isEarning = false;
          }
        }
      )
    }
  }
  ngOnDestroy() {
    this.ngProgress.done();
  }
}
