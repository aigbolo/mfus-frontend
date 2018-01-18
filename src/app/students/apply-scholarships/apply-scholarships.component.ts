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
  user_ref: string = "pAVhtdlBQA9KN6MB1rw6hLd5a55fd0c84d08"
  account_ref: string = "Vg518d4wKwGFh19dDiMSkKE5a55fd0c6d816"
  constructor(
    private layoutService: LayoutService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private ngProgress: NgProgress
  ) {}

  ngOnInit() {
    this.ngProgress.start()
    this.utilsService.getApplicationStep();
    this.getApplicationData();
  }


  getApplicationData() {
    this.applyScholarshipService
      .getApplySchcolarshipData(this.account_ref)
      .subscribe(data => {
        console.log(data)
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
