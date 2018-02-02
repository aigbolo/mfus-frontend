import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ApplicationService } from '../../../services/students/application.service';
import { ViewStudentApplicationComponent } from '../view-student-application.component';

@Component({
  selector: 'app-view-family-financial',
  templateUrl: './view-family-financial.component.html',
  styleUrls: ['./view-family-financial.component.css']
})
export class ViewFamilyFinancialComponent implements OnInit {

  constructor(private referenceService: ReferenceService,
              private utilsService: UtilsService,
              private applicationService: ApplicationService,
              public applciationView: ViewStudentApplicationComponent) { }

  ngOnInit() {
    this.initialFamilyFinancial()
  }

  initialFamilyFinancial(){
    this.applciationView.applyScholarshipViewForm.apFamiyDebt = []
    this.applicationService.initialFamilyFinancial(this.applciationView.applyScholarshipViewForm.apApplication.application_ref).subscribe(
      data=>{
        this.applciationView.applyScholarshipViewForm.apFamilyFinancial = data.ap_family_financial
        this.applciationView.applyScholarshipViewForm.apFamiyDebt.push(...data.ap_family_debt)
      }
    )
  }

  onPrevious(){
    this.referenceService.nextIndex(2)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
  onNext(){
    this.referenceService.nextIndex(3)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }


}
