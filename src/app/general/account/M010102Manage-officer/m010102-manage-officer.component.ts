import { ReferanceService } from './../../../services/general/reference.service';

import { RftSubDistrict } from './../../../models/rft-sub-district';
import { RftDistrict } from './../../../models/rft-district';
import { Component, OnInit } from '@angular/core';
import { OfficerForm } from '../../../forms/officer-form';
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

  manageOfficerForm: OfficerForm = new OfficerForm();
  officerFormGroup: FormGroup;

  // Autocomplete Province
  provinceList: RftProvince[] = [];
  provinceObject: RftProvince;
  listProvince: RftProvince[] = [];

  // Autocomplete District
  districtList: RftDistrict[] = [];
  districtObject: RftDistrict;
  listDistrict: RftDistrict[] = [];

  // Autocomplete SubDistrict
  subDistrictList: RftSubDistrict[] = [];
  subDistrictObject: RftSubDistrict;
  listSubDistrict: RftSubDistrict[] = [];

  statusList: any[];
  titleList: any[];

  fileList: FileList;
  binaryString: string;
  file: File;

  image: any = '';
  image_name: string;
  image_type: string;

  constructor(private utilService: UtilsService, private referenceService: ReferanceService) { }

  ngOnInit() {
    console.log('manageofficer')
    this.image = '../../../../assets/images/empty_profile.png'
    this.validateForm();
    this.statusList = this.utilService.getStatusList();
    this.titleList = this.utilService.getTitleList();
    this.getProvince();
  }

  validateForm(){
    this.officerFormGroup = new FormGroup({
      officer_code: new FormControl(this.manageOfficerForm.acOfficer.officer_code,
        Validators.compose([Validators.required])),
      active_flag: new FormControl(this.manageOfficerForm.acOfficer.active_flag,
        Validators.compose([Validators.required])),
      gender: new FormControl(this.manageOfficerForm.acOfficer.gender,
        Validators.compose([Validators.required])),
      title_ref: new FormControl(this.manageOfficerForm.acOfficer.title_ref,
        Validators.compose([Validators.required])),
      personal_id: new FormControl(this.manageOfficerForm.acOfficer.personal_id,
        Validators.compose([Validators.required])),
      first_name: new FormControl(this.manageOfficerForm.acOfficer.first_name,
        Validators.compose([Validators.required])),
      last_name: new FormControl(this.manageOfficerForm.acOfficer.last_name,
        Validators.compose([Validators.required])),
      address:new FormControl(this.manageOfficerForm.acOfficer.address),
      postcode: new FormControl(this.manageOfficerForm.acOfficer.postcode),
      phone_no:new FormControl(this.manageOfficerForm.acOfficer.phone_no,
        Validators.compose([Validators.required])),
      email: new FormControl(this.manageOfficerForm.acOfficer.email,
        Validators.compose([Validators.required])),
      province_name_t: new FormControl(this.manageOfficerForm.rftProvince.province_name_t),
      district_name_t: new FormControl(this.manageOfficerForm.rftDistrict.district_name_t),
      sub_district_name_t: new FormControl(this.manageOfficerForm.rftSubDistrict.sub_district_name_t),
      image: new FormControl(this.image,Validators.compose([Validators.required]))
    });
  }

  getProvince() {
    console.log('getprovince')
    this.listProvince = [];
    this.listProvince = this.referenceService.getProvinces();
  }

  autocompleteProvince(event) {
    let query = event.query;
    this.provinceList = [];
    this.manageOfficerForm.rftDistrict = new RftDistrict();
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  handleCompleteClickProvince() {
    this.provinceList = [];

    setTimeout(() => {
      this.provinceList = this.listProvince;
      this.districtList = [];
      this.subDistrictList = [];
    }, 100)
  }

  selectProvince(event: SelectItem) {
    this.districtList = [];
    this.subDistrictList = [];
    this.manageOfficerForm.rftDistrict = new RftDistrict();
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    // this.utilService.getDistrictsByProvinceRef(this.manageOfficerForm.rftProvince.province_ref)
    //   .subscribe((res: RftDistrict[]) => {
    //     this.listDistrict = [];
    //     this.listDistrict.push(...res);
    //   }
    //   );
  }

  autocompleteDistrict(event) {
    let query = event.query;
    this.districtList = [];
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.listDistrict;
    for (let obj of objList) {
      if (this.manageOfficerForm.rftProvince.province_ref === obj.province_ref) {
        if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.districtList.push(obj);
        }
      }
    }
  }

  handleCompleteClickDistrict() {
    this.districtList = [];
    setTimeout(() => {
      this.districtList = this.listDistrict;
      this.subDistrictList = [];
    }, 100)
  }

  selectDistrict(event: SelectItem) {
    this.listSubDistrict = [];
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    // this.utilService.getSubDistrictsByDistrictRef(this.officerEditForm.rftDistrict.district_ref)
    //   .subscribe((res: RftSubDistrict[]) => {
    //     this.listSubDistrict.push(...res);
    //   }
    //   );
  }

  autocompleteSubDistrict(event) {
    let query = event.query;
    this.subDistrictList = [];
    let objList: RftSubDistrict[] = this.listSubDistrict;
    for (let obj of objList) {
      if (obj.province_ref == this.manageOfficerForm.rftProvince.province_ref) {
        if (obj.district_ref == this.manageOfficerForm.rftDistrict.district_ref) {
          if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            this.listSubDistrict.push(obj);
          }
        }
      }
    }
  }

  handleCompleteClickSubDistrict() {
    this.subDistrictList = [];
    setTimeout(() => {
      this.subDistrictList = this.listSubDistrict;
    }, 100)
  }

  selectSubDistrict(event: SelectItem) {
    this.manageOfficerForm.acOfficer.postcode = this.manageOfficerForm.rftSubDistrict.postcode;
  }

  onUpload(event) {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      }
    }
  }

  handleReaderLoaded(readerEvent) {
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
    // console.log(this.file.name);
    // console.log(this.file.size);
    // console.log(this.file.type);
  }

  onSubmit() {

    if(this.officerFormGroup.invalid){
      console.log("Form Invalid")
      this.officerFormGroup.controls["officer_code"].markAsDirty();
      this.officerFormGroup.controls["active_flag"].markAsDirty();
      this.officerFormGroup.controls["gender"].markAsDirty();
      this.officerFormGroup.controls["title_ref"].markAsDirty();
      this.officerFormGroup.controls["personal_id"].markAsDirty();
      this.officerFormGroup.controls["first_name"].markAsDirty();
      this.officerFormGroup.controls["last_name"].markAsDirty();
      this.officerFormGroup.controls["phone_no"].markAsDirty();
      this.officerFormGroup.controls["email"].markAsDirty();
      this.officerFormGroup.controls["image"].markAsDirty();
    }
    console.log("officerForm: ", this.manageOfficerForm)
  }

  onResetClick() {
    this.manageOfficerForm = new OfficerForm();
    this.image = '../../../../assets/images/empty_profile.png'

  }
  onPageSearch() {

  }
}
