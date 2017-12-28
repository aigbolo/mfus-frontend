import { OfficerForm } from './../../../forms/officer-form';
import { NgProgress } from 'ngx-progressbar';
import { Subject } from 'rxjs/Subject';
import { AcOfficer } from './../../../models/ac-officer';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from './../../../services/utils/layout.service';
import { M010102OfficerService } from './../../../services/officers/m010102-officer.service';
import { ReferenceService } from './../../../services/general/reference.service';

import { RftSubDistrict } from './../../../models/rft-sub-district';
import { RftDistrict } from './../../../models/rft-district';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RftProvince } from '../../../models/rft-province';
import { UtilsService } from '../../../services/utils/utils.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-manage-officer',
  templateUrl: './m010102-manage-officer.component.html',
  styleUrls: ['./m010102-manage-officer.component.css']
})
export class M010102ManageOfficerComponent implements OnInit {

  pageRender = false;
  user = localStorage.getItem('username');
  manageOfficerForm: OfficerForm = new OfficerForm();
  updateOfficerForm: OfficerForm = new OfficerForm();
  officerFormGroup: FormGroup;

  // Autocomplete Province
  provinceList: RftProvince[] = [];
  provinceObject: RftProvince;

  // Autocomplete District
  districtList: RftDistrict[] = [];
  districtObject: RftDistrict;
  listDistrict: RftDistrict[] = [];

  // Autocomplete SubDistrict
  subDistrictList: RftSubDistrict[] = [];
  subDistrictObject: RftSubDistrict;
  listSubDistrict: RftSubDistrict[] = [];

  activeFlag: any[];
  titleList: any[];

  uploadedFiles: any[] = [];
  flag: boolean;
  btnLabel: string;

  constructor(private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private officerService: M010102OfficerService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start()
    this.btnLabel = 'เพิ่มข้อมูล'
    this.layoutService.setPageHeader('บันทึกข้อมูลเจ้าหน้าที่');
    this.validateForm();
    this.activeFlag = this.utilsService.getActiveFlag('M')
    this.titleList = this.utilsService.getTitleList()
    this.referenceService.initialProvince();
    this.manageOfficerForm.acOfficer.officer_ref = this.route.snapshot.params['id'];
    if (this.manageOfficerForm.acOfficer.officer_ref != null) {
      this.btnLabel = 'แก้ไขข้อมูล'
      this.layoutService.setPageHeader('แก้ไขข้อมูลเจ้าหน้าที่');
      this.officerFormGroup.controls['officer_code'].disable();
      this.onRowSelected();
    }else{
      this.pageRender = true;
      this.ngProgress.done()
    }
  }

