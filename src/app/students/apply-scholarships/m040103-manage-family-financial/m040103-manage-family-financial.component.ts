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

  constructor(public applyApplication: ApplyScholarshipsComponent) { }

  ngOnInit() {
  }

  addRow(){
    this.applyApplication.applyApplicationForm.apFamiyDebt.push(new ApFamilyDebt)
  }

  deleteRow(obj: ApFamilyDebt){
    this.applyApplication.applyApplicationForm.apFamiyDebt.splice(this.applyApplication.applyApplicationForm.apFamiyDebt.indexOf(obj), 1)
  }

  onNext(){
    console.log(this.applyApplication.applyApplicationForm)
  }
}
