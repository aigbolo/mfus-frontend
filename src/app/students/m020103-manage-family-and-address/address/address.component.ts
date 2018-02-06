import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from './../../../services/utils/utils.service';
import { Observable } from 'rxjs/Observable';
import { RftSubDistrict } from './../../../models/rft-sub-district';
import { RftDistrict } from './../../../models/rft-district';
import { RftProvince } from './../../../models/rft-province';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FamilyAndAddressForm } from './../../../forms/family-and-address-form';
import { Component, OnInit } from '@angular/core';
import { M020103ManageFamilyAndAddressComponent } from '../m020103-manage-family-and-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  pageReady :boolean = false;
  manageForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  manageFormGroup: FormGroup;


  homeProvinceList: RftProvince[] = [];
  currentProvinceList: RftProvince[] = [];

  // Autocomplete District
  homeDistrictList: RftDistrict[] = [];
  currentDistrictList: RftDistrict[] = [];

  // Autocomplete SubDistrict
  homeSubDistrictList: RftSubDistrict[] = [];
  currentSubDistrictList: RftSubDistrict[] = [];



  image: any;
  imageName: string = "";
  uploadedFiles: any[] = [];

  constructor(
    private utilsService: UtilsService,
    private familyAndAddress: M020103ManageFamilyAndAddressComponent,
    public ngProgress: NgProgress
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    // this.ngProgress.start();
    this.image = null;
    this.manageForm = new FamilyAndAddressForm();
    this.validatorForm();
    this.manageForm = this.familyAndAddress.getData();


  }

  validatorForm() {
    this.manageFormGroup = new FormGroup({
      home_address: new FormControl(this.manageForm.acAddress.home_address,Validators.compose([Validators.required])),
      homeProvince: new FormControl(this.manageForm.homeProvince,Validators.compose([Validators.required])),
      homeDistrict: new FormControl(this.manageForm.homeDistrict,Validators.compose([Validators.required])),
      homeSubDistrict: new FormControl(this.manageForm.homeSubDistrict,Validators.compose([Validators.required])),
      home_postcode: new FormControl(this.manageForm.acAddress.home_postcode),
      current_address: new FormControl(this.manageForm.acAddress.current_address,Validators.compose([Validators.required])),
      currentProvince: new FormControl(this.manageForm.currentProvince,Validators.compose([Validators.required])),
      currentDistrict: new FormControl(this.manageForm.currentDistrict,Validators.compose([Validators.required])),
      currentSubDistrict: new FormControl(this.manageForm.currentSubDistrict,Validators.compose([Validators.required])),
      current_postcode: new FormControl(this.manageForm.acAddress.current_postcode),
    });
  }

  onUpload(event) {
    console.log('onUpload');
    if (event.files != null)
    this.uploadedFiles = [];

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.image = this.uploadedFiles[0].objectURL;
    this.imageName = this.uploadedFiles[0].name;

    this.manageForm.acAddress.direction_name = this.uploadedFiles[0].name;
    this.manageForm.acAddress.direction_type = this.uploadedFiles[0].type;

    this.utilsService
      .convertBlobToString(this.uploadedFiles[0].objectURL)
      .subscribe(
        val => {
          this.manageForm.acAddress.direction_image = val;
        },
        err => {
          console.log(err);
        },
        () => {

        }
      );
  }



  autocompleteProvince(event,index:number) {
    console.log("autocompleteProvince");
    let query = event.query;
    if(index == 0){
      this.homeProvinceList = [];
      this.manageForm.homeDistrict = new RftDistrict();
      this.manageForm.homeSubDistrict = new RftSubDistrict();
      let objList: RftProvince[];
      objList = this.familyAndAddress.homeAddressService.getProvinces();
      for (let obj of objList) {
        // Filter By string event
        if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.homeProvinceList.push(obj);
        }
      }
    }
    if(index == 1){
      this.currentProvinceList = [];
      this.manageForm.currentDistrict = new RftDistrict();
      this.manageForm.currentSubDistrict = new RftSubDistrict();
      let objList: RftProvince[];
      objList = this.familyAndAddress.currentAddressService.getProvinces();
      for (let obj of objList) {
        // Filter By string event
        if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.currentProvinceList.push(obj);
        }
      }
    }

  }

  // Autocomplete filter
  autocompleteDistrict(event,index:number) {
    console.log("autocompleteDistrict");
    let query = event.query;
    if(index ==0){
      this.homeDistrictList = [];
      this.manageForm.homeSubDistrict = new RftSubDistrict();
      let objList: RftDistrict[];
      objList = this.familyAndAddress.homeAddressService.getDistricts();
      for (let obj of objList) {
        // Filter By string event
        if (this.manageForm.homeProvince.province_ref === obj.province_ref) {
          if (
            obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            this.homeDistrictList.push(obj);
          }
        }
      }
    }
    if(index ==1){
      this.currentDistrictList = [];
      this.manageForm.currentSubDistrict = new RftSubDistrict();
      let objList: RftDistrict[];
      objList = this.familyAndAddress.currentAddressService.getDistricts();
      for (let obj of objList) {
        // Filter By string event
        if (this.manageForm.currentProvince.province_ref === obj.province_ref) {
          if (
            obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            this.currentDistrictList.push(obj);
          }
        }
      }
    }

  }

  autocompleteSubDistrict(event,index:number) {
    console.log("autocompleteSubDistrict: " + this.manageForm.homeDistrict.district_ref);
    let query = event.query;
    if(index == 0){
      this.homeSubDistrictList = [];
      let objList: RftSubDistrict[] = this.familyAndAddress.homeAddressService.getSubDistricts();
      for (let obj of objList) {
        // Filter By string event
        if (obj.province_ref == this.manageForm.homeProvince.province_ref) {
          if (obj.district_ref == this.manageForm.homeDistrict.district_ref) {
            if (
              obj.sub_district_name_t
                .toLowerCase()
                .indexOf(query.toLowerCase()) == 0
            ) {
              this.homeSubDistrictList.push(obj);
            }
          }
        }
      }
    }
    if(index == 1){
      this.currentSubDistrictList = [];
      let objList: RftSubDistrict[] = this.familyAndAddress.currentAddressService.getSubDistricts();
      for (let obj of objList) {
        // Filter By string event
        if (obj.province_ref == this.manageForm.currentProvince.province_ref) {
          if (obj.district_ref == this.manageForm.currentDistrict.district_ref) {
            if (
              obj.sub_district_name_t
                .toLowerCase()
                .indexOf(query.toLowerCase()) == 0
            ) {
              this.currentSubDistrictList.push(obj);
            }
          }
        }
      }
    }

  }

  handleCompleteClickProvince(index: number) {
    console.log("handleCompleteClickProvince");
    if (index == 0) {
      setTimeout(() => {
        this.homeProvinceList = this.familyAndAddress.homeAddressService.getProvinces();
        this.homeDistrictList = [];
        this.homeSubDistrictList = [];
      }, 100);
    }
    if (index == 1) {
      setTimeout(() => {
        this.currentProvinceList = this.familyAndAddress.currentAddressService.getProvinces();
        this.currentDistrictList = [];
        this.currentSubDistrictList = [];
      }, 100);
    }
  }

  handleCompleteClickDistrict(index: number) {
    console.log("handleCompleteClickDistrict");
    if (index == 0) {
      setTimeout(() => {
        this.homeDistrictList = this.familyAndAddress.homeAddressService.getDistricts();
        this.homeSubDistrictList = [];
      }, 100);
    }
    if (index == 1) {
      setTimeout(() => {
        this.currentDistrictList = this.familyAndAddress.currentAddressService.getDistricts();
        this.currentSubDistrictList = [];
      }, 100);
    }
  }

  handleCompleteClickSubDistrict(index: number) {
    console.log("handleCompleteClickSubDistrict");
    if (index == 0) {
      setTimeout(() => {
        this.homeSubDistrictList = this.familyAndAddress.homeAddressService.getSubDistricts();
        console.log("index:0 ==> "+this.homeSubDistrictList.length);
      }, 100);
    }
    if (index == 1) {
      setTimeout(() => {
        this.currentSubDistrictList = this.familyAndAddress.currentAddressService.getSubDistricts();
      }, 100);
    }
  }

  // Autocomplete Selected
  selectProvince(index: number) {
    if(index == 0){
      this.manageForm.acAddress.home_province = this.manageForm.homeProvince.province_ref;
      this.familyAndAddress.homeAddressService.initialDistrict(this.manageForm.homeProvince.province_ref);
    }
    if(index == 1){
      this.familyAndAddress.currentAddressService.initialDistrict(this.manageForm.currentProvince.province_ref);
    }
  }

  selectDistrict(index: number) {
    if(index == 0){
      this.manageForm.acAddress.home_district = this.manageForm.homeDistrict.district_ref;
      this.familyAndAddress.homeAddressService.initialSubDistrict(this.manageForm.homeDistrict.district_ref);
    }
    if(index == 1){
      this.familyAndAddress.currentAddressService.initialSubDistrict(this.manageForm.currentDistrict.district_ref);
      this.manageForm.acAddress.current_district = this.manageForm.currentDistrict.district_ref;
    }

  }

  selectSubDistrict(index: number) {
    if(index == 0){
      this.manageForm.acAddress.home_sub_district = this.manageForm.homeSubDistrict.sub_district_ref;
      this.manageForm.acAddress.home_postcode = this.manageForm.homeSubDistrict.postcode;
    }
    if(index == 1){
      this.manageForm.acAddress.current_postcode = this.manageForm.currentSubDistrict.postcode;
      this.manageForm.acAddress.current_sub_district = this.manageForm.currentSubDistrict.sub_district_ref;
    }
  }




  submitButtonOnClick() {
    console.log("submitButtonOnClick");

    if(this.manageFormGroup.invalid){
      this.utilsService.findInvalidControls(this.manageFormGroup);
    }else{
      this.familyAndAddress.onSubmit(this.manageForm);
    }

  }
  prevButtonOnClick() {
    console.log("prevButtonOnClick");
    this.familyAndAddress.onChangePanel(1, this.manageForm);
    this.manageForm = new FamilyAndAddressForm();
  }
}
