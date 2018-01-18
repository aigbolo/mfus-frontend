import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { UtilsService } from './../../../services/utils/utils.service';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { M040101ApplyScholarshipService } from '../../../services/students/m040101-apply-scholarship.service';
import { ReferenceService } from '../../../services/general/reference.service';

@Component({
  selector: 'app-m040101-manage-applicant-info',
  templateUrl: './m040101-manage-applicant-info.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040101ManageApplicantInfoComponent implements OnInit {

  applicantFormGroup: FormGroup
  collageYears: SelectItem[] = []
  constructor(
    private utilsService: UtilsService,
    public applyApplication: ApplyScholarshipsComponent,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private referenceService: ReferenceService
  ) { }

  ngOnInit() {
    this.collageYears = this.utilsService.getCollageYear()
    this.validateForm()
  }

  validateForm(){
    this.applicantFormGroup= new FormGroup({
    phone_no: new FormControl(this.applyApplication.applyApplicationForm.acStudent.phone_no,
      Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
    email: new FormControl(this.applyApplication.applyApplicationForm.acStudent.email,
      Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])),
      collage_year: new FormControl(this.applyApplication.applyApplicationForm.apApplication.collage_year = '1',
        Validators.compose([Validators.required])),
      gpax: new FormControl(this.applyApplication.applyApplicationForm.apApplication.gpax,
        Validators.compose([Validators.required,Validators.max(4.00)])),
      advisor_name: new FormControl(this.applyApplication.applyApplicationForm.apApplication.advisor_name,
        Validators.compose([Validators.required])),
      livelihood: new FormControl(this.applyApplication.applyApplicationForm.apApplication.livelihood,
        Validators.compose([Validators.required])),
    })
  }

  onNext(){
    if (this.applicantFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.applicantFormGroup);
      return;
    }
    this.applyApplication.applyApplicationForm.acStudent.create_user = this.applyApplication.account_ref
    this.applyApplication.applyApplicationForm.acStudent.update_user = this.applyApplication.account_ref
    this.referenceService.nextIndex(1)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }

}
