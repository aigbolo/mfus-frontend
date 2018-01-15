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
export class FamilyComponent implements OnInit {
 //message
 msgs: Message[] = [];

 manageForm: FamilyAndAddressForm = new FamilyAndAddressForm();
 manageFormGroup: FormGroup;

 dadDropdownMonths: SelectItem[];
 dadDropdownDays: SelectItem[];
 dadMonth: string = null;
 dadDay: string = null;
 dadYear: string = null;

 momDropdownMonths: SelectItem[];
 momDropdownDays: SelectItem[];
 momMonth: string = null;
 momDay: string = null;
 momYear: string = null;

 patrolDropdownMonths: SelectItem[];
 patrolDropdownDays: SelectItem[];
 patrolMonth: string = null;
 patrolDay: string = null;
 patrolYear: string = null;

 // Autocomplete Province
 listProvince: RftProvince[] = [];

 fProvinceList: RftProvince[] = [];
 mProvinceList: RftProvince[] = [];
 pProvinceList: RftProvince[] = [];

 // Autocomplete District
 fDistrictList: RftDistrict[] = [];
 fListDistrict: RftDistrict[] = [];
 mDistrictList: RftDistrict[] = [];
 mListDistrict: RftDistrict[] = [];
 pDistrictList: RftDistrict[] = [];
 pListDistrict: RftDistrict[] = [];

 // Autocomplete SubDistrict
 fSubDistrictList: RftSubDistrict[] = [];
 fListSubDistrict: RftSubDistrict[] = [];
 mSubDistrictList: RftSubDistrict[] = [];
 mListSubDistrict: RftSubDistrict[] = [];
 pSubDistrictList: RftSubDistrict[] = [];
 pListSubDistrict: RftSubDistrict[] = [];

 dadProvince: RftProvince = new RftProvince();
 dadDistrict: RftDistrict = new RftDistrict();
 dadSubDistrict: RftSubDistrict = new RftSubDistrict();

 momProvince: RftProvince = new RftProvince();
 momDistrict: RftDistrict = new RftDistrict();
 momSubDistrict: RftSubDistrict = new RftSubDistrict();

 patrolProvince: RftProvince = new RftProvince();
 patrolDistrict: RftDistrict = new RftDistrict();
 patrolSubDistrict: RftSubDistrict = new RftSubDistrict();

 constructor(
   private utilsService: UtilsService,
   public familyAndAddress: M020103ManageFamilyAndAddressComponent
 ) {}

