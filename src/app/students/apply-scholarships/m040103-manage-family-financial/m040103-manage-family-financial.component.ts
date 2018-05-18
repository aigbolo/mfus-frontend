import { AuthenticationService } from './../../../services/general/authentication.service';
import { AcUser } from './../../../models/ac-user';
import { ApFamilyFinancial } from './../../../models/ap-family-financial';
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

  formGroup: FormGroup;
  apFamilyFinancial:ApFamilyFinancial = new ApFamilyFinancial;
  apFamilyDebts:ApFamilyDebt[] = [new ApFamilyDebt];

  user: AcUser =  this.authService.getUser();
  @Input() childForm: ApplyScholarshipForm;
  @Output() changeIndex = new EventEmitter<any>();
  constructor(private ngprogress: NgProgress,
              private referenceService: ReferenceService,
              private authService: AuthenticationService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    console.log('apFamilyFinancial: ',this.childForm.apFamilyFinancial)
    if(this.childForm.apFamilyFinancial)
    this.apFamilyFinancial = this.childForm.apFamilyFinancial;


    this.apFamilyFinancial.create_user = this.user.user_ref;
    this.apFamilyFinancial.update_user = this.user.user_ref;
    this.apFamilyDebts = [...this.childForm.apFamilyDebt];
    this.validateForm()
  }

  validateForm(){
    this.formGroup = new FormGroup({
      income_monthly: new FormControl(this.apFamilyFinancial.income_monthly,
        Validators.compose([Validators.required])),
      expense_monthly: new FormControl(this.apFamilyFinancial.expense_monthly,
        Validators.compose([Validators.required])),

    })
  }

  newFamilyDebt(){
    let newFamilyDebt = new ApFamilyDebt;
    newFamilyDebt.create_user = this.user.user_ref;
    newFamilyDebt.update_user = this.user.user_ref;
    this.apFamilyDebts = [...this.apFamilyDebts,{...newFamilyDebt}]
  }

  deleteFamilyDebt(index){
    this.apFamilyDebts.splice(index,1);
  }

  onGoBack(){
    this.apFamilyDebts = this.apFamilyDebts.filter(data=>{
      if(data.debt_detail&&data.debt_amount!=null){
        return true
      }
      return false
    })
    const data = {
      currentIndex:2,newIndex:1,
      apFamilyFinancial:this.apFamilyFinancial,
      apFamilyDebts:this.apFamilyDebts
    }
    this.changeIndex.emit(data);
  }

  onNext(){
    this.apFamilyDebts = this.apFamilyDebts.filter(data=>{
      if(data.debt_detail&&data.debt_amount!=null){
        return true
      }
      return false
    })
    this.utilsService.findInvalidControls(this.formGroup);
    if(this.formGroup.valid){
      const data = {
        currentIndex:2,newIndex:3,
        apFamilyFinancial:this.apFamilyFinancial,
        apFamilyDebts:[...this.apFamilyDebts]
      }
      this.changeIndex.emit(data);
    }

  }
}
