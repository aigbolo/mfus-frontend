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

  collageYears: SelectItem[] = []
  constructor(
    private utilsService: UtilsService,
    public applyApplication: ApplyScholarshipsComponent,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private referenceService: ReferenceService
  ) { }

  ngOnInit() {
    this.collageYears = this.utilsService.getCollageYear()
  }

  validateForm(){

  }

  onNext(){
    console.log(this.applyApplication.applyApplicationForm)
    if (this.applyApplication.applicationFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.applyApplication.applicationFormGroup);
      return;
    }
    this.referenceService.nextIndex(1)
    this.utilsService.activeIndex = this.referenceService.getIndex()
    this.utilsService.goToPage('manage-application/manage-scholarship-info')

  }

}
