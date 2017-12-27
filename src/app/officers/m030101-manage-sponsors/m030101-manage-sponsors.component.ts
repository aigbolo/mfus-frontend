import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { M030101SponsorsService } from './../../services/officers/m030101-sponsors.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RftSubDistrict } from './../../models/rft-sub-district';
import { UtilsService } from './../../services/utils/utils.service';
import { RftProvince } from './../../models/rft-province';
import { Observable } from 'rxjs/Observable';
import { ReferenceService } from '../../services/general/reference.service';
import { LayoutService } from '../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { RftDistrict } from '../../models/rft-district';
import { M030101SponsorsForm } from '../../forms/sponsors-form';

@Component({
  selector: 'app-m030101-manage-sponsors',
  templateUrl: './m030101-manage-sponsors.component.html',
  styleUrls: ['./m030101-manage-sponsors.component.css']
})
export class M030101ManageSponsorsComponent implements OnInit {
  pageRender = false;
  user = localStorage.getItem('username');
  manageForm: M030101SponsorsForm = new M030101SponsorsForm();
  manageFormGroup: FormGroup;

  image: any;
  imageName: string ='';
  uploadedFiles: any[] = [];

  activeStatus: SelectItem[] = [];
  provinceList: RftProvince[] = [];
  districtList: RftDistrict[] = [];
  subDistrictList: RftSubDistrict[] = [];

  province: RftProvince = new RftProvince;
  district: RftDistrict = new RftDistrict;
  subDistrict: RftSubDistrict = new RftSubDistrict;


  constructor(private layoutService: LayoutService,
              private referenceService: ReferenceService,
              private utilsService: UtilsService,
              private sponsorsService: M030101SponsorsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.layoutService.setPageHeader('บันทึกข้อมูลผู้ให้ทุนการศึกษา');
    this.image = '../../assets/images/empty_profile.png';
    this.referenceService.initialProvince();
    this.activeStatus = this.utilsService.getActiveFlag('M');

    this.validatorForm();
    console.log(this.user);
    this.manageForm.sponsors.active_flag = "Y";
    this.manageForm.sponsors.create_user = this.user;
    this.manageForm.sponsors.update_user = this.user;


    if(this.route.snapshot.params['ref'] != null){
      this.manageForm.sponsors.sponsors_ref = this.route.snapshot.params['ref'];
      this.onUpdatePageSetup();
    }else{
      this.pageRender = true;
    }

  }

  onUpdatePageSetup(){
    let values: Array<any> = [];
    this.layoutService.setPageHeader('แก้ไขข้อมูลผู้ให้ทุนการศึกษา');
    setTimeout(()=>{
    this.sponsorsService.onRowSelect(this.manageForm)
    .subscribe(data =>{
      this.manageForm.sponsors = data;
      console.log(data);
    });
    },500);

    setTimeout(()=>{
      let provinceRef = this.manageForm.sponsors.province;
      let districtRef = this.manageForm.sponsors.district;
      let subDistrictRef = this.manageForm.sponsors.sub_district;
      console.log(provinceRef,districtRef,subDistrictRef);
      this.referenceService.getReferencesAddress(provinceRef,districtRef,subDistrictRef)
      .subscribe(value =>{
        values.push(value)
        this.province = values[0];
        this.district = values[1];
        this.subDistrict = values[2];
      },err=>{console.log(err)},
      ()=>{
        this.pageRender = true;
      })
    },3000);

  }


  validatorForm() {
    this.manageFormGroup = new FormGroup({
      sponsors_name: new FormControl(this.manageForm.sponsors.sponsors_name,Validators.compose([Validators.required])),
      active_flag: new FormControl(this.manageForm.sponsors.active_flag,Validators.compose([Validators.required])),
      address: new FormControl(this.manageForm.sponsors.address,Validators.compose([Validators.required])),
      province: new FormControl(this.province,Validators.compose([Validators.required])),
      district: new FormControl(this.district,Validators.compose([Validators.required])),
      subDistrict: new FormControl(this.subDistrict,Validators.compose([Validators.required])),
      postcode: new FormControl(this.manageForm.sponsors.postcode),
      phone_no: new FormControl(this.manageForm.sponsors.phone_no,Validators.compose([Validators.required])),
      email: new FormControl(this.manageForm.sponsors.email),
      website: new FormControl(this.manageForm.sponsors.website),
    })
  }


  autocompleteProvince(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.provinceList = [];

    let objList: RftProvince[];
    objList = this.referenceService.getProvinces();
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  handleCompleteClickProvince() {
    console.log("handleCompleteClickProvince");

     setTimeout(() => {
      this.provinceList = this.referenceService.getProvinces();
    }, 100);

  }

  seletedProvince(){
    this.referenceService.initialDistrict(this.province.province_ref);
  }

  autocompleteDistrict(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.districtList = [];

    let objList: RftDistrict[];
    objList = this.referenceService.getDistricts();
    for (let obj of objList) {
      // Filter By string event
      if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.districtList.push(obj);
      }
    }
  }

  handleCompleteClickDistrict() {
    console.log("handleCompleteClickDistrict");

     setTimeout(() => {
      this.districtList = this.referenceService.getDistricts();
    }, 100);

  }

  seletedDistrict(){
    this.referenceService.initialSubDistrict(this.district.district_ref);
  }

  autocompleteSubDistrict(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.subDistrictList = [];

    let objList: RftSubDistrict[];
    objList = this.referenceService.getSubDistricts();
    for (let obj of objList) {
      // Filter By string event
      if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.subDistrictList.push(obj);
      }
    }
  }

  handleCompleteClickSubDistrict() {
    console.log("handleCompleteClickDistrict");

     setTimeout(() => {
      this.districtList = this.referenceService.getDistricts();
    }, 100);

  }

  seletedSubDistrict(){
    this.manageForm.sponsors.postcode = this.subDistrict.postcode;
  }

  onUpload(event){

    if(event.files != null)
    this.uploadedFiles = [];

    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.image = this.uploadedFiles[0].objectURL;
    this.imageName = this.uploadedFiles[0].name;

    this.manageForm.sponsors.profile_name = this.uploadedFiles[0].name;
    this.manageForm.sponsors.profile_type = this.uploadedFiles[0].type;

    this.utilsService.convertBlobToString(this.uploadedFiles[0].objectURL).subscribe(
      val =>{
        this.manageForm.sponsors.profile_image = val;
      }
    )

  }

  onSubmit(){
    console.log('onSubmit.......');

    console.log("active-flag: "+this.manageForm.sponsors.active_flag);
    if(this.manageFormGroup.invalid){
     this.utilsService.findInvalidControls(this.manageFormGroup);

    }else{
      this.manageForm.sponsors.province = this.province.province_ref;
      this.manageForm.sponsors.district = this.district.district_ref;
      this.manageForm.sponsors.sub_district = this.subDistrict.sub_district_ref;

      this.sponsorsService.doInsert(this.manageForm);

    }
  }
}
