import { CalendarModel } from './../../../models/calendar-model';
import { UtilsService } from './../../../services/utils/utils.service';
import { RftSubDistrict } from './../../../models/rft-sub-district';
import { RftDistrict } from './../../../models/rft-district';
import { RftProvince } from './../../../models/rft-province';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import { FamilyAndAddressForm } from './../../../forms/family-and-address-form';
import { Component, OnInit } from '@angular/core';
import { M020103ManageFamilyAndAddressComponent } from '../m020103-manage-family-and-address.component';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['../m020103-manage-family-and-address.component.css','./family.component.css']
})
export class FamilyComponent extends CalendarModel implements OnInit {
 //message
 msgs: Message[] = [];

 manageForm: FamilyAndAddressForm = new FamilyAndAddressForm();
 manageFormGroup: FormGroup;


 fProvinceList: RftProvince[] = [];
 mProvinceList: RftProvince[] = [];
 pProvinceList: RftProvince[] = [];

 // Autocomplete District
 fDistrictList: RftDistrict[] = [];
 mDistrictList: RftDistrict[] = [];
 pDistrictList: RftDistrict[] = [];


 // Autocomplete SubDistrict
 fSubDistrictList: RftSubDistrict[] = [];
 mSubDistrictList: RftSubDistrict[] = [];
 pSubDistrictList: RftSubDistrict[] = [];




 constructor(
   private utilsService: UtilsService,
   public familyAndAddress: M020103ManageFamilyAndAddressComponent
 ) {
   super();

 }

 ngOnInit() {
   console.log("FamilyComponent.ngOnInit ");
   this.validatorForm();
   this.manageForm = this.familyAndAddress.getData();

 }

