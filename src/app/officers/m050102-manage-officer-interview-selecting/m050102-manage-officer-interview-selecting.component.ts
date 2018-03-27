import { AcStudent } from "./../../models/ac-student";
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
import { M050101ScholarshipsScreeningService } from "../../services/officers/m050101-scholarships-screening.service";
import { Severity } from "../../enum";
import { ApApplication } from "../../models/ap-application";

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
  selectedInterviewees: any[] = [];
  interview_flag: boolean = false;

  constructor(
    private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private referenceService: ReferenceService,
    private officerInterviewSelectingService: M050102OfficerInterviewSelectingService,
    private scholarshipScreeningService: M050101ScholarshipsScreeningService,
    private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    public ngProgress: NgProgress
  ) {}

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกผู้ได้รับสิทธิ์สัมภาษณ์");

    //this.validatorForm();
    // this.onViewApplication();

    let announcement_ref = this.activatedRoute.snapshot.params["id"];
    if (this.activatedRoute.snapshot.params["id"] != null) {
      this.applicationService
        .initialStudentInterview(announcement_ref)
        .subscribe(data => {
          if (data) {
            this.studentIntervieweesList = data;

            for(let flag of this.studentIntervieweesList){
              flag.interview_flag = null;
            }
          }
          console.log(data);
        });
      this.applicationService
        .initialScholarshipAnnouncement(announcement_ref)
        .subscribe(data => {
          if (data) {
            this.getScholarshipAnnouncementView(data.announcement_ref);
          }
          console.log(data);
        });
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

  onSubmit() {
    //this.selectedInterviewees = this.studentIntervieweesList
    var applicationList = [];
    applicationList.push(this.studentIntervieweesList);

    for(let data of this.studentIntervieweesList){
      var applicationTemp = new ApApplication();
      applicationTemp = data;
      applicationTemp.interview_flag = applicationTemp.interview_flag ? '2': '3';


    }
    console.log("data: ", applicationList);
    console.log("datass: ", this.studentIntervieweesList);
    // this.manageForm.selected_interviewees.interview_flag = "2";
    // this.manageForm.selected_interviewees.update_user = this.user.account_ref;
    // if (this.manageFormGroup.invalid) {
    //   this.utilsService.findInvalidControls(this.manageFormGroup);
    // } else {
    //   if (this.manageForm.selected_interviewees.application_ref != null) {
    //     console.log(this.manageForm);
    //     this.officerInterviewSelectingService
    //       .doUpdateRequestDocument(this.manageForm)
    //       .subscribe(
    //         data => {
    //           if (data) {
    //             let selected_interviewees: ApApplication = new ApApplication();
    //             selected_interviewees.document_screening_flag = "2";
    //             selected_interviewees.application_ref = this.manageForm.application.application_ref;
    //             selected_interviewees.update_user = this.user.account_ref;
    //             this.applyScholarshipService
    //               .updateApplication(selected_interviewees)
    //               .subscribe(
    //                 () => {
    //                   this.layoutService.setMsgDisplay(
    //                     Severity.SUCCESS,
    //                     "บันทึกข้อมูลสำเร็จ",
    //                     ""
    //                   );
    //                 },
    //                 err => {
    //                   this.layoutService.setMsgDisplay(
    //                     Severity.ERROR,
    //                     "แก้ไขข้อมูลไม่สำเร็จ",
    //                     ""
    //                   );
    //                   console.log(err);
    //                 }
    //               );
    //           }
    //         },
    //         err => {
    //           this.layoutService.setMsgDisplay(
    //             Severity.ERROR,
    //             "แก้ไขข้อมูลไม่สำเร็จ",
    //             ""
    //           );
    //           console.log(err);
    //         }
    //       );
    //   }
    // }
  }
}
