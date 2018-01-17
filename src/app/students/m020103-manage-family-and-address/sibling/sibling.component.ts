import { ReferenceService } from './../../../services/general/reference.service';
import { SelectItem } from 'primeng/primeng';
import { UtilsService } from './../../../services/utils/utils.service';
import { AcSibling } from './../../../models/ac-sibling';
import { FamilyAndAddressForm } from './../../../forms/family-and-address-form';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { M020103ManageFamilyAndAddressComponent } from '../m020103-manage-family-and-address.component';

@Component({
  selector: 'app-sibling',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sibling.component.html',
  styleUrls: ['./sibling.component.css']
})
export class SiblingComponent implements OnInit {
  manageForm: FamilyAndAddressForm = new FamilyAndAddressForm();

  sibling: AcSibling = new AcSibling();
  educationLevel: SelectItem[];
  newRow:boolean = true;
  constructor(
    private utilsService: UtilsService,
    private familyAndAddress: M020103ManageFamilyAndAddressComponent,
    private referenceService: ReferenceService
  ) {}

  ngOnInit() {
    this.manageForm = this.familyAndAddress.getData();
    console.log(this.manageForm.siblingList);
    this.getDropDown();
  }



  getDropDown(){
    console.log('getDropDown');

    let dropdown: SelectItem[];
    this.educationLevel = [];
    this.educationLevel = [{label: 'ระบุระดับการศึกษา', value: null},];
    for(let data of this.familyAndAddress.educationLevelList){
      dropdown = [];
      dropdown = [{label: data.education_name_t, value: data.education_ref},];
      this.educationLevel = this.educationLevel.concat(dropdown);
    }

  }

  dataCheckcing(){
    console.log("dataCheckcing");
    this.newRow = true;
    for(let data of this.manageForm.siblingList){
      if(data.sibling_name == ''|| data.sibling_name == undefined){
        this.newRow = false;
        // this.thisFormGroup.controls["sibling_name"].markAsDirty();
      }
    }
  }

  addButtonOnClick() {
    console.log("addButtonOnClick");
    this.dataCheckcing();
    this.sibling = new AcSibling();
    if(this.newRow){
      this.sibling.student_ref = this.familyAndAddress.user;
      this.sibling.create_user = this.familyAndAddress.user;
      this.sibling.update_user = this.familyAndAddress.user;
      this.manageForm.siblingList.push(this.sibling);
    }

  }
  deleteButtonOnClick(index) {
    console.log("deleteButtonOnClick");
    this.manageForm.siblingList.splice(index, 1);
  }
  nextButtonOnClick() {
    console.log("nextButtonOnClick");
    this.dataCheckcing();
    if(this.newRow){
      this.familyAndAddress.onChangePanel(2, this.manageForm);
    }
  }
  prevButtonOnClick() {
    console.log("prevButtonOnClick");
    this.familyAndAddress.onChangePanel(0, this.manageForm);
  }
}
