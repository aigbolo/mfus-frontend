import { UtilsService } from './../../../services/utils/utils.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ApFamilyDebt } from '../../../models/ap-family-debt';
import { NgProgress } from 'ngx-progressbar';
import { ReferenceService } from '../../../services/general/reference.service';

@Component({
  selector: 'app-m040103-manage-family-financial',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040103-manage-family-financial.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040103ManageFamilyFinancialComponent implements OnInit {

  familyFinancialFormGroup: FormGroup
  familyDebt:ApFamilyDebt = new ApFamilyDebt()

  constructor(public applyApplication: ApplyScholarshipsComponent,
              private ngprogress: NgProgress,
              private referenceService: ReferenceService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.ngprogress.start()
    this.validateForm()
  }

  validateForm(){
    this.familyFinancialFormGroup = new FormGroup({
      income_monthly: new FormControl(this.applyApplication.applyApplicationForm.apFamilyFinancial.income_monthly,
        Validators.compose([Validators.required])),
      expense_monthly: new FormControl(this.applyApplication.applyApplicationForm.apFamilyFinancial.expense_monthly,
        Validators.compose([Validators.required])),
      debt_detail: new FormControl('', Validators.compose([Validators.required])),
      debt_amount: new FormControl('', Validators.compose([Validators.required]))

    })
    this.ngprogress.done()
    this.applyApplication.pageRender = true
  }

  addRow(){
    this.familyDebt.create_user = this.applyApplication.user_ref
    this.familyDebt.update_user = this.applyApplication.user_ref
    this.applyApplication.applyApplicationForm.apFamiyDebt.push(this.familyDebt)
  }

  deleteRow(obj: ApFamilyDebt){
    this.applyApplication.applyApplicationForm.apFamiyDebt.splice(this.applyApplication.applyApplicationForm.apFamiyDebt.indexOf(obj), 1)
  }

  onNext(){
    if (this.familyFinancialFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.familyFinancialFormGroup);
      this.applyApplication.applyApplicationForm.apFamiyDebt.push(this.familyDebt);
      return;
    }
    this.applyApplication.applyApplicationForm.apFamilyFinancial.create_user = this.applyApplication.user_ref
    if(this.applyApplication.update_state == true){
      this.applyApplication.applyApplicationForm.apFamilyFinancial.update_user = this.applyApplication.user_ref
    }
    console.log(this.applyApplication.applyApplicationForm)
    this.referenceService.nextIndex(3)
    this.utilsService.activeIndex = this.referenceService.getIndex()
    this.applyApplication.pageRender = false
  }

  onPrevious(){
    this.referenceService.nextIndex(1)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
}
