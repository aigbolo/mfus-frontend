import { UtilsService } from './../../../services/utils/utils.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { Component, OnInit,ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ApFamilyDebt } from '../../../models/ap-family-debt';
import { NgProgress } from 'ngx-progressbar';
import { ReferenceService } from '../../../services/general/reference.service';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-m040103-manage-family-financial',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040103-manage-family-financial.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040103ManageFamilyFinancialComponent implements OnInit {

  familyFinancialFormGroup: FormGroup
  familyDebt:ApFamilyDebt = new ApFamilyDebt()
  @Input() childForm: ApplyScholarshipForm;
  @Output() changeIndex = new EventEmitter<any>();
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

  onGoBack(){

  }

  onNext(){

  }
}