 ngOnInit() {
   console.log("FamilyComponent.ngOnInit ");
   this.validatorForm();
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
     dadMonth: new FormControl(this.dadMonth,Validators.compose([Validators.required])),
     dadDay: new FormControl(this.dadDay,Validators.compose([Validators.required])),
     dadYear: new FormControl(this.dadYear,Validators.compose([Validators.required])),
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
     momMonth: new FormControl(this.momMonth,Validators.compose([Validators.required])),
     momDay: new FormControl(this.momDay,Validators.compose([Validators.required])),
     momYear: new FormControl(this.momYear, Validators.compose([Validators.required])),
     mother_address: new FormControl(this.manageForm.acParent.mother_address,Validators.compose([Validators.required])),
     mother_province: new FormControl(this.momProvince,Validators.compose([Validators.required])),
     mother_district: new FormControl(this.momDistrict,Validators.compose([Validators.required])),
     mother_sub_district: new FormControl(this.momSubDistrict,Validators.compose([Validators.required])),
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
     patrolMonth: new FormControl(this.patrolMonth),
     patrolDay: new FormControl(this.patrolDay),
     patrolYear: new FormControl(this.patrolYear),
     patrol_address: new FormControl(this.manageForm.acParent.patrol_address),
     patrol_province: new FormControl(this.patrolProvince),
     patrol_district: new FormControl(this.patrolDistrict),
     patrol_sub_district: new FormControl(this.patrolSubDistrict),
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
         this.manageFormGroup.controls["dadMonth"].setValidators([Validators.required]);
         this.manageFormGroup.controls["dadDay"].setValidators([Validators.required]);
         this.manageFormGroup.controls["dadYear"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_address"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_province"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_district"].setValidators([Validators.required]);
         this.manageFormGroup.controls["father_sub_district"].setValidators([Validators.required]);

         this.manageFormGroup.controls["mother_pid"].setValidators([Validators.required]);
         this.manageFormGroup.controls["mother_name"].setValidators([Validators.required]);
         this.manageFormGroup.controls["momMonth"].setValidators([Validators.required]);
         this.manageFormGroup.controls["momDay"].setValidators([Validators.required]);
         this.manageFormGroup.controls["momYear"].setValidators([Validators.required]);
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
         this.manageFormGroup.controls["patrolMonth"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrolMonth"].updateValueAndValidity();
         this.manageFormGroup.controls["patrolDay"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrolDay"].updateValueAndValidity();
         this.manageFormGroup.controls["patrolYear"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrolYear"].updateValueAndValidity();
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
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["father_name"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["dadMonth"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["dadDay"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["dadYear"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["father_address"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["father_province"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["father_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
         this.manageFormGroup.controls["father_sub_district"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["patrol_sub_district"].updateValueAndValidity();

         this.manageFormGroup.controls["mother_pid"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_pid"].updateValueAndValidity();
         this.manageFormGroup.controls["mother_name"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["mother_name"].updateValueAndValidity();
         this.manageFormGroup.controls["momMonth"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["momMonth"].updateValueAndValidity();
         this.manageFormGroup.controls["momDay"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["momDay"].updateValueAndValidity();
         this.manageFormGroup.controls["momYear"].setValidators([Validators.nullValidator]);
         this.manageFormGroup.controls["momYear"].updateValueAndValidity();
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

 prepareBirthDateData() {
   if (this.manageForm.acParent.parent_flag == "1") {
     this.dadYear = this.manageForm.acParent.father_birth_date.substr(0, 4);
     this.dadMonth = this.manageForm.acParent.father_birth_date.substr(4, 2);
     this.dadDay = this.manageForm.acParent.father_birth_date.substr(6, 2);

     this.momYear = this.manageForm.acParent.mother_birth_date.substr(0, 4);
     this.momMonth = this.manageForm.acParent.mother_birth_date.substr(4, 2);
     this.momDay = this.manageForm.acParent.mother_birth_date.substr(6, 2);
   } else {
     this.dadYear = this.manageForm.acParent.patrol_birth_date.substr(0, 4);
     this.dadMonth = this.manageForm.acParent.patrol_birth_date.substr(4, 2);
     this.dadDay = this.manageForm.acParent.patrol_birth_date.substr(6, 2);
   }

 }


 autocompleteProvince(event,seq: number) {
   console.log("autocompleteProvince: "+seq);
   let query = event.query;
   if(seq == 1){
     this.fProvinceList = [];
     this.dadDistrict = new RftDistrict();
     this.dadSubDistrict = new RftSubDistrict();
     this.manageForm.acParent.father_province = null;
     this.manageForm.acParent.father_postcode = null;
     let objList: RftProvince[];
     objList = this.listProvince;
     for (let obj of objList) {
       // Filter By string event
       if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
         this.fProvinceList.push(obj);
       }
     }
   }
   if(seq == 2){
     this.mProvinceList = [];
     this.momDistrict = new RftDistrict();
     this.momSubDistrict = new RftSubDistrict();
     this.manageForm.acParent.mother_postcode = null;
     let objList: RftProvince[];
     objList = this.listProvince;
     for (let obj of objList) {
       // Filter By string event
       if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
         this.mProvinceList.push(obj);
       }
     }
   }
   if(seq == 3){
     this.pProvinceList = [];
     this.patrolDistrict = new RftDistrict();
     this.patrolSubDistrict = new RftSubDistrict();
     this.manageForm.acParent.patrol_postcode = null;
     let objList: RftProvince[];
     objList = this.listProvince;
     for (let obj of objList) {
       // Filter By string event
       if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
         this.pProvinceList.push(obj);
       }
     }
   }

 }

 // Autocomplete filter
 autocompleteDistrict(event) {
   console.log("autocompleteDistrict");
   let query = event.query;
   this.fDistrictList = [];
   this.dadSubDistrict = new RftSubDistrict();
   let objList: RftDistrict[];
   objList = this.fListDistrict;
   for (let obj of objList) {
     // Filter By string event
     if (this.dadProvince.province_ref === obj.province_ref) {
       if (
         obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
       ) {
         this.fDistrictList.push(obj);
       }
     }
   }
 }

 autocompleteSubDistrict(event) {
   console.log("autocompleteSubDistrict: " + this.dadDistrict.district_ref);
   let query = event.query;
   this.fSubDistrictList = [];
   let objList: RftSubDistrict[] = this.fListSubDistrict;
   for (let obj of objList) {
     // Filter By string event
     if (obj.province_ref == this.dadProvince.province_ref) {
       if (obj.district_ref == this.dadDistrict.district_ref) {
         if (
           obj.sub_district_name_t
             .toLowerCase()
             .indexOf(query.toLowerCase()) == 0
         ) {
           this.fSubDistrictList.push(obj);
         }
       }
     }
   }
 }

 handleCompleteClickProvince(index: number) {
   console.log("handleCompleteClickProvince");
   console.log(this.listProvince.length);
   if (index == 0) {
     this.fProvinceList = [];

     setTimeout(() => {
       this.fProvinceList = this.listProvince;
       this.fDistrictList = [];
       this.fSubDistrictList = [];
     }, 100);
   }
   if (index == 1) {
     this.mProvinceList = [];
     setTimeout(() => {
       this.mProvinceList = this.listProvince;
       this.mDistrictList = [];
       this.mSubDistrictList = [];
     }, 100);
   }
   if (index == 2) {
     this.pProvinceList = [];
     setTimeout(() => {
       this.pProvinceList = this.listProvince;
       this.pDistrictList = [];
       this.pSubDistrictList = [];
     }, 100);
   }
 }

 handleCompleteClickDistrict(index: number) {
   console.log("handleCompleteClickDistrict");
   if (index == 0) {
     this.fDistrictList = [];
     setTimeout(() => {
       this.fDistrictList = this.fListDistrict;
       this.fSubDistrictList = [];
     }, 100);
   }
   if (index == 1) {
     this.mDistrictList = [];
     setTimeout(() => {
       this.mDistrictList = this.mListDistrict;
       this.mSubDistrictList = [];
     }, 100);
   }
   if (index == 2) {
     this.pDistrictList = [];
     setTimeout(() => {
       this.pDistrictList = this.pListDistrict;
       this.pSubDistrictList = [];
     }, 100);
   }
 }

 handleCompleteClickSubDistrict(index: number) {
   console.log("handleCompleteClickSubDistrict");

   if (index == 0) {
     this.fSubDistrictList = [];

     setTimeout(() => {
       this.fSubDistrictList = this.fListSubDistrict;
     }, 100);
   }

   if (index == 1) {
     this.mSubDistrictList = [];

     setTimeout(() => {
       this.mSubDistrictList = this.mListSubDistrict;
     }, 100);
   }

   if (index == 2) {
     this.pSubDistrictList = [];

     setTimeout(() => {
       this.pSubDistrictList = this.pListSubDistrict;
     }, 100);
   }
 }

 // Autocomplete Selected
 selectProvince(index: number) {


 }

 selectDistrict(index: number) {
 }


 selectSubDistrict(index: number) {

 }

 setupDistictList() {

 }

 setupSubDistictList() {

 }

 nextButtonOnClick() {

 }
}

