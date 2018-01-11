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
    this.validateForm();
  }

  validateForm(){
    this.applicationFormGroup = new FormGroup({
      //applicant
      collage_year: new FormControl(this.applyApplicationForm.apApplication.collage_year = '1',
    Validators.compose([Validators.required])),
      gpax: new FormControl(this.applyApplicationForm.apApplication.gpax,
        Validators.compose([Validators.required])),
      advisor_name: new FormControl(this.applyApplicationForm.apApplication.advisor_name,
        Validators.compose([Validators.required])),
      livelihood: new FormControl(this.applyApplicationForm.apApplication.livelihood,
        Validators.compose([Validators.required])),
      //student
      phone_no: new FormControl(this.applyApplicationForm.acStudent.phone_no,
        Validators.compose([Validators.required])),
      email: new FormControl(this.applyApplicationForm.acStudent.email,
        Validators.compose([Validators.required]))
    })
  }

  getApplicationData() {
    this.applyScholarshipService
      .getApplySchcolarshipData("Vg518d4wKwGFh19dDiMSkKE5a55fd0c6d816")
      .subscribe(data => {
        this.applyApplicationForm.acStudent = data;
        this.applyApplicationForm.birth_day = this.utilsService.getBirthDay(
          data.birth_date
        );
        this.applyApplicationForm.fullname =
          data.first_name_t + " " + data.last_name_t;
        this.applyApplicationForm.age = this.utilsService.getAge(
          data.birth_date
        );
        this.applyApplicationForm.acStudent.gender = this.utilsService.getGender(
          data.gender
        );
        this.referenceService
          .getSchoolByRef(data.school_ref)
          .subscribe(data => {
            this.applyApplicationForm.rftSchool = data;
          });
        this.referenceService.getMajorByRef(data.major_ref).subscribe(data => {
          this.applyApplicationForm.rftMajor = data;
        });
        this.pageRender = true;
        this.ngProgress.done()
      });

  }
}