 validatorForm() {
   this.manageFormGroup = new FormGroup({
     parent_flag: new FormControl(this.manageForm.acParent.parent_flag),
     relationship_status: new FormControl(this.manageForm.acParent.relationship_status),
     because: new FormControl(this.manageForm.acParent.because),
     father_pid: new FormControl(this.manageForm.acParent.father_pid,Validators.compose([Validators.required])),
     father_status: new FormControl(this.manageForm.acParent.father_status),
     father_died_year: new FormControl(this.manageForm.acParent.father_died_year),
     father_name: new FormControl(this.manageForm.acParent.father_name,Validators.compose([Validators.required])),
     father_birth_date: new FormControl(this.manageForm.acParent.father_birth_date,Validators.compose([Validators.required])),
     father_address: new FormControl(this.manageForm.acParent.father_address,Validators.compose([Validators.required])),
     father_province: new FormControl(this.manageForm.acParent.father_province,Validators.compose([Validators.required])),
     father_district: new FormControl(this.manageForm.acParent.father_district,Validators.compose([Validators.required])),
     father_sub_district: new FormControl(this.manageForm.acParent.father_sub_district,Validators.compose([Validators.required])),
     father_postcode: new FormControl(this.manageForm.acParent.father_postcode),
     father_phone: new FormControl(this.manageForm.acParent.father_phone),
     father_email: new FormControl(this.manageForm.acParent.father_email),
     father_occupation: new FormControl(this.manageForm.acParent.father_occupation),
     father_position: new FormControl(this.manageForm.acParent.father_position),
     father_work_address: new FormControl(this.manageForm.acParent.father_work_address),
     father_work_phone: new FormControl(this.manageForm.acParent.father_work_phone),
     father_work_fax: new FormControl(this.manageForm.acParent.father_work_fax),
     father_land_flag: new FormControl(this.manageForm.acParent.father_land_flag),
     father_land_all: new FormControl(this.manageForm.acParent.father_land_all),
     father_land_own: new FormControl(this.manageForm.acParent.father_land_own),
     father_land_rent: new FormControl(this.manageForm.acParent.father_land_rent),
     father_income_monthly: new FormControl(this.manageForm.acParent.father_income_monthly),

     mother_pid: new FormControl(this.manageForm.acParent.mother_pid,Validators.compose([Validators.required])),
     mother_status: new FormControl(this.manageForm.acParent.mother_status),
     mother_died_year: new FormControl(this.manageForm.acParent.mother_died_year),
     mother_name: new FormControl(this.manageForm.acParent.mother_name,Validators.compose([Validators.required])),
     mother_birth_date: new FormControl(this.manageForm.acParent.mother_birth_date,Validators.compose([Validators.required])),
     mother_address: new FormControl(this.manageForm.acParent.mother_address,Validators.compose([Validators.required])),
     mother_province: new FormControl(this.manageForm.acParent.mother_province,Validators.compose([Validators.required])),
     mother_district: new FormControl(this.manageForm.acParent.mother_district,Validators.compose([Validators.required])),
     mother_sub_district: new FormControl(this.manageForm.acParent.mother_sub_district,Validators.compose([Validators.required])),
     mother_postcode: new FormControl(this.manageForm.acParent.mother_postcode),
     mother_phone: new FormControl(this.manageForm.acParent.mother_phone),
     mother_email: new FormControl(this.manageForm.acParent.mother_email),
     mother_occupation: new FormControl(this.manageForm.acParent.mother_occupation),
     mother_position: new FormControl(this.manageForm.acParent.mother_position),
     mother_work_address: new FormControl(this.manageForm.acParent.mother_work_address),
     mother_work_phone: new FormControl(this.manageForm.acParent.mother_work_phone),
     mother_work_fax: new FormControl(this.manageForm.acParent.mother_work_fax),
     mother_land_flag: new FormControl(this.manageForm.acParent.mother_land_flag),
     mother_land_all: new FormControl(this.manageForm.acParent.mother_land_all),
     mother_land_own: new FormControl(this.manageForm.acParent.mother_land_own),
     mother_land_rent: new FormControl(this.manageForm.acParent.mother_land_rent),
     mother_income_monthly: new FormControl(this.manageForm.acParent.mother_income_monthly),

     patrol_relationship: new FormControl(this.manageForm.acParent.patrol_relationship),
     patrol_pid: new FormControl(this.manageForm.acParent.patrol_pid),
     patrol_status: new FormControl(this.manageForm.acParent.patrol_status),
     patrol_died_year: new FormControl(this.manageForm.acParent.patrol_died_year),
     patrol_name: new FormControl(this.manageForm.acParent.patrol_name),
     patrol_birth_date: new FormControl(this.manageForm.acParent.patrol_birth_date),
     patrol_address: new FormControl(this.manageForm.acParent.patrol_address),
     patrol_province: new FormControl(this.manageForm.acParent.patrol_province),
     patrol_district: new FormControl(this.manageForm.acParent.patrol_district),
     patrol_sub_district: new FormControl(this.manageForm.acParent.patrol_sub_district),
     patrol_postcode: new FormControl(this.manageForm.acParent.patrol_postcode),
     patrol_phone: new FormControl(this.manageForm.acParent.patrol_phone),
     patrol_email: new FormControl(this.manageForm.acParent.patrol_email),
     patrol_occupation: new FormControl(this.manageForm.acParent.patrol_occupation),
     patrol_position: new FormControl(this.manageForm.acParent.patrol_position),
     patrol_work_address: new FormControl(this.manageForm.acParent.patrol_work_address),
     patrol_work_phone: new FormControl(this.manageForm.acParent.patrol_work_phone),
     patrol_work_fax: new FormControl(this.manageForm.acParent.patrol_work_fax),
     patrol_land_flag: new FormControl(this.manageForm.acParent.patrol_land_flag),
     patrol_land_all: new FormControl(this.manageForm.acParent.patrol_land_all),
     patrol_land_own: new FormControl(this.manageForm.acParent.patrol_land_own),
     patrol_land_rent: new FormControl(this.manageForm.acParent.patrol_land_rent),
     patrol_income_monthly: new FormControl(this.manageForm.acParent.patrol_income_monthly)
   });

 }

