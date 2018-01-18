import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ApFamilyDebt } from '../../../models/ap-family-debt';

@Component({
  selector: 'app-m040103-manage-family-financial',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040103-manage-family-financial.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040103ManageFamilyFinancialComponent implements OnInit {

  familyFinancialFormGroup: FormGroup
  constructor(public applyApplication: ApplyScholarshipsComponent) { }

  ngOnInit() {
    this.validateForm()
  }

  validateForm(){
    this.familyFinancialFormGroup = new FormGroup({
      income_monthly: new FormControl(this.applyApplication.applyApplicationForm.apFamilyFinancial.income_monthly,
        Validators.compose([Validators.required])),
        expense_monthly: new FormControl(this.applyApplication.applyApplicationForm.apFamilyFinancial.expense_monthly,
        Validators.compose([Validators.required])),
    })
  }

  addRow(){
    let familyDebt = new ApFamilyDebt()
    familyDebt.create_user = this.applyApplication.user_ref
    familyDebt.update_user = this.applyApplication.user_ref
    this.applyApplication.applyApplicationForm.apFamiyDebt.push(familyDebt)
  }

  deleteRow(obj: ApFamilyDebt){
    this.applyApplication.applyApplicationForm.apFamiyDebt.splice(this.applyApplication.applyApplicationForm.apFamiyDebt.indexOf(obj), 1)
  }

  onNext(){
    this.applyApplication.applyApplicationForm.apFamilyFinancial.create_user = this.applyApplication.user_ref
    this.applyApplication.applyApplicationForm.apFamilyFinancial.update_user = this.applyApplication.user_ref
    console.log(this.applyApplication.applyApplicationForm)
  }
}