  validateForm() {
    this.officerFormGroup = new FormGroup({
      officer_code: new FormControl(this.manageOfficerForm.acOfficer.officer_code,
        Validators.compose([Validators.required])),
      active_flag: new FormControl(this.manageOfficerForm.acOfficer.active_flag = 'Y'),
      gender: new FormControl(this.manageOfficerForm.acOfficer.gender = 'M',
        Validators.compose([Validators.required])),
      title_ref: new FormControl(this.manageOfficerForm.acOfficer.title_ref = 'Mr',
        Validators.compose([Validators.required])),
      personal_id: new FormControl(this.manageOfficerForm.acOfficer.personal_id,
        Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
      first_name: new FormControl(this.manageOfficerForm.acOfficer.first_name,
        Validators.compose([Validators.required])),
      last_name: new FormControl(this.manageOfficerForm.acOfficer.last_name,
        Validators.compose([Validators.required])),
      address: new FormControl(this.manageOfficerForm.acOfficer.address),
      postcode: new FormControl(this.manageOfficerForm.acOfficer.postcode),
      phone_no: new FormControl(this.manageOfficerForm.acOfficer.phone_no,
        Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
      email: new FormControl(this.manageOfficerForm.acOfficer.email,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)),
      province_name_t: new FormControl(this.manageOfficerForm.rftProvince.province_name_t),
      district_name_t: new FormControl(this.manageOfficerForm.rftDistrict.district_name_t),
      sub_district_name_t: new FormControl(this.manageOfficerForm.rftSubDistrict.sub_district_name_t),
      manage_officer_flag: new FormControl(this.flag = false),
      image: new FormControl(this.manageOfficerForm.acOfficer.profile_image = '../../../../assets/images/empty_profile.png', Validators.compose([Validators.required]))
    });
    this.officerFormGroup.controls['active_flag'].disable();
  }

  autocompleteProvince(event) {
    let query = event.query;
    this.provinceList = [];
    this.manageOfficerForm.rftDistrict = new RftDistrict();
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    let objList = this.referenceService.getProvinces();
    for (let obj of objList) {
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  handleCompleteClickProvince() {
    setTimeout(() => {
      this.provinceList = []
      this.provinceList = this.referenceService.getProvinces();
    }, 100)
  }

  selectProvince(event: SelectItem) {
    this.districtList = [];
    this.subDistrictList = [];
    this.manageOfficerForm.rftDistrict = new RftDistrict();
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    this.referenceService.initialDistrict(this.manageOfficerForm.rftProvince.province_ref)
  }

  autocompleteDistrict(event) {
    let query = event.query;
    this.districtList = [];
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    let objList = this.referenceService.getDistricts();
    for (let obj of objList) {
      if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.districtList.push(obj);
      }
    }
  }

  handleCompleteClickDistrict() {
    setTimeout(() => {
      this.districtList = [];
      this.districtList = this.referenceService.getDistricts();
      this.listSubDistrict = [];
    }, 100)
  }

  selectDistrict(event: SelectItem) {

    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    this.referenceService.initialSubDistrict(this.manageOfficerForm.rftDistrict.district_ref)
  }

  autocompleteSubDistrict(event) {
    let query = event.query;
    this.subDistrictList = [];
    let objList = this.referenceService.getSubDistricts()
    console.log(objList)
    for (let obj of objList) {
      if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.subDistrictList.push(obj);
      }
    }
  }

  handleCompleteClickSubDistrict() {
    setTimeout(() => {
      this.subDistrictList = [];
      this.subDistrictList = this.referenceService.getSubDistricts()
    }, 100)
  }

  selectSubDistrict(event: SelectItem) {
    console.log(this.manageOfficerForm.rftSubDistrict.sub_district_ref)
    this.manageOfficerForm.acOfficer.postcode = this.manageOfficerForm.rftSubDistrict.postcode;
  }

  onUpload(event){

    if(event.files != null)
    this.uploadedFiles = [];

    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.manageOfficerForm.acOfficer.profile_image = this.uploadedFiles[0].objectURL;
    this.manageOfficerForm.acOfficer.profile_name = this.uploadedFiles[0].name;
    this.manageOfficerForm.acOfficer.profile_type = this.uploadedFiles[0].type;

    this.utilsService.convertBlobToString(this.manageOfficerForm.acOfficer.profile_image).subscribe(
      val =>{
        this.manageOfficerForm.acOfficer.profile_image = val;
      }
    )
  }

  onRowSelected(){
    this.officerService.selectOfficer(this.manageOfficerForm.acOfficer).subscribe(res=>{
      this.manageOfficerForm.acOfficer = res
      this.manageOfficerForm.acOfficer.manage_officer_flag = this.utilsService.setManageStatus(res.manage_officer_flag);
      if(this.manageOfficerForm.acOfficer.profile_image == null){
        this.manageOfficerForm.acOfficer.profile_image = '../../../../assets/images/empty_profile.png'
      }
      console.log(this.manageOfficerForm.acOfficer)
    },error=>{
      console.log(error)
    },()=>{
      this.updateOfficerForm = this.manageOfficerForm
      console.log(this.updateOfficerForm)
      this.pageRender = true;
      this.ngProgress.done()
    })
  }

  onSubmit() {
    if (this.btnLabel == 'เพิ่มข้อมูล') {
      if (this.officerFormGroup.invalid) {
        console.log("Form Invalid")
        this.officerFormGroup.controls["officer_code"].markAsDirty();
        this.officerFormGroup.controls["gender"].markAsDirty();
        this.officerFormGroup.controls["personal_id"].markAsDirty();
        this.officerFormGroup.controls["first_name"].markAsDirty();
        this.officerFormGroup.controls["last_name"].markAsDirty();
        this.officerFormGroup.controls["phone_no"].markAsDirty();
        this.officerFormGroup.controls["email"].markAsDirty();
        this.officerFormGroup.controls["image"].markAsDirty();
      }
      this.manageOfficerForm.acOfficer.manage_officer_flag = this.utilsService.getManageStatus(this.flag);
      this.officerService.doInsert(this.manageOfficerForm.acOfficer, this.user);
    } else {
      this.manageOfficerForm.acOfficer.province = this.manageOfficerForm.rftProvince.province_ref
      this.manageOfficerForm.acOfficer.district = this.manageOfficerForm.rftDistrict.district_ref
      this.manageOfficerForm.acOfficer.sub_district = this.manageOfficerForm.rftSubDistrict.sub_district_ref
      this.manageOfficerForm.acOfficer.manage_officer_flag = this.utilsService.getManageStatus(this.flag);
      this.officerService.doUpdate(this.manageOfficerForm.acOfficer)
    }
  }



  onResetClick() {
    if (this.btnLabel == 'เพิ่มข้อมูล') {
      console.log('reset insert')
    this.manageOfficerForm = new OfficerForm();
    this.manageOfficerForm.acOfficer.profile_image = '../../../../assets/images/empty_profile.png'
    this.manageOfficerForm.acOfficer.profile_name = ''
    this.manageOfficerForm.acOfficer.profile_type = ''
    }else{
      console.log('resetupdate')
      console.log(this.updateOfficerForm)
      this.manageOfficerForm = new OfficerForm();
      this.manageOfficerForm = this.updateOfficerForm
    }
  }

  onPageSearch() {
    this.utilsService.goToPage('search-officer')
  }



}