 whenChangeParentFlag(index: number) {
     console.log("whenChangeParentFlag: " + index);
     if (index == 1) {

         this.manageFormGroup.controls["father_pid"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_name"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_birth_date"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_address"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_province"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_district"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_sub_district"].setValidators([Validators.required]);

         this.manageFormGroup.controls["mother_pid"].setValidators([Validators.required]);
         this.manageFormGroup.controls["mother_name"].setValidators([Validators.required]);
         this.manageFormGroup.controls["mother_birth_date"].setValidators([Validators.required]);
         this.manageFormGroup.controls["mother_address"].setValidators([Validators.required]);
         this.manageFormGroup.controls["mother_province"].setValidators([Validators.required]);
         this.manageFormGroup.controls["mother_district"].setValidators([Validators.required]);
         this.manageFormGroup.controls["mother_sub_district"].setValidators([Validators.required]);

         this.manageFormGroup.controls["patrol_relationship"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_relationship"].updateValueAndValidity();
         this.manageFormGroup.controls["patrol_pid"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_pid"].updateValueAndValidity();
         this.manageFormGroup.controls["patrol_name"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_name"].updateValueAndValidity();
         this.manageFormGroup.controls["patrol_birth_date"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrol_birth_date"].updateValueAndValidity();
         this.manageFormGroup.controls["patrol_address"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_address"].updateValueAndValidity();
         this.manageFormGroup.controls["patrol_province"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_province"].updateValueAndValidity();
         this.manageFormGroup.controls["patrol_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_district"].updateValueAndValidity();
         this.manageFormGroup.controls["patrol_sub_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
       }else{

        this.manageFormGroup.controls["father_pid"].setValidators([Validators.nullValidator]);
        this.manageFormGroup.controls["father_pid"].updateValueAndValidity();
         this.manageFormGroup.controls["father_name"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["father_name"].updateValueAndValidity();
         this.manageFormGroup.controls["father_birth_date"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["father_birth_date"].updateValueAndValidity();
         this.manageFormGroup.controls["father_address"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["father_address"].updateValueAndValidity();
         this.manageFormGroup.controls["father_province"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["father_province"].updateValueAndValidity();
         this.manageFormGroup.controls["father_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["father_district"].updateValueAndValidity();
         this.manageFormGroup.controls["father_sub_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["father_sub_district"].updateValueAndValidity();

         this.manageFormGroup.controls["mother_pid"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_pid"].updateValueAndValidity();
         this.manageFormGroup.controls["mother_name"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_name"].updateValueAndValidity();
         this.manageFormGroup.controls["mother_birth_date"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_birth_date"].updateValueAndValidity();
         this.manageFormGroup.controls["mother_address"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_address"].updateValueAndValidity();
         this.manageFormGroup.controls["mother_province"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_province"].updateValueAndValidity();
         this.manageFormGroup.controls["mother_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_district"].updateValueAndValidity();
         this.manageFormGroup.controls["mother_sub_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_sub_district"].updateValueAndValidity();

         this.manageFormGroup.controls["patrol_relationship"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrol_pid"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrol_name"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrolMonth"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrolDay"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrolYear"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrol_address"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrol_province"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrol_district"].setValidators([Validators.required]);
         this.manageFormGroup.controls["patrol_sub_district"].setValidators([Validators.required]);
     }


 }



 autocompleteProvince(event,seq: number) {
   let e = event.originalEvent;
console.log('event is: '+e.type);
   let query = event.query;
   if(seq == 0){
     this.fProvinceList = [];
     let objList: RftProvince[];
     if(e.type == 'input'){
      this.manageForm.dadDistrict = new RftDistrict();
      this.manageForm.dadSubDistrict = new RftSubDistrict();
      this.manageForm.acParent.father_province = null;
      this.manageForm.acParent.father_district = null;
      this.manageForm.acParent.father_sub_district = null;
      this.manageForm.acParent.father_postcode = null;
     }
     objList = this.familyAndAddress.fatherAddressService.getProvinces();
     for (let obj of objList) {
       // Filter By string event
       if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
         this.fProvinceList.push(obj);
       }
     }
   }
   if(seq == 1){
     this.mProvinceList = [];
     let objList: RftProvince[];
     if(e.type == 'input'){
      this.manageForm.momDistrict = new RftDistrict();
      this.manageForm.momSubDistrict = new RftSubDistrict();
      this.manageForm.acParent.mother_province = null;
      this.manageForm.acParent.mother_district = null;
      this.manageForm.acParent.mother_sub_district = null;
      this.manageForm.acParent.mother_postcode = null;
     }
     objList = this.familyAndAddress.motherAddressService.getProvinces();
     for (let obj of objList) {
       // Filter By string event
       if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
         this.mProvinceList.push(obj);
       }
     }
   }
   if(seq == 2){
     this.pProvinceList = [];
     let objList: RftProvince[];
     if(e.type == 'input'){
      this.manageForm.patrolDistrict = new RftDistrict();
      this.manageForm.patrolSubDistrict = new RftSubDistrict();
      this.manageForm.acParent.patrol_province = null;
      this.manageForm.acParent.patrol_district = null;
      this.manageForm.acParent.patrol_sub_district = null;
      this.manageForm.acParent.patrol_postcode = null;
     }
     objList = this.familyAndAddress.patrolAddressService.getProvinces();
     for (let obj of objList) {
       // Filter By string event
       if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
         this.pProvinceList.push(obj);
       }
     }
   }

 }

 // Autocomplete filter
 autocompleteDistrict(event,seq: number) {
   console.log("autocompleteDistrict");
   let query = event.query;
   if(seq == 0){
    this.fDistrictList = [];
    this.manageForm.dadSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.familyAndAddress.fatherAddressService.getDistricts();
    for (let obj of objList) {
      // Filter By string event
      if (this.manageForm.dadProvince.province_ref === obj.province_ref) {
        if (
          obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
          this.fDistrictList.push(obj);
        }
      }
    }
   }
   if(seq == 1){
    this.fDistrictList = [];
    let objList: RftDistrict[];
    objList = this.familyAndAddress.motherAddressService.getDistricts();
    for (let obj of objList) {
      // Filter By string event
      if (this.manageForm.momProvince.province_ref === obj.province_ref) {
        if (
          obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
          this.mDistrictList.push(obj);
        }
      }
    }
  }
  if(seq == 2){
    this.fDistrictList = [];
    let objList: RftDistrict[];
    objList = this.familyAndAddress.patrolAddressService.getDistricts();
    for (let obj of objList) {
      // Filter By string event
      if (this.manageForm.patrolProvince.province_ref === obj.province_ref) {
        if (
          obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
          this.pDistrictList.push(obj);
        }
      }
    }
  }

 }

 autocompleteSubDistrict(event,seq: number) {
   console.log("autocompleteSubDistrict: ");
   let query = event.query;
   if(seq == 0){
    this.fSubDistrictList = [];
    let objList = this.familyAndAddress.fatherAddressService.getSubDistricts();
    for (let obj of objList) {
      // Filter By string event
          if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            this.fSubDistrictList.push(obj);
          }
    }
   }
   if(seq == 1){
    this.mSubDistrictList = [];
    let objList = this.familyAndAddress.motherAddressService.getSubDistricts();
    for (let obj of objList) {
      // Filter By string event
          if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            this.mSubDistrictList.push(obj);
          }
    }
  }
  if(seq == 2){
    this.pSubDistrictList = [];
    let objList = this.familyAndAddress.patrolAddressService.getSubDistricts();
    for (let obj of objList) {
      // Filter By string event
          if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            this.pSubDistrictList.push(obj);
          }
    }
  }

 }

 handleCompleteClickProvince(index: number) {
   console.log("handleCompleteClickProvince");
   if (index == 0) {
      setTimeout(()=>{
        this.fProvinceList = this.familyAndAddress.fatherAddressService.getProvinces();
      },100);
   }
   if (index == 1) {
      setTimeout(()=>{
        this.mProvinceList = this.familyAndAddress.motherAddressService.getProvinces();
      },100);
   }
   if (index == 2) {
     setTimeout(()=>{
      this.pProvinceList = this.familyAndAddress.patrolAddressService.getProvinces();

     },100);

   }
 }

 handleCompleteClickDistrict(index: number) {
   console.log("handleCompleteClickDistrict");
   if (index == 0) {
      setTimeout(()=>{
        this.fDistrictList = this.familyAndAddress.fatherAddressService.getDistricts();
        this.fSubDistrictList = [];
      },100);


   }
   if (index == 1) {
    setTimeout(()=>{
      this.mDistrictList = this.familyAndAddress.motherAddressService.getDistricts();
      this.mSubDistrictList = [];
    },100);
   }
   if (index == 2) {
    setTimeout(()=>{
      this.pDistrictList = this.familyAndAddress.patrolAddressService.getDistricts();
      this.pSubDistrictList = [];
    },100);
   }
 }

 handleCompleteClickSubDistrict(index: number) {
   console.log("handleCompleteClickSubDistrict");

   if (index == 0) {
      this.fSubDistrictList = [];
      this.fSubDistrictList = this.familyAndAddress.fatherAddressService.getSubDistricts();
   }

   if (index == 1) {
      this.mSubDistrictList = [];
      this.mSubDistrictList = this.familyAndAddress.motherAddressService.getSubDistricts();
   }

   if (index == 2) {
      this.pSubDistrictList = [];
      this.pSubDistrictList = this.familyAndAddress.patrolAddressService.getSubDistricts();
   }
 }

 // Autocomplete Selected
 selectProvince(index: number) {
  if(index == 0){
    this.familyAndAddress.fatherAddressService.initialDistrict(this.manageForm.dadProvince.province_ref);
    this.manageForm.acParent.father_province = this.manageForm.dadProvince.province_ref;
    this.manageForm.dadDistrict = null;
    this.manageForm.dadSubDistrict = null;
    this.manageForm.acParent.father_district = null;
    this.manageForm.acParent.father_sub_district = null;
    this.manageForm.acParent.father_postcode = null;
  }
  if(index == 1){
    this.familyAndAddress.motherAddressService.initialDistrict(this.manageForm.momProvince.province_ref);
    this.manageForm.acParent.mother_province = this.manageForm.momProvince.province_ref;
    this.manageForm.momDistrict = null;
    this.manageForm.momSubDistrict = null;
    this.manageForm.acParent.mother_district = null;
    this.manageForm.acParent.mother_sub_district = null;
    this.manageForm.acParent.mother_postcode = null;
  }
  if(index == 2){
    this.familyAndAddress.patrolAddressService.initialDistrict(this.manageForm.patrolProvince.province_ref);
    this.manageForm.acParent.patrol_province = this.manageForm.patrolProvince.province_ref;
    this.manageForm.patrolDistrict = null;
    this.manageForm.patrolSubDistrict = null;
    this.manageForm.acParent.patrol_district = null;
    this.manageForm.acParent.patrol_sub_district = null;
    this.manageForm.acParent.patrol_postcode = null;
  }

 }

 selectDistrict(index: number) {
  if(index == 0){
    this.familyAndAddress.fatherAddressService.initialSubDistrict(this.manageForm.dadDistrict.district_ref);
    this.manageForm.acParent.father_district = this.manageForm.dadDistrict.district_ref;
  }
  if(index == 1){
    this.familyAndAddress.motherAddressService.initialSubDistrict(this.manageForm.momDistrict.district_ref);
    this.manageForm.acParent.mother_district = this.manageForm.momDistrict.district_ref;
  }
  if(index == 2){
    this.familyAndAddress.patrolAddressService.initialSubDistrict(this.manageForm.patrolDistrict.district_ref);
    this.manageForm.acParent.patrol_district = this.manageForm.patrolDistrict.district_ref;
  }
 }


 selectSubDistrict(index: number) {
  if(index == 0){
    this.manageForm.acParent.father_sub_district = this.manageForm.dadSubDistrict.sub_district_ref;
    this.manageForm.acParent.father_postcode = this.manageForm.dadSubDistrict.postcode;
  }
  if(index == 1){
    this.manageForm.acParent.mother_sub_district = this.manageForm.momSubDistrict.sub_district_ref;
    this.manageForm.acParent.mother_postcode = this.manageForm.momSubDistrict.postcode;
  }
  if(index == 2){
    this.manageForm.acParent.patrol_sub_district = this.manageForm.patrolSubDistrict.sub_district_ref;
    this.manageForm.acParent.patrol_postcode = this.manageForm.patrolSubDistrict.postcode;
  }
 }


 nextButtonOnClick() {
  this.familyAndAddress.onChangePanel(1,this.manageForm);
 }
}

