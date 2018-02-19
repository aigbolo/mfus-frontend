  import { NgProgress } from "ngx-progressbar";
import { M040101ApplyScholarshipService } from "./../../services/students/m040101-apply-scholarship.service";
import { ApplicationService } from "./../../services/students/application.service";
import { ReferenceService } from "./../../services/general/reference.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from "./../../services/utils/utils.service";
import { LayoutService } from "./../../services/utils/layout.service";
import { RftApplicationDocument } from "./../../models/rft-application-document";
import { FormGroup } from "@angular/forms";
import { InterviewForm } from "./../../forms/interview-form";
import { AcUser } from "./../../models/ac-user";
import { AuthenticationService } from "./../../services/general/authentication.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { M050102OfficerInterviewSelectingService } from "../../services/officers/m050102-officer-interview-selecting.service";

@Component({
  selector: "app-m050102-manage-officer-interview-selecting",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./m050102-manage-officer-interview-selecting.component.html",
  styleUrls: ["./m050102-manage-officer-interview-selecting.component.css"]
})
export class M050102ManageOfficerInterviewSelectingComponent implements OnInit {
  user: AcUser = (this.user = this.authService.getUser());
  pageRender = false;
  manageForm: InterviewForm = new InterviewForm();
  manageFormGroup: FormGroup;
  applicationDocument: RftApplicationDocument[] = [];


  studentIntervieweesList: any[] = [];
  studentInterviewees: any;

  viewApplicationUrl: string = '#';

  constructor(
    private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private referenceService: ReferenceService,
    private officerInterviewSelectingService: M050102OfficerInterviewSelectingService,
    private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    public ngProgress: NgProgress
  ) {}

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกผู้ได้รับทุนการศึกษา");

    //this.validatorForm();

    let announcement_ref = this.activatedRoute.snapshot.params["id"];
    if (this.activatedRoute.snapshot.params["id"] != null) {
    this.applicationService.initialStudentInterview(announcement_ref).subscribe(
      data =>{
        if(data){
          this.studentIntervieweesList = data;
        }
        console.log(data)
      }

    )
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



  getStudentView(studentRef: string) {
    this.applicationService.initialAcStudentView(studentRef).subscribe(
      data => {
        this.manageForm.student = data;
      },
      err => {
        console.log(err);
      },
      () => {}
    );
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

  // getStudentInterviewees(announcementRef: string) {
  //   this.applicationService
  //     .initialStudentInterview(announcementRef)
  //     .subscribe(
  //       data => {
  //         this.manageForm.student = data;
  //       },
  //       err => {
  //         console.log(err);
  //       },
  //       () => {}
  //     );
  // }

  onViewApplication(event){
    this.utilsService.goToPage('application-view/'+this.studentInterviewees.application_ref);
  }

}
