import { AcOfficer } from './../../models/ac-officer';
import { AcStudent } from './../../models/ac-student';
import { AcUser } from './../../models/ac-user';
import { AuthenticationService } from './../../services/general/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LayoutService } from "./../../services/utils/layout.service";
import { UtilsService } from "./../../services/utils/utils.service";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { ApplyScholarshipForm } from "../../forms/apply-scholarship-form";
import { M040101ApplyScholarshipService } from "../../services/students/m040101-apply-scholarship.service";
import { ReferenceService } from "../../services/general/reference.service";
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: "app-apply-scholarships",
  templateUrl: "./apply-scholarships.component.html",
  styleUrls: ["./apply-scholarships.component.css"]
})
export class ApplyScholarshipsComponent implements OnInit {
  pageRender: boolean = false
  applyApplicationForm: ApplyScholarshipForm = new ApplyScholarshipForm();
  applicationFormGroup: FormGroup
  page_header: string;
  user_ref: string = ""
  account_ref: string = ""
  user: AcUser = new AcUser;
  student: AcStudent = new AcStudent;
  officer: AcOfficer = new AcOfficer;
  constructor(
    private layoutService: LayoutService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private ngProgress: NgProgress,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {

    this.ngProgress.start()
    this.login()
    this.utilsService.getApplicationStep();
    this.getApplicationData();
  }

  login(){
    this.student = this.authService.getAccount();
    this.user = this.authService.getUser();
    this.user_ref = this.user.user_ref
    this.account_ref = this.student.student_ref
  }

  getApplicationData() {
    this.applyScholarshipService
      .getApplySchcolarshipData(this.account_ref)
      .subscribe(data => {
        this.applyApplicationForm.acStudent = data;
        this.applyApplicationForm.student_name = data.student_name
        this.applyApplicationForm.school_name_t = data.school_name_t
        this.applyApplicationForm.major_name_t = data.major_name_t

        this.applyApplicationForm.birth_day = this.utilsService.getBirthDay(
          data.birth_date
        );
        this.applyApplicationForm.gender = this.utilsService.getGender(
          data.gender
        );
        this.applyApplicationForm.age = this.utilsService.getAge(
          data.birth_date
        );
        this.pageRender = true;
        this.ngProgress.done()
      },error=>{
        console.log(error)
      }, ()=>{
      });

  }
}
